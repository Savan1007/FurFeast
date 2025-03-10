'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Recipient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Recipient.belongsToMany(models.Inventory, { through: models.Distribution, foreignKey: 'recipient_id' });
    }
  }
  Recipient.init({
    id:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contact_person: DataTypes.STRING,
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type:DataTypes.STRING,
      allowNull:false,
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    recipient_type: {
      type: DataTypes.ENUM('shelter', 'foster', 'organization'),
      allowNull: false,
    },
    notes: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Recipient',
    tableName: 'recipients',
    timestamps: true,
  });
  return Recipient;
};