'use strict';
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const UnauthorizedError = require('../config/errors/UnauthorizedError');

module.exports = asyncHandler(async function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new UnauthorizedError('Access token missing or malformed');
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {throw new UnauthorizedError('Access token has expired');}
    throw new UnauthorizedError('Invalid access token');
  }
});

