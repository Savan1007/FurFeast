'use strict';

const  mongoose = require('mongoose');
const InventoryDAO = require('../dao/InventoryDAO');

class InventoryService {

  static async findAll() {
    try {
      return await InventoryDAO.findAll();
    } catch (error) {
      console.error('Service error, (InventoryService, findAll()): ', error.message);
      throw new Error('Failed to fetch inventory.');
    }
  }

  static async findById(id) {
    try {
      const item = await InventoryDAO.findById(id);
      if (!item) throw new Error('Inventory item not found.');
      return item;
    } catch (error) {
      console.error('Service error, (InventoryService, findById()): ', error.message);
      throw error;
    }
  }

  static async findItem(category, foodType = null, foodForm = null, itemName = null) {
    try {
      const query = { category };
      if (foodType) query.food_type = foodType;
      if (foodForm) query.food_form = foodForm;
      if (itemName) query.item_name = itemName;

      const item = await InventoryDAO.findItem(query);
      if (!item) throw new Error(`Item not found: ${category} (${foodType || itemName})`);
      return item;
    } catch (error) {
      console.error('Service error, (InventoryService, findItem()): ', error.message);
      throw error;
    }
  }

  static async updateQuantity(category, foodType, foodForm, itemName, quantity) {
    try {
      const item = await this.findItem(category, foodType, foodForm, itemName);
      item.quantity = quantity;
      return await InventoryDAO.saveItem(item);
    } catch (error) {
      console.error('Service error, (InventoryService, updateQuantity()): ', error.message);
      throw error;
    }
  }

  static async increaseQuantity(category, foodType, foodForm, itemName, amount) {
    try {
      if (amount == null || isNaN(amount)) {
        throw new Error('Amount must be a valid number.');
      }

      const item = await this.findItem(category, foodType, foodForm, itemName);
      item.quantity += amount;
      return await InventoryDAO.saveItem(item);
    } catch (error) {
      console.error('Service error, (InventoryService, increaseQuantity()): ', error.message);
      throw error;
    }
  }

  static async decreaseQuantity(category, foodType, foodForm, itemName, amount) {
    try {
      if (amount == null || isNaN(amount)) {
        throw new Error('Amount must be a valid number.');
      }

      const item = await this.findItem(category, foodType, foodForm, itemName);
      if (item.quantity < amount) {
        throw new Error(`Not enough stock for ${item.category} (${item.food_type || item.item_name}).`);
      }

      item.quantity -= amount;
      return await InventoryDAO.saveItem(item);
    } catch (error) {
      console.error('Service error, (InventoryService, decreaseQuantity()): ', error.message);
      throw error;
    }
  }

  static async resetInventory() {
    try {
      return await InventoryDAO.resetAllQuantities();
    } catch (error) {
      console.error('Service error, (InventoryService, resetInventory()): ', error.message);
      throw new Error('Failed to reset inventory.');
    }
  }

  static async updateById(id, quantity, isIncrease = true, session= undefined) {
    let ownsSession = false
    if(!session) {ownsSession=true; session = await mongoose.startSession();session.startTransaction();}
    try {
      const item = await this.findById(id);
      if (!item) throw new Error('Inventory item not found.');

      if (isIncrease) {item.quantity += quantity;}
      else {
        if (item.quantity < quantity) {throw new Error('Not enough quantity to decrease.');}
        item.quantity -= quantity;
      }
      const result = await InventoryDAO.saveItem(item);
      if(session && ownsSession){await session.commitTransaction();session.endSession();}
      return result;
    } catch (error) {
      if (ownsSession && session) {await session.abortTransaction();session.endSession();}
      console.error('Service error, (InventoryService, updateById()): ', error.message);
      throw error;
    }
  }
}

module.exports = InventoryService;
