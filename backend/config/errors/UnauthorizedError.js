const CError = require('../CError');

class UnauthorizedError extends CError {
  constructor(message = 'You are not authorized to perform this action') {
    super(message, 401, 'Unauthorized','UNAUTHORIZED');
  }
}

module.exports = UnauthorizedError;
