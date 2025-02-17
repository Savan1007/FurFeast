'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Inventory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Inventory.belongsTo(models.Donation, { foreignKey: 'source_donation_id' });
      Inventory.belongsToMany(models.Recipient, { through: models.Distribution, foreignKey: 'inventory_id' });
    }
  }
  Inventory.init({
    id:{
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    item_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category:{ 
      type:DataTypes.ENUM('food', 'medical', 'supplies'),
      allowNull: false,

    },
    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    unit: DataTypes.STRING,
    expiry_date: DataTypes.DATE,
    last_updated: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    source_donation_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'donations',
        key: 'id'
      },
      onDelete: 'SET NULL'
    }
  }, {
    sequelize,
    modelName: 'Inventory',
    tableName: 'inventory',
    updatedAt: 'last_updated'
  });
  return Inventory;
};