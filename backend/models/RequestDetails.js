const mongoose = require('mongoose');
const Inventory = require('./Inventory');
const Request = require('./Request');
const Schema = mongoose.Schema;

const RequestDetailsSchema = new Schema({
  requestId: { type: Schema.Types.ObjectId, ref: 'Request', required: true },
  inventoryId: { type: Schema.Types.ObjectId, ref: 'Inventory', required: true },
  quantity: { type: Number, required: true },
  // quantityProvided: { type: Number, default: 0 },
  // status: {
  //   type: String,
  //   enum: ['pending', 'fulfilled', 'partiallyFulfilled', 'notFulfilled', 'rejected'], // we should talk to them
  //   default: 'pending'
  // }
});

module.exports = mongoose.model('RequestDetails', RequestDetailsSchema);
