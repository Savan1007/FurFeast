'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class DonationDetails extends Model {
    static associate(models) {
      DonationDetails.belongsTo(models.Donation, { foreignKey: 'donation_id', onDelete: 'CASCADE', as: 'Donation' });
      DonationDetails.belongsTo(models.Inventory, { foreignKey: 'inventory_id', as: 'Inventory' });
    }
  }
  DonationDetails.init({
    id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
    donation_id: {type: DataTypes.INTEGER, references: {model: 'donations', key: 'id'}, onDelete: 'CASCADE'},
    inventory_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'inventory', key: 'id' } },
    quantity: {type: DataTypes.INTEGER,allowNull: false},
  }, {
    sequelize,
    modelName: 'DonationDetails',
    tableName: 'donation_details',
    timestamps:true,
  });

  return DonationDetails;
};
