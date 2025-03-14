'use strict';

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DistributionDetails extends Model {
    static associate(models) {
      DistributionDetails.belongsTo(models.Distribution, { foreignKey: 'distribution_id', as: 'Distribution' });
      DistributionDetails.belongsTo(models.Inventory, { foreignKey: 'inventory_id', as: 'Inventory' });
    }
  }
  DistributionDetails.init({
    distribution_id: { type: DataTypes.INTEGER, allowNull: false },
    inventory_id: { type: DataTypes.INTEGER, allowNull: false },
    quantity_distributed: { type: DataTypes.INTEGER, allowNull: false },
    unit: { type: DataTypes.ENUM('kg', 'can', 'piece'), allowNull: false },
    item_name: { type: DataTypes.STRING, allowNull: false },
    category: { type: DataTypes.ENUM('food', 'non_food_item'), allowNull: false },
    food_type: { type: DataTypes.ENUM('dog', 'cat'), allowNull: true },
    food_form: { type: DataTypes.ENUM('dry', 'wet'), allowNull: true },
    comments: { type: DataTypes.TEXT, allowNull: true },

  }, {
    sequelize,
    modelName: 'DistributionDetails',
    tableName: 'distribution_details',
  });
}
  return DistributionDetails;