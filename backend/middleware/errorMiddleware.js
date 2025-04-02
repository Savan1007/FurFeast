'use strict'
require('dotenv').config()
const logger = require('../util/logger');

const CError = require('../config/CError');

function errorHandler(err, req, res, next) {
  const isOperational = err instanceof CError;

  const statusCode = err.statusCode || 500;
  const message = isOperational ? err.message : 'Something went wrong';
  const title = isOperational ? err.title : 'Internal Server Error';
  const code = err.code || 'INTERNAL_ERROR';

  logger.error({
    traceId:req.traceId,
    userId: req.user?.id,
    userEmail: req.user?.email,
    name: err.name,
    message: err.message,
    code,
    title: err.title,
    stack: err.stack,
    route: req.originalUrl,
    method: req.method,
    isOperational
  });

  res.status(statusCode).json({
    success: false,
    error: {
      title,
      code,
      message,
      ...(err.errors && { errors: err.errors }),
      // ...(process.env.NODE_ENV !== 'production' && { stack: err.stack })
    }
  });
}


module.exports = errorHandler;
