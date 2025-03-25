const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PermissionSchema = new Schema({
  name: { type: String, unique: true, required: true },
  description: String
});

module.exports = mongoose.model('Permission', PermissionSchema);
