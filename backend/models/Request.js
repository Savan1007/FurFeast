const mongoose = require('mongoose');
const User = require('./User');
const Schema = mongoose.Schema;


const RequestSchema = new Schema({
  requestedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  requestType: { type: String, enum: ['donation', 'distribution'], required: true },
  status: { type: String, enum: ['pending', 'approved', 'rejected', 'processed'], default: 'pending' },
  dateRequested: { type: Date, default: Date.now },
  notes: String
});

module.exports = mongoose.model('Request', RequestSchema);
