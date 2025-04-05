'usr strict'
require("dotenv").config();
const AuthService = require('../service/AuthService');
const { validationResult } = require("express-validator");
const asyncHandler = require('express-async-handler');
const BadRequestError = require('../config/errors/BadRequestError');


exports.login = asyncHandler(async (req, res) => {
  const errors = validationResult(req).array();
  if (errors.length > 0) throw new BadRequestError('Validation error', errors);

  const { emailOrUsername, password } = req.body;
  const { accessToken, refreshToken, refreshTokenExpiry } = await AuthService.login(emailOrUsername, password);
  const user = await AuthService.findByEmailOrUsername(emailOrUsername);
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
      email: user.email
    }
  });
});

exports.findUsers = asyncHandler(async (req, res) => {
  const result = await AuthService.findUsersWithFilters(req.query);
  res.status(200).json({ success: true, data: result.users, total: result.total });
});

exports.logout = asyncHandler(async (req, res) => {
  const userId = req.user?.id;
  if (!userId) throw new BadRequestError('User not found in request');

  await AuthService.logout(userId);
  res.clearCookie('refreshToken', { path: '/auth/refresh' });

  res.status(200).json({ success: true, message: 'Logged out successfully' });
});

exports.register = asyncHandler(async (req, res) => {
  const errors = validationResult(req).array();
  if (errors.length > 0) throw new BadRequestError('Validation error', errors);

  await AuthService.createUser(req.body, { sendVerificationEmail: true });
  res.status(201).json({ success: true, message: 'Registration successful. Please check your email to verify your account.' });
});

exports.create = asyncHandler(async (req, res) => {
  const errors = validationResult(req).array();
  if (errors.length > 0) throw new BadRequestError('Validation error', errors);

  await AuthService.createUser(req.body, { sendWelcomeEmail: true, createdBy: req.user.id });
  res.status(201).json({ success: true, message: 'User created successfully' });
});

exports.verifyEmail = asyncHandler(async (req, res) => {
  const {token} = req.query;
  const user = await AuthService.verifyEmailToken(token);

  res.status(200).json({success: true, message: 'Email verified successfully',
    user:{
      id: user._id,
      email: user.email,
      username: user.username
    }
  });
});

exports.refresh = asyncHandler(async (req, res) => {
  const errors = validationResult(req).array();
  if (errors.length > 0) throw new BadRequestError('Validation error', errors);

  const user = await AuthService.verfyRefreshToken(token);
  const newAccessToken = AuthService.generateAccessToken(user);

  res.status(200).json({
    success: true,
    accessToken: newAccessToken,
  });
});


exports.isUsernameExists = asyncHandler(async (req, res) => {
  const errors = validationResult(req).array();
  if (errors.length > 0) throw new BadRequestError('Validation error', errors);
    
    const exists = await AuthService.isUsernameExists(username);
    res.status(200).json({ success: true, exists });
});


exports.findRoleWithId = asyncHandler(async (req, res) => {
  const errors = validationResult(req).array();
  if (errors.length > 0) throw new BadRequestError('Validation error', errors);
  const {id} = req.params;
  const userRole = await AuthService.findRoleByUserId(id);
  res.status(200).json({ success: true, data: userRole });
});

exports.update = asyncHandler(async (req, res) => {
  const errors = validationResult(req).array();
  if (errors.length > 0) throw new BadRequestError('Validation error', errors);

  const { id } = req.params;
  const user = await AuthService.updateUser(id, req.body);
  res.status(200).json({ success: true, message: 'User updated successfully', user });
}
);

