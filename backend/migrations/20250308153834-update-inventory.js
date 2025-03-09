'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

     await queryInterface.removeColumn('inventory', 'source_donation_id');

     await queryInterface.changeColumn('inventory', 'category', {type: Sequelize.ENUM('food', 'miscellaneous'), allowNull: false,});
     await queryInterface.changeColumn('inventory', 'item_name', {type: Sequelize.ENUM('collar', 'toy'), allowNull: true,});
     await queryInterface.changeColumn('inventory', 'unit', { type: Sequelize.ENUM('kg', 'can', 'piece'), allowNull: true,});
 
     await queryInterface.addColumn('inventory', 'food_type', {type: Sequelize.ENUM('dog', 'cat'), allowNull: true,});
     await queryInterface.addColumn('inventory', 'food_form', {type: Sequelize.ENUM('dry', 'wet'), allowNull: true,});
 

  },

  async down (queryInterface, Sequelize) {
   
    await queryInterface.addColumn('inventory', 'source_donation_id', {
      type: Sequelize.INTEGER,
      references: {
        model: 'donations',
        key: 'id',
      },
      onDelete: 'SET NULL',
      allowNull: true,
    });
   
    await queryInterface.removeColumn('inventory', 'food_type');
    await queryInterface.removeColumn('inventory', 'food_form');

    await queryInterface.changeColumn('inventory', 'item_name', {type: Sequelize.STRING,allowNull: false,});
    await queryInterface.changeColumn('inventory', 'unit', {type: Sequelize.STRING,allowNull: true,});
  }
};
