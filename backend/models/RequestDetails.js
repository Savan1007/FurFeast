const mongoose = require('mongoose');
const Inventory = require('./Inventories');
const Request = require('./Request');
const Schema = mongoose.Schema;

const RequestDetailsSchema = new Schema({
  requestId: { type: Schema.Types.ObjectId, ref: 'Request', required: true },
  inventoryId: { type: Schema.Types.ObjectId, ref: 'Inventory', required: true },
  quantity: { type: Number, required: true },
  // quantityProvided: { type: Number, default: 0 },
  // status: {
  //   type: String,
  //   enum: ['pending', 'fulfilled', 'partiallyFulfilled', 'notFulfilled', 'rejected','received'],
  //   default: 'pending'
  // }
},{
  toJSON: {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    ret.id = ret._id;
    delete ret._id;
    }
  }
});

module.exports = mongoose.model('RequestDetails', RequestDetailsSchema);
