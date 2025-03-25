const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LogSchema = new Schema({

  action: String,
  performedBy: String,// id user
  timestamp: { type: Date, default: Date.now },
  details: String
});

module.exports = mongoose.model('Log', LogSchema);
