'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.renameTable('donors', 'suppliers');
    await queryInterface.renameColumn('donations', 'donor_id', 'supplier_id');  
  },

  async down (queryInterface, Sequelize) {

    await queryInterface.renameTable('suppliers', 'donors');
    await queryInterface.renameColumn('donations', 'supplier_id', 'donor_id');
  }
};
