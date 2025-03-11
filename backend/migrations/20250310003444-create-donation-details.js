'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('donation_details', {
      id: {type: Sequelize.INTEGER,autoIncrement: true,primaryKey: true,allowNull: false,},
      donation_id: {type: Sequelize.INTEGER,allowNull: false,references: { model: 'donations',key: 'id',},onDelete: 'CASCADE',},
      category: {type: Sequelize.ENUM("food", "miscellaneous"), allowNull: false,},
      food_type: {type: Sequelize.ENUM("dog", "cat"),allowNull: true,},
      food_form: {type: Sequelize.ENUM("dry", "wet"), allowNull: true,},
      non_food_item: { type: Sequelize.ENUM("collar", "toy"), allowNull: true,},
      quantity: {type: Sequelize.INTEGER,allowNull: false,},
      unit: {type: Sequelize.ENUM("kg", "can", "piece"),allowNull: false,}});  
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('donation_details');
  }
};
