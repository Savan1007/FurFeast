
'use strict'
const CError = require('../CError');

class ForbiddenError extends CError {
  constructor(message = 'Access forbidden') {
    super(message, 403, 'Forbidden', 'FORBIDDEN');
  }
}

module.exports = ForbiddenError;
