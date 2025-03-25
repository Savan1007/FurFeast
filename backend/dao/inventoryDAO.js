'use strict';

const Inventory = require('../models/Inventory');

class InventoryDAO {

  static async findAll() {
    try {
      return await Inventory.find();
    } catch (error) {
      console.error('DAO error, (InventoryDAO, findAll()): ', error.message);
      throw error;
    }
  }

  static async findById(id) {
    try {
      return await Inventory.findById(id);
    } catch (error) {
      console.error('DAO error, (InventoryDAO, findById()): ', error.message);
      throw error;
    }
  }

  static async findItem(query) {
    try {
      return await Inventory.findOne(query);
    } catch (error) {
      console.error('DAO error, (InventoryDAO, findItem()): ', error.message);
      throw error;
    }
  }

  static async saveItem(item) {
    try {
      item.lastUpdated = new Date();
      return await item.save();
    } catch (error) {
      console.error('DAO error, (InventoryDAO, saveItem()): ', error.message);
      throw error;
    }
  }

  static async resetAllQuantities() {
    try {
      return await Inventory.updateMany({}, { quantity: 0, lastUpdated: new Date() });
    } catch (error) {
      console.error('DAO error, (InventoryDAO, resetAllQuantities()): ', error.message);
      throw error;
    }
  }

}

module.exports = InventoryDAO;
