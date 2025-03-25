const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Permission = require('./Permission')

const RoleSchema = new Schema({
  name: { type: String, unique: true, required: true },
  description: String,
  permissions: [{ type: Schema.Types.ObjectId, ref: 'Permission' }]
});

module.exports = mongoose.model('Role', RoleSchema);
