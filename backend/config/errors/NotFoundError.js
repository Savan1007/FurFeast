const CError = require('../CError');

class NotFoundError extends CError {
  constructor(resource = 'Resource') {
    super(`${resource} not found`, 404, 'Not Found','NOT_FOUND');
  }
}

module.exports = NotFoundError;
