'use strict';

const RequestDAO = require('../dao/RequestDao');
const InventoryService = require('./InventoryService');
const Request = require('../models/Request')
const RequestDetailsService = require('./requestDetailsService');
const mongoose = require('mongoose');

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
      if (includeUser === 'true') populate.push('requestedBy');

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

  static async findById(id) {
    try {
      const populate = 'requestDetails requestedBy'
       
      return await RequestDAO.findById(id, populate);
    } catch (error) {
      console.error('Service error (RequestService, findById):', error.message);
      throw error;
    }
  }

  static async create(data, session=undefined) {
    let ownSession = false;
    if (!session) {ownSession = true;session = await mongoose.startSession();session.startTransaction();}
    try {
      const result = await RequestDAO.create(data, session);
      if(ownSession&& session){ await session.commitTransaction();session.endSession();}
      return result;
    } catch (error) {
      if (ownSession && session) {await session.abortTransaction();session.endSession();}
      console.error('Service error (RequestService, create):', error.message);
      throw error;
    }
  }

  static async update(id, updateData) {
    const session =await mongoose.startSession();
    session.startTransaction();
    try {
      let result ={}
      const existing = await this.findById(id);
      // existing = new Request({...updateData})
      if (!existing) throw new Error('Request not found');
      
      if (existing.status === 'pending' && (updateData.status ==='approved' || updateData.status ==='processed')) {
        for (const detail of existing.requestDetails) {
          await InventoryService.updateById(detail.inventoryId,+detail.quantity,existing.requestType === 'donation',session);
        }
        existing.status = updateData.status;
        result = await RequestDAO.updateByModel(existing, session);
      }else{
        existing.status = updateData.status;
        result = await RequestDAO.updateByModel(existing, session);
      }
      await session.commitTransaction();
    } catch (error) {
      await session.abortTransaction();
      console.error('Service error (RequestService, update):', error.message);
      throw error;
    }finally{
      session.endSession();
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
  static async createFlow({ request, requestDetails}) {
    const session = await mongoose.startSession();
    session.startTransaction()
    try {
      const requestModel = new Request({...request})
      const createdRequest = await this.create(requestModel, session);
      if(!createdRequest) throw new Error('Could not Create a Request.')
      
      const detailsWithRequest = requestDetails.map(detail => ({ ...detail, requestId: createdRequest._id }))
      const createdDetails = await RequestDetailsService.create(detailsWithRequest, session)
      if(createdDetails.length<=0) throw new Error('Could not Create Details.')
      
      await session.commitTransaction();
    } catch (error) {
      await session.abortTransaction(); 
      console.error('Service error (RequestService, createFlow):', error.message);
      throw error;
    } finally{
      session.endSession();
    }
  }
}

module.exports = RequestService;
