'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
     await queryInterface.removeColumn("donations", "donation_type");
     await queryInterface.removeColumn("donations", "amount");
 
     // Add new columns
     await queryInterface.addColumn("donations", "donation_category", {
       type: Sequelize.ENUM('food', 'miscellaneous'),
       allowNull: false,
     });
     await queryInterface.addColumn("donations", "food_type", {
       type: Sequelize.ENUM('dog', 'cat'),
       allowNull: true,
     });
     await queryInterface.addColumn("donations", "food_form", {
       type: Sequelize.ENUM('dry', 'wet'),
       allowNull: true,
     });
     await queryInterface.addColumn("donations", "item_name", {
       type: Sequelize.ENUM('collar', 'toy'),
       allowNull: true,
     });
 
     // Modify existing columns
     await queryInterface.changeColumn("donations", "quantity", {
       type: Sequelize.INTEGER,
       allowNull: true,
     });
     await queryInterface.changeColumn("donations", "unit", {
       type: Sequelize.ENUM('kg', 'can', 'piece'),
       allowNull: true,
     });
  },




  async down (queryInterface, Sequelize) {
    // Revert column modifications
    await queryInterface.changeColumn("donations", "unit", {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.changeColumn("donations", "quantity", {
      type: Sequelize.INTEGER,
      allowNull: true,
    });

    // Remove new columns
    await queryInterface.removeColumn("donations", "donation_category");
    await queryInterface.removeColumn("donations", "food_type");
    await queryInterface.removeColumn("donations", "food_form");
    await queryInterface.removeColumn("donations", "item_name");

    // Re-add old columns
    await queryInterface.addColumn("donations", "donation_type", {
      type: Sequelize.ENUM('money', 'food', 'supplies'),
      allowNull: false,
    });
    await queryInterface.addColumn("donations", "amount", {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: true,
    });

  }

};
