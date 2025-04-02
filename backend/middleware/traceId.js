const { v4: uuidv4 } = require('uuid');

function traceId(req, res, next) {
  req.traceId = uuidv4();
  res.setHeader('X-Request-ID', req.traceId);
  next();
}

module.exports = traceId;
