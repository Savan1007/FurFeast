const mongoose = require('mongoose');
const User = require('./User');
const RequestDetails = require('./RequestDetails');
const Schema = mongoose.Schema;


const RequestSchema = new Schema({
  requestedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  requestType: { type: String, enum: ['donation', 'distribution'], required: true },
  status: { type: String, enum: ['pending', 'approved', 'rejected', 'processed'], default: 'pending' },
  dateRequested: { type: Date, default: Date.now },
  notes: String
},{ timestamps:true,
  // toObject: {
  //   virtuals: true,
  //   versionKey: false,
  //   transform: function (doc, ret) {
  //     ret.id = ret._id;
  //     delete ret._id;
  //   }
  // },
  toJSON:{
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
      ret.id = ret._id;
      delete ret._id;
    }
  }
});

RequestSchema.virtual('requestDetails', {
  ref: 'RequestDetails',
  localField: '_id',
  foreignField: 'requestId'
});

module.exports = mongoose.model('Request', RequestSchema);
