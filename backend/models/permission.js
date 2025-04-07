const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PermissionSchema = new Schema({
  name: { type: String, unique: true, required: true },
  description: String
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

module.exports = mongoose.model('Permission', PermissionSchema);
