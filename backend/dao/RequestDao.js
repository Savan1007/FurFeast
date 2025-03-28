'use strict';

const Request = require('../models/Request');

class RequestDAO {

    static async findAll({ where = {}, requestType, limit = 10, offset = 0, order = {}, page = 1, populate = '' }) {
        try {
          if (requestType) {
            where.requestType = requestType;
          }
      
          const [data, count] = await Promise.all([
            Request.find(where)
              .skip(offset)
              .limit(limit)
              .sort(order)
              .populate(populate),
            Request.countDocuments(where)
          ]);
      
          return {
            data,
            currentPage: page,
            totalPages: Math.ceil(count / limit),
            totalItems: count
          };
        } catch (error) {
          console.error('DAO error (RequestDAO, findAll):', error.message);
          throw error;
        }
      }

  static async findById(id, populate = '') {
    try {
      return await Request.findById(id).populate(populate);
    } catch (error) {
      console.error('DAO error (RequestDAO, findById):', error.message);
      throw error;
    }
  }

  static async create(data, session=undefined) {
    try {
      return await data.save({session:session});
    } catch (error) {
      console.error('DAO error (RequestDAO, create):', error.message);
      throw error;
    }
  }

  static async update(id, newData) {
    try {
      const updated = await Request.findByIdAndUpdate(id, newData, { new: true });
      return updated;
    } catch (error) {
      console.error('DAO error (RequestDAO, update):', error.message);
      throw error;
    }
  }

  static async updateByModel(request, session = undefined){
    try{
      return request.save({session:session})
    }catch(error){
      console.error('DAO error (RequestDAO, updateByModel):', error.message);
      throw error;
    }
  }

  static async deleteById(id) {
    try {
      const result = await Request.findByIdAndDelete(id);
      return result !== null;
    } catch (error) {
      console.error('DAO error (RequestDAO, deleteById):', error.message);
      throw error;
    }
  }

}

module.exports = RequestDAO;
