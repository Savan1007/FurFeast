const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InventorySchema = new Schema({
  //item_type, item_name,
  category: { type: String, enum: ['food', 'miscellaneous'], required: true },
  food_type: { type: String, enum: ['dog', 'cat'] },
  food_form: { type: String, enum: ['dry', 'wet'] },
  item_name: { type: String, enum: ['collar', 'toy'] },
  quantity: { type: Number, default: 0 },
  unit: { type: String, enum: ['kg', 'can', 'piece'] },
  lastUpdated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Inventory', InventorySchema);
