const User = require('../models/Users');

class UserDAO {
  static async findByEmail(email, session=undefined) {
    try {
      return await User.findOne({ email }).populate('roles').session(session);
    } catch (error) {
      console.error('DAO error (UserDAO, findByEmail):', error.message);
      throw error;
    }
  }

  static async findById(id, session=undefined) {
    try {
      return await User.findById(id).populate({path: 'roles',options: { session }}).session(session);
    } catch (error) {
      console.error('DAO error (UserDAO, findById):', error.message);
      throw error;
    }
  }

  static async findByEmailOrUsername(emailOrUsername, session=undefined) {
    try {
      const result = await User.findOne({
        $or: [{ email: emailOrUsername }, { username: emailOrUsername }]
      }).populate('roles').session(session);
      return result
    } catch (error) {
      console.error('DAO error (UserDAO, findByEmailOrUsername):', error.message);
      throw error;
    }
  }

  static async updateRefreshToken(id, refreshToken, expiryDate, session=undefined) {
    try {
      const result = await User.findByIdAndUpdate(
        id,
        {
          refreshToken: refreshToken,
          refreshTokenExpiry: expiryDate
        },
        { new: true }
      ).session(session);
      return result;
    } catch (error) {
      console.error('DAO error (UserDAO, updateRefreshToken):', error.message);
      throw error;
    }
  }

  static async clearRefreshToken(id) {
    try {
      return await User.findByIdAndUpdate(
        id,
        { refreshToken: null, refreshTokenExpiry: null },
        { new: true }
      );
    } catch (error) {
      console.error('DAO error (UserDAO, clearRefreshToken):', error.message);
      throw error;
    }
  }

  static async create(user, session=undefined) {
    try {
      return await user.save({session});
      // return await User.create(userData);
    } catch (error) {
      console.error('DAO error (UserDAO, create):', error.message);
      throw error;
    }
  }

  static async findWithPermissionsById(userId) {
    try {
      return await User.findById(userId)
        .populate({
          path: 'roles',
          populate: {
            path: 'permissions'
          }
        });
    } catch (error) {
      console.error('DAO error (UserDAO, findWithPermissionsById):', error.message);
      throw error;
    }
  }

  static async isUsernameExists(username, session=undefined) {
    try {
      const user = await User.findOne({ username }).session(session);
      return !!user;
    } catch (error) {
      console.error('DAO error (UserDAO, isUsernameExists):', error.message);
      throw error;
    }
  }

  static async findUsersWithFilters(query = {}, sort = {}, skip = 0, limit = 10, session = undefined) {
    try {
      const users = await User.find(query)
        .populate('roles')
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .session(session);
  
      const total = await User.countDocuments(query).session(session);
      return { users, total };
    } catch (error) {
      console.error('DAO error (UserDAO, findUsersWithFilters):', error.message);
      throw error;
    }
  }
  static async findRoleByUserId(id){
    try{
      const role = await User.findById(id).populate({
        path: 'roles',
        select: 'name description'
      });
      return role;
    }catch(error){
      console.error('DAO error (UserDAO, findRoleByUserId()):', error.message);
      throw error;
    }
  }

}

module.exports = UserDAO;
