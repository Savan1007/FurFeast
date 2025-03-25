'use strict';

const RequestDAO = require('../dao/RequestDao');
const InventoryService = require('./InventoryService');
const RequestDetailsService = require('./requestDetailsService');

class RequestService {
  static async findAll(query) {
    try {
      const {
        status,
        requestType,
        page = 1,
        limit = 10,
        sort = 'createdAt',
        order = 'desc',
        includeDetails = 'false',
        includeUser = 'false',
      } = query;

      const where = {};
      if (status) where.status = status;

      const offset = (parseInt(page) - 1) * parseInt(limit);
      const populate = [];

      if (includeDetails === 'true') populate.push('requestDetails');
      if (includeUser === 'true') populate.push('user');

      return await RequestDAO.findAll({
        where,
        requestType,
        limit: parseInt(limit),
        offset,
        order: { [sort]: order.toLowerCase() === 'asc' ? 1 : -1 },
        page: parseInt(page),
        populate: populate.join(' '),
      });
    } catch (error) {
      console.error('Service error (RequestService, findAll):', error.message);
      throw error;
    }
  }

  static async findById(id, includes = []) {
    //populate by default every thing
    try {
      const populate = includes.includes('user') || includes.includes('requestDetails')
        ? includes.join(' ')
        : '';
      return await RequestDAO.findById(id, populate);
    } catch (error) {
      console.error('Service error (RequestService, findById):', error.message);
      throw error;
    }
  }

  static async create(data) {
    try {
      return await RequestDAO.create(data);
    } catch (error) {
      console.error('Service error (RequestService, create):', error.message);
      throw error;
    }
  }

  static async update(id, updateData) {
    try {
      const existing = await this.findById(id);
      if (!existing) throw new Error('Request not found');
      return await RequestDAO.update(id, updateData);
    } catch (error) {
      console.error('Service error (RequestService, update):', error.message);
      throw error;
    }
  }

  static async deleteById(id) {
    try {
      const existing = await this.findById(id);
      if (!existing) throw new Error('Request not found');
      return await RequestDAO.deleteById(id);
    } catch (error) {
      console.error('Service error (RequestService, delete):', error.message);
      throw error;
    }
  }
  // we create user in a seperate page.
  static async createFlow({ request, requestDetails, user }) {
    try {
      if (!request || !requestDetails || !user?._id) {
        throw new Error('Invalid data provided for request flow.');
      }

      request.user = user._id;
      const createdRequest = await this.create(request);

      const detailsWithRequest = Array.isArray(requestDetails)
        ? requestDetails.map(detail => ({ ...detail, request: createdRequest._id }))
        : { ...requestDetails, request: createdRequest._id };

      const createdDetails = await RequestDetailsService.create(detailsWithRequest);

      return { createdRequest, createdDetails };
    } catch (error) {
      console.error('Service error (RequestService, createFlow):', error.message);
      throw error;
    }
  }
}

module.exports = RequestService;
