'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Distribution extends Model {
    static associate(models) {
      Distribution.belongsTo(models.Recipient, { foreignKey: 'recipient_id', as: 'Recipient' });
      Distribution.hasMany(models.DistributionDetails, { foreignKey: 'distribution_id', as: 'DistributionDetails' });
    }
  }
  Distribution.init({
    recipient_id: DataTypes.INTEGER,
    date_distributed: DataTypes.DATE,
    status: {type: DataTypes.ENUM('pending', 'delivered', 'canceled'),defaultValue: 'pending'},
    notes: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Distribution',
    tableName: 'distributions',
    timestamps: true,
  });
  return Distribution;
};