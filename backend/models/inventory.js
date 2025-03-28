const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InventorySchema = new Schema({

  itemType: { type: String, enum: ['food', 'miscellaneous'], required: true },
  itemName: { type: String},
  quantity: { type: Number, default: 0 },
  unit: { type: String, enum: ['kg', 'can', 'piece'] },
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

module.exports = mongoose.model('Inventory', InventorySchema);
