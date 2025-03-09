'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Donation extends Model {
    static associate(models) {
      Donation.belongsTo(models.Supplier, { foreignKey: 'supplier_id' });
    }
  }
  Donation.init({
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
    supplier_id: { type:DataTypes.INTEGER, references:{model:'suppliers', key: 'id',},onDelete: 'SET NULL'},
    donation_category: { type: DataTypes.ENUM("food", "miscellaneous"), allowNull: false },
    food_type: { type: DataTypes.ENUM("dog", "cat"), allowNull: true },
    food_form: { type: DataTypes.ENUM("dry", "wet"), allowNull: true },
    item_name: { type: DataTypes.ENUM("collar", 'toy'), allowNull: true },
    quantity: { type: DataTypes.INTEGER, allowNull: true },
    unit: { type: DataTypes.ENUM("kg", "can", "piece"), allowNull: true },
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