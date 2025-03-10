'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Log extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Log.init({
    action: DataTypes.STRING,
    performed_by: DataTypes.STRING,
    timestamp: DataTypes.DATE,
    details: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Log',
    tableName: 'logs_table',
    createdAt: 'timestamp',
    updatedAt: false
  });
  return Log;
};