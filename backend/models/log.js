const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LogSchema = new Schema({

  action: String,
  performedBy: String,// id user
  timestamp: { type: Date, default: Date.now },
  details: String
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

module.exports = mongoose.model('Log', LogSchema);
