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
      const result = await InventoryDAO.saveItem(item, session);
      if(session && ownsSession){await session.commitTransaction();session.endSession();}
      return result;
    } catch (error) {
      if (ownsSession && session) {await session.abortTransaction();session.endSession();}
      console.error('Service error, (InventoryService, updateById()): ', error.message);
      throw error;
    }
  }

  static async updateInventoryQuantity(id, quantity){
    const session = await mongoose.startSession();
    session.startTransaction();
    try{
      const exisitngItem = await this.findById(id);
      if(!exisitngItem) throw new Error('Item Not Found.')
      const result =  await InventoryDAO.updateInventoryQuantityById(exisitngItem._id,quantity,session);
    console.log(result)
      await session.commitTransaction();session.endSession();
      return result
    }catch(error){
      await session.abortTransaction(); session.endSession();
      console.error('Service error, (InventoryService, updateInventoryQuantity()): ', error.message);
      throw error;
    }
  }

}

module.exports = InventoryService;
