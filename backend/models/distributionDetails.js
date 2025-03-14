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
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    distribution_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'distributions', key: 'id' } },
    inventory_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'inventory', key: 'id' } },
    quantity: { type: DataTypes.INTEGER, allowNull: false },
  }, {
    sequelize,
    modelName: 'DistributionDetails',
    tableName: 'distribution_details',
  });
  return DistributionDetails;
}