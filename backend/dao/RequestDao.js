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
      return await Request.findById(id).populate(populate);
  }

  static async create(data, session = undefined) {
    return await data.save({ session });
  }

  static async update(id, newData) {
    return await Request.findByIdAndUpdate(id, newData, { new: true });
  }

  static async updateByModel(request, session = undefined) {
    return await request.save({ session });
  }

  static async deleteById(id) {
    const result = await Request.findByIdAndDelete(id);
    return result !== null;
  }

}

module.exports = RequestDAO;
