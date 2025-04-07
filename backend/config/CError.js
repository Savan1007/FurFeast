'use strict'
  
  class CError extends Error {
    constructor(message, statusCode = 500, title = 'Error',code = 'INTERNAL_ERROR') {
      super(message);
      this.statusCode = statusCode;
      this.code = code;
      this.title = title;
      this.isOperational = true;
      Error.captureStackTrace(this, this.constructor);
    }
  };
  
  module.exports = CError;
  