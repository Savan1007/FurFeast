'use strict';

const RequestDetails = require('../models/RequestDetails');

class RequestDetailsDAO {
  static async findAll(populate = '') {
    try {
      return await RequestDetails.find().populate(populate);
    } catch (error) {
      console.error('DAO error (RequestDetailsDAO, findAll):', error.message);
      throw error;
    }
  }

  static async findById(id, populate = '') {
    try {
      return await RequestDetails.findById(id).populate(populate);
    } catch (error) {
      console.error('DAO error (RequestDetailsDAO, findById):', error.message);
      throw error;
    }
  }

  static async create(data) {
    try {
      if (Array.isArray(data)) {
        return await RequestDetails.insertMany(data);
      }
      const doc = new RequestDetails(data);
      return await doc.save();
    } catch (error) {
      console.error('DAO error (RequestDetailsDAO, create):', error.message);
      throw error;
    }
  }

  static async update(id, newData) {
    try {
      const updated = await RequestDetails.findByIdAndUpdate(id, newData, { new: true });
      return updated;
    } catch (error) {
      console.error('DAO error (RequestDetailsDAO, update):', error.message);
      throw error;
    }
  }

  static async deleteById(id) {
    try {
      const result = await RequestDetails.findByIdAndDelete(id);
      return result !== null;
    } catch (error) {
      console.error('DAO error (RequestDetailsDAO, deleteById):', error.message);
      throw error;
    }
  }
}

module.exports = RequestDetailsDAO;
