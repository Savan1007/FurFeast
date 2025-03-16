'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.changeColumn(
      'donation_details', 'donation_id',
      {
      type: Sequelize.INTEGER, allowNull: false,
      references: {model: 'donations',key: 'id',},
      onDelete: 'CASCADE',
      });

      await queryInterface.changeColumn('donations', 'supplier_id', {
        type: Sequelize.INTEGER,
        references: {
          model: 'suppliers',
          key: 'id',
        },
        onDelete: 'SET NULL',
        allowNull: true,
      });

    await queryInterface.removeColumn('donations', 'donation_category');
    await queryInterface.removeColumn('donations', 'food_type');
    await queryInterface.removeColumn('donations', 'food_form');
    await queryInterface.removeColumn('donations', 'item_name');
    await queryInterface.removeColumn('donations', 'quantity');
    await queryInterface.removeColumn('donations', 'unit');


  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('donation_details', 'donation_id');

    await queryInterface.addColumn('donations', 'donation_category', {type: Sequelize.ENUM("food", "miscellaneous"),allowNull: false,});
    await queryInterface.addColumn('donations', 'food_type', {type: Sequelize.ENUM("dog", "cat"), allowNull: true,});
    await queryInterface.addColumn('donations', 'food_form', {type: Sequelize.ENUM("dry", "wet"), allowNull: true, });
    await queryInterface.addColumn('donations', 'item_name', {type: Sequelize.ENUM("collar", "toy"),allowNull: true,});
    await queryInterface.addColumn('donations', 'quantity', {type: Sequelize.INTEGER,allowNull: true,});
    await queryInterface.addColumn('donations', 'unit', {type: Sequelize.ENUM("kg", "can", "piece"),allowNull: true,});
  }
};
