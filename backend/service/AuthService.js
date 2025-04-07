'use strict'
require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const UserDAO = require('../dao/UserDao');
const User = require('../models/Users');
const sendEmail = require('./MailService');
const {renderVerifyEmailHtml,renderWelcomeEmailHtml} = require('../config/emailTemplates');
const BadRequestError = require('../config/errors/BadRequestError');
const NotFoundError = require('../config/errors/NotFoundError');
const UnauthorizedError = require('../config/errors/UnauthorizedError');

class AuthService {

  static async findByEmail(email) {return await UserDAO.findByEmail(email); }

  static async isUsernameExists(username, session = undefined) {return await UserDAO.isUsernameExists(username);}

  static async findUsersWithFilters(queryParams = {}) {
    try {
      const {
        page = 1,
        limit = 10,
        email,
        username,
        isVerified,
        isBanned,
        role,
        sortBy = 'createdAt',
        sortOrder = 'desc'
      } = queryParams;
  
      const filters = {};
      if (email) filters.email = { $regex: email, $options: 'i' };
      if (username) filters.username = { $regex: username, $options: 'i' };
      if (isVerified !== undefined) filters.isVerified = isVerified === 'true';
      if (isBanned !== undefined) filters.isBanned = isBanned === 'true';
      if (role) filters.roles = role;
  
      const skip = (parseInt(page) - 1) * parseInt(limit);
      const sort = { [sortBy]: sortOrder === 'desc' ? -1 : 1 };
  
      return await UserDAO.findUsersWithFilters(filters, sort, skip, parseInt(limit));
    } catch (error) {
      console.error('Service error (AuthService, findUsersWithFilters):', error.message);
      throw error;
    }
  }

  static async findById(id, session=undefined) {
    if (!mongoose.Types.ObjectId.isValid(id)) {throw new BadRequestError('Invalid ID');}
    return await UserDAO.findById(id, session);
}


  static async login(emailOrUsername, password, session=undefined) {
    let flag = false;
    if(!session) {
      flag = true;
      session = await mongoose.startSession();
      session.startTransaction();
    }
    try {
      const existingUser = await UserDAO.findByEmailOrUsername(emailOrUsername, session);
      if (!existingUser) throw new UnauthorizedError('Invalid credentials');

      const passwordMatch = await bcrypt.compare(String(password), existingUser.password);
      if (!passwordMatch) throw new UnauthorizedError('Invalid credentials');

      const accessToken = this.generateAccessToken(existingUser);
      const refreshToken = this.generateRefreshToken(existingUser);
      const refreshTokenExpiry = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
      await UserDAO.updateRefreshToken(existingUser._id, refreshToken, refreshTokenExpiry, session);
      if (flag && session) {await session.commitTransaction();session.endSession();}
      return { accessToken, refreshToken,refreshTokenExpiry };

    } catch (error) {
      if (flag && session) {await session.abortTransaction();session.endSession();}
      throw error;
    }
  }

  static async logout(userId) {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const existingUser = await UserDAO.findById(userId);
      if (!existingUser) throw new NotFoundError('User');

      await UserDAO.clearRefreshToken(userId, session);
      await session.commitTransaction();
      return true;
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  }

  static async verfyRefreshToken(token){
    try{
      const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
      const existingUser = await this.findById(decoded.id);

      if (!existingUser || existingUser.refreshToken!==token) throw new UnauthorizedError('Invalid refresh token');
      if (existingUser.refreshTokenExpiry && existingUser.refreshTokenExpiry < new Date()) throw new UnauthorizedError('Expired refresh token');

      return existingUser;
    }catch{
      throw new UnauthorizedError('Invalid or expired refresh token');
    }
  }

  static async getPermissionsByUserId(userId) {
      const user = await UserDAO.findWithPermissionsById(userId);
      if (!user) throw new NotFoundError('User');
  
      const allPermissions = user.roles.flatMap(role => role.permissions);
      const uniquePermissions = Array.from(
        new Map(allPermissions.map(p => [p._id.toString(), p])).values()
      );
  
      return uniquePermissions; 
  }

  static async findByEmailOrUsername(emailOrUsername) {
     return  await UserDAO.findByEmailOrUsername(emailOrUsername);
    }


  static async createUser(userData, options = {}, session = undefined) {
    const { sendVerificationEmail = false, sendWelcomeEmail = false, createdBy = null } = options;
    let flag = false;
    if (!session) {flag = true;session = await mongoose.startSession();session.startTransaction();}
    try {
      const existingUser = await UserDAO.findByEmail(userData.email, session);
      if (existingUser) throw new BadRequestError(`User with email ${userData.email} already exists`);
  
      const hashedPassword = await bcrypt.hash(String(userData.password), 10);
      if (!hashedPassword) throw new BadRequestError('Could not hash password');
      userData.password = hashedPassword;
      if (!userData.username) {userData.username = userData.email?.split('@')[0];}
  
     
      const userModel = new User({...userData ,createdBy: createdBy});
  
      if (sendVerificationEmail) {
        const { token, tokenExp } = await this.generateEmailVerificationToken();
        userModel.emailVerificationToken = token;
        userModel.emailVerificationTokenExpiry = tokenExp;
      }
  
      const newUser = await UserDAO.create(userModel, session);
      if (!newUser) throw new BadRequestError('Could not create new User');
  
      if (sendVerificationEmail){
        const url = process.env.EMAIL_VERIFY_URL+userModel.emailVerificationToken;
        await sendEmail(newUser.email, 'Email Confirmation', renderVerifyEmailHtml(url, newUser.username));}

      if (sendWelcomeEmail) {await sendEmail(newUser.email, 'Welcome to the Platform', renderWelcomeEmailHtml(newUser.username));}
      if (flag && session) {await session.commitTransaction();session.endSession();}
      return newUser;
    } catch (error) {
      if (flag && session) {await session.abortTransaction();session.endSession();}
      throw error;
    }
  }
  

  static async verifyEmailToken(token) {
    const session = await User.startSession();
    session.startTransaction();
  
    try {
      if (!token) throw new BadRequestError('Verification token is required');
  
      const user = await User.findOne({
        emailVerificationToken: token,
        emailVerificationTokenExpiry: { $gt: Date.now() }
      }).session(session);
  
      if (!user) throw new BadRequestError('Token is invalid or expired');
  
      user.isVerified = true;
      user.emailVerificationToken = undefined;
      user.emailVerificationTokenExpiry = undefined;
  
      await user.save({ session });
      await session.commitTransaction();
      session.endSession();
      return user;
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  }

  static async findRoleByUserId(id){
    const user = await this.findById(id);
    if (!user) throw new NotFoundError('User');
    return await UserDAO.findRoleByUserId(user._id);
  }
  

  static generateAccessToken(user) {
    return jwt.sign(
      { id: user._id, email: user.email, username: user.username },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRY || '15m' }
    );
  }

  static generateRefreshToken(user) {
    return jwt.sign(
      { id: user._id },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: process.env.REFRESH_TOKEN_EXPIRY || '7d' }
    );
  }

  static async generateEmailVerificationToken(){
    const { randomBytes } = await import("node:crypto");
    let buffer = randomBytes(32);
    const token = buffer.toString("hex");
    const tokenExp = Date.now() + 30 * 60 * 1000;
    return {token, tokenExp};
  }

  static async updateUser(id, userData){
    const session = await mongoose.startSession();
    session.startTransaction();
    try{
      const existingUser = await this.findById(id, session);
      console.log(existingUser)
      if(!existingUser) throw new NotFoundError('User');
      if(existingUser.username !== userData.username && await this.isUsernameExists(userData.username)) throw new BadRequestError(`${userData.username} is taken.`)
      const existingPlain = existingUser.toObject();
      const userToUpdate = this.deepMerge(existingPlain, userData);
      existingUser.set(userToUpdate);
      const updatedUser = await existingUser.save({session});
      await updatedUser.populate('roles');
      await session.commitTransaction();
      session.endSession();
      return updatedUser;
    }catch(error){
      if(session.inTransaction()){await session.abortTransaction();session.endSession();}
      throw error;
    }
  }
  static deepMerge(target, source){
    const output = {...target};
    for(const key of Object.keys(source)){
      if(source[key] instanceof Object && !Array.isArray(source[key]) && target[key] instanceof Object && !Array.isArray(target[key])){
        output[key] = this.deepMerge(target[key], source[key])
      }else{
        output[key] = source[key];
      }
    }
    return output
  }

}

module.exports = AuthService;




  // static async register(user) {
  //   const session = await mongoose.startSession();
  //   session.startTransaction();

  //   try {
  //     const existingUser = await this.findByEmail(user.email);
  //     if (existingUser) throw new Error(`User with email:${user.email} already exists`);

  //     const hashedPassword = await bcrypt.hash(user.password, 10);
  //     if (!hashedPassword) throw new Error('Could not hash password');
  //     user.password = hashedPassword;

  //     const createdUser = await UserDAO.create(user, session);
  //     await session.commitTransaction();
  //     return createdUser;
  //   } catch (error) {
  //     await session.abortTransaction();
  //     console.error('Service error, (AuthService register()): ', error.message);
  //     throw error;
  //   } finally {
  //     session.endSession();
  //   }
  // }



  // static async createUser( userData, options = {}, session = undefined) {
  //   const { sendVerificationEmail = false, sendWelcomeEmail = false, createdBy = null } = options;
  //   let flag = false;
  //   if(!session) {
  //     flag = true;
  //     session = await mongoose.startSession();
  //     session.startTransaction();
  //   }
  //   try {
  //     const existingUser = await UserDAO.findByEmail(userData.email, session);
  //     if (existingUser) throw new Error(`User with email ${userData.email} already exists`);
  
  //     const hashedPassword = await bcrypt.hash(String(userData.password), 10);
  //     if (!hashedPassword) throw new Error('Could not hash password');
  //     userData.password = hashedPassword;
  //     if (!userData.username) {userData.username = userData.email.split('@')[0];}
  
      
  //     const defaultRole = await RoleDAO.findByName('supplier', session);
  //     if (!defaultRole) throw new Error('Default user role not found');

  //     const {token, tokenExp} = await this.generateEmailVerificationToken();

  //     const userModel = new User({
  //       email:userData.email,
  //       password:hashedPassword,
  //       username:userData.username,
  //       roles:[defaultRole.id],
  //       emailVerificationToken:token,
  //       emailVerificationTokenExpiry:tokenExp
  //       });
  //     const newUser = await UserDAO.create(userModel, session);
  //     if(!newUser) throw new Error('Could not create new User!')
  //     const url = process.env.CURRENT_URL
  //     await sendEmail(newUser.email,'Email Confirmation',renderVerifyEmailHtml(url,newUser.username));
          
  //     if (flag && session) {
  //       await session.commitTransaction();
  //       session.endSession();
  //     }
  //     return newUser;
  //   } catch (error) {
  //     if (flag && session) {
  //       await session.abortTransaction();
  //       session.endSession();
  //     }
  //     console.error('Service error, (AuthService createUser()): ', error.message);
  //     throw error;
  //   }
  // }