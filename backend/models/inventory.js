'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Inventory extends Model {
    
    static associate(models) {
      Inventory.hasMany(models.DistributionDetails, { foreignKey: 'inventory_id', as: 'DistributionDetails' });
      Inventory.hasMany(models.DonationDetails, { foreignKey: 'inventory_id', as: 'DonationDetails' });
    }
  }
  Inventory.init({
    id:{type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true,},
    category: {type: DataTypes.ENUM('food', 'miscellaneous'), allowNull: false,},
    food_type: {type: DataTypes.ENUM('dog', 'cat'),allowNull: true,},
    food_form: {type: DataTypes.ENUM('dry', 'wet'),allowNull: true,},
    item_name: {type: DataTypes.ENUM('collar', 'toy'),allowNull: true,},
    quantity: {type: DataTypes.INTEGER,defaultValue: 0,},
    unit: {type: DataTypes.ENUM('kg', 'can', 'piece'), allowNull: true,},
    last_updated: {type: DataTypes.DATE,defaultValue: DataTypes.NOW},
  }, {
    sequelize,
    modelName: 'Inventory',
    tableName: 'inventory',
    updatedAt: 'last_updated'
  });
  return Inventory;
};