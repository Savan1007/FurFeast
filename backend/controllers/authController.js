'usr strict'
require("dotenv").config();
const AuthService = require('../service/AuthService');
const UserDAO = require('../dao/UserDao');

class AuthController {

  static async findUsers(req, res) {
    try {
      const result = await AuthService.findUsersWithFilters(req.query);
      res.status(200).json({ success: true, data: result.users, total: result.total });
    } catch (error) {
      console.error('Find Users Error:', error.message);
      res.status(500).json({ success: false, message: error.message });
    }
  }
  

  static async login(req, res) {
    try {
      const { email, password } = req.body;

      const { accessToken, refreshToken,refreshTokenExpiry } = await AuthService.login(email, password);
      const user = await AuthService.findByEmail(email);
      const maxAge = refreshTokenExpiry.getTime() - Date.now();

    
      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge, 
        sameSite: 'Strict',
        path: '/auth/refresh'
      });

      res.status(200).json({success: true,message: 'Login successful',accessToken,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
        }
      });

    } catch (error) {
      console.error('Login Error:', error.message);
      res.status(401).json({ success: false, error: error.message });
    }
  }

  static async logout(req, res) {
    try {
      const userId = req.user?.id;
      if (!userId) {
        return res.status(400).json({ success: false, message: 'User not found in request' });
      }

      await AuthService.logout(userId);

      res.clearCookie('refreshToken',{path:'/auth/refresh'
      });
      res.status(200).json({ success: true, message: 'Logged out successfully' });

    } catch (error) {
      console.error('Logout Error:', error.message);
      res.status(500).json({ success: false, error: 'Logout failed' });
    }
  }

  static async register(req, res) {
    try {
      const user = await AuthService.createUser(req.body, { sendVerificationEmail: true });
      res.status(201).json({ success: true, message: 'Registration successful. Please check your email to verify your account.' });
    } catch (error) {
      console.error('AuthController, User Creation Error:', error.message);
      res.status(400).json({ success: false, message: error.message });
    }
  }

  
  
  static async create(req, res) {
    try {
      const user = await AuthService.createUser(req.body, { sendWelcomeEmail: true, createdBy: req.user.id });
      res.status(201).json({ success: true, message: 'User created successfully' });
    } catch (error) {
      console.error('AuthController, User Creation Error:', error.message);
      res.status(400).json({ success: false, message: error.message });
    }
    // try {
    //   const user = await AuthService.createUser(req.body);
    //   res.status(201).json({
    //     success: true,
    //     message: 'User created successfully',
    //     user: {
    //       id: user.id,
    //       email: user.email,
    //       username: user.username
    //     }
    //   });
    // } catch (error) {
    //   console.error('User Creation Error:', error.message);
    //   res.status(400).json({ success: false, error: error.message });
    // }
  }
  
  static async verifyEmail(req, res) {
    try {
      const { token } = req.query;
      const user = await AuthService.verifyEmailToken(token);
      
      return res.status(200).json({
        success: true,
        message: 'Email verified successfully',
        user: {
          id: user._id,
          email: user.email,
          username: user.username
        }
      });
      
    } catch (error) {
      console.error('Email Verification Error:', error.message);
      return res.status(400).json({ success: false, message: error.message });
    }
  }

  static async refresh(req, res) {
    try {
      const token = req.cookies.refreshToken;
      if (!token) {
        return res.status(401).json({ success: false, message: 'Refresh token missing' });
      }
  
      const user = await AuthService.verfyRefreshToken(token); 
      const newAccessToken = AuthService.generateAccessToken(user);
  
      return res.status(200).json({
        success: true,
        accessToken: newAccessToken,
      });
  
    } catch (error) {
      console.error('Refresh Error:', error.message);
      return res.status(403).json({ success: false, message: 'Invalid or expired refresh token' });
    }
  } 

  static async isUsernameExists(req, res) {
    try {
      const { username } = req.query;
      if (!username) return res.status(400).json({ success: false, message: 'Username is required' });
  
      const exists = await AuthService.isUsernameExists(username);
      res.status(200).json({ success: true, exists });
    } catch (error) {
      console.error('Check Username Error:', error.message);
      res.status(500).json({ success: false, message: error.message });
    }
  }
  

}

module.exports = AuthController;
