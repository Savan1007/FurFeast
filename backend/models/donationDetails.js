'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class DonationDetails extends Model {
    static associate(models) {
      DonationDetails.belongsTo(models.Donation, { foreignKey: 'donation_id', onDelete: 'CASCADE', as:'Donation' });
    }
  }
  DonationDetails.init({
    id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
    donation_id: {type: DataTypes.INTEGER, references: {model: 'donations', key: 'id'}, onDelete: 'CASCADE'},
    category: {type: DataTypes.ENUM("food", "non-food"), allowNull: false},
    food_type: {type: DataTypes.ENUM("dog", "cat"),allowNull: true},
    food_form: { type: DataTypes.ENUM("dry", "wet"),allowNull: true},
    non_food_item: { type: DataTypes.ENUM("collar", "toy"),allowNull: true},
    quantity: {type: DataTypes.INTEGER,allowNull: false},
    unit: {type: DataTypes.ENUM("kg", "can", "piece"),allowNull: false }
  }, {
    sequelize,
    modelName: 'DonationDetails',
    tableName: 'donation_details',
    timestamps:false,
  });

  return DonationDetails;
};
