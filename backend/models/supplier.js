'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Supplier extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Supplier.hasMany(models.Donation,{foreignKey: 'supplier_id', onDelete:'SET NULL'})
    }
  }
  Supplier.init({
    id:{
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: true,
    },
    phone: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    donation_count: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    total_donated: {
      type: DataTypes.DECIMAL(10,2),
      defaultValue: 0.00
    },
    last_donation_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    time_joined:{
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    }
  }, {
    sequelize,
    modelName: 'Supplier',
    tableName: 'suppliers',
    timestamps:false,
  });
  return Supplier;
};