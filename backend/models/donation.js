'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Donation extends Model {
    static associate(models) {
      Donation.belongsTo(models.Donor, { foreignKey: 'donor_id' });
    }
  }
  Donation.init({
    id:{ 
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    donor_id:{
      type:DataTypes.INTEGER,
      references:{
        model:'donors',
        key: 'id',
      },
      onDelete: 'SET NULL'
    }
    ,
    donation_type: {
      type: DataTypes.ENUM('money', 'food', 'supplies'),
      allowNull: false,
    },
    
    amount: DataTypes.DECIMAL(10,2),
    quantity: DataTypes.INTEGER,
    unit: DataTypes.STRING,
    date_received: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    status:{
      type: DataTypes.ENUM('pending', 'received', 'processed'),
      defaultValue: 'pending'
    },
    notes: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Donation',
    tableName: 'donations',
    timestamps:true,
  });
  return Donation;
};