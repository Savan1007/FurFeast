const CError = require('../CError');

class BadRequestError extends CError {
  constructor(message = 'Bad request',validationErrors = null) {
    super(message, 400, 'Bad Request','BAD_REQUEST');
    if (validationErrors) this.errors = validationErrors;
  }
}

module.exports = BadRequestError;
