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
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    recipient_id:{ type: DataTypes.INTEGER, references: { model: 'recipients', key: 'id' } },
    date_distributed: DataTypes.DATE,
    status: {type: DataTypes.ENUM('pending','approved','rejected','processed'),defaultValue: 'pending'},
    notes: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Distribution',
    tableName: 'distributions',
    timestamps: true,
  });
  return Distribution;
};