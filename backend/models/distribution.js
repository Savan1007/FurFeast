'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Distribution extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Distribution.belongsTo(models.Recipient, { foreignKey: 'recipient_id' });
      Distribution.belongsTo(models.Inventory, { foreignKey: 'inventory_id' });
    }
  }
  Distribution.init({
    recipient_id: DataTypes.INTEGER,
    inventory_id: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    unit: DataTypes.STRING,
    date_distributed: DataTypes.DATE,
    status: {
      type: DataTypes.ENUM('pending', 'delivered', 'canceled'),
      defaultValue: 'pending'
    },
    notes: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Distribution',
    tableName: 'distributions',
  });
  return Distribution;
};