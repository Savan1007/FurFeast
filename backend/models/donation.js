'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Donation extends Model {
    static associate(models) {
      Donation.belongsTo(models.Supplier, { foreignKey: 'supplier_id', onDelete:'SET NULL', as:'Supplier' });
      Donation.hasMany(models.DonationDetails, { foreignKey: 'donation_id', onDelete: 'CASCADE', as:'DonationDetails' });
    }
  }
  Donation.init({
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
    supplier_id: { type:DataTypes.INTEGER, references:{model:'suppliers', key: 'id',},onDelete: 'SET NULL'},
    date_received: { type: DataTypes.DATE, allowNull: true },
    status: { type: DataTypes.ENUM("pending", "received", "processed"), defaultValue: "pending" },
    notes: DataTypes.TEXT
  },
  {
    sequelize,
    modelName: 'Donation',
    tableName: 'donations',
    timestamps:true,
  });
  return Donation;
};