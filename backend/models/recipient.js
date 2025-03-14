'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Recipient extends Model {
    static associate(models) {
      Recipient.hasMany(models.Distribution, { foreignKey: 'recipient_id', as: 'Distribution' });
    }
  }
  Recipient.init({
    id:{type: DataTypes.INTEGER,primaryKey: true,autoIncrement: true,},
    name: {type: DataTypes.STRING,allowNull: false,},
    contact_person: DataTypes.STRING,
    phone: {type: DataTypes.STRING,allowNull: false,},
    email: {type:DataTypes.STRING,allowNull:false,},
    address: {type: DataTypes.TEXT,allowNull: false,},
    recipient_type: {type: DataTypes.ENUM('shelter', 'foster', 'organization'),allowNull: false,},
    notes: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Recipient',
    tableName: 'recipients',
    timestamps: true,
  });
  return Recipient;
};