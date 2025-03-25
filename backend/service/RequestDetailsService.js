const RequestDetailsDAO = require('../dao/RequestDetailsDao');
const InventoryService = require('./InventoryService');
const mongoose = require('mongoose');

class RequestDetailsService {

  static async findAll(populate = '') {
    try {
      return await RequestDetailsDAO.findAll(populate);
    } catch (error) {
      console.error("Service error (RequestDetailsService, findAll):", error.message);
      throw error;
    }
  }

  static async findById(id, populate = '') {
    try {
      return await RequestDetailsDAO.findById(id, populate);
    } catch (error) {
      console.error("Service error (RequestDetailsService, findById):", error.message);
      throw error;
    }
  }

  static async create(details, session = undefined) {
    let ownsSession = false;
    if (!session) {
      session = await mongoose.startSession();
      session.startTransaction();
      ownsSession = true;
    }

    try {
      const inventory = await InventoryService.findAll();
      const invMap = new Map();
      inventory.forEach(item => invMap.set(String(item._id), item.quantity));
      // we do not check for status.
      if (Array.isArray(details) && details.length > 0) {
        details.forEach(detail => {
          const available = invMap.get(String(detail.inventoryId)) ?? 0;
          if (detail.requested <= available) detail.status = 'fulfilled';
          else if (available === 0) detail.status = 'not_fulfilled';
          else detail.status = 'partially_fulfilled';
        });
      } else {
        throw new Error('Invalid request. RequestDetails are missing or not in array form.');
      }

      const created = await RequestDetailsDAO.create(details);
      if (ownsSession) await session.commitTransaction();
      return created;
    } catch (error) {
      if (ownsSession) await session.abortTransaction();
      console.error("Service error (RequestDetailsService, create):", error.message);
      throw error;
    } finally {
      if (ownsSession) session.endSession();
    }
  }

  static async update(id, newData) {
    try {
      const existing = await this.findById(id);
      if (!existing) throw new Error('Request detail not found');

      return await RequestDetailsDAO.update(id, newData);
    } catch (error) {
      console.error("Service error (RequestDetailsService, update):", error.message);
      throw error;
    }
  }

  static async deleteById(id) {
    try {
      const existing = await this.findById(id);
      if (!existing) throw new Error('Request detail not found');

      return await RequestDetailsDAO.deleteById(id);
    } catch (error) {
      console.error("Service error (RequestDetailsService, deleteById):", error.message);
      throw error;
    }
  }

}

module.exports = RequestDetailsService;
