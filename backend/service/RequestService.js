'use strict';

const RequestDAO = require('../dao/RequestDao');
const InventoryService = require('./InventoryService');
const Request = require('../models/Request');
const RequestDetailsService = require('./requestDetailsService');
const mongoose = require('mongoose');
const NotFoundError = require('../config/errors/NotFoundError');
const BadRequestError = require('../config/errors/BadRequestError');


class RequestService {
  
  static async findAll(query) {
    try {
      const {
        status,
        requestType,
        userId,
        startDate,
        endDate,
        page,
        limit,
        sort = 'createdAt',
        order = 'desc',
        includeDetails = 'true',
        includeUser = 'true',
      } = query;

      const where = {};
      if (status) where.status = status;
      if (userId) where.requestedBy = userId;

      if (startDate || endDate) {
        where.createdAt = {};
        if (startDate) where.createdAt.$gte = new Date(startDate);
        if (endDate) where.createdAt.$lte = new Date(endDate);
      }

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
  return await RequestDAO.findById(id, 'requestDetails requestedBy');
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
    let result= {}
    try { 
      const existing = await this.findById(id);
      if (!existing) throw new NotFoundError('Request');
      if (['rejected', 'processed'].includes(existing.status)) { throw new BadRequestError('Cannot update a processed or rejected request.');}

      if (existing.status === 'pending'&&['approved', 'processed'].includes(updateData.status)){
        for (const detail of existing.requestDetails) {
          await InventoryService.updateById(detail.inventoryId,+detail.quantity,existing.requestType === 'donation',session);
        }
        existing.status = updateData.status;
        result = await RequestDAO.updateByModel(existing, session);
      }
      existing.status = updateData.status;
      result = await RequestDAO.updateByModel(existing, session);
      
      await session.commitTransaction();
    }catch (error) {
      await session.abortTransaction();
      throw error;
    }finally{
      session.endSession();
    }
  }

  static async deleteById(id) {
    const existing = await this.findById(id);
    if (!existing) throw new NotFoundError('Request');
    return await RequestDAO.deleteById(id);
  }
  
  static async createFlow({request, requestDetails}) {
    const session = await mongoose.startSession();
    session.startTransaction()
    try {
      const requestModel = new Request({...request})
      const createdRequest = await this.create(requestModel, session);
      if (!createdRequest) throw new BadRequestError('Could not create request');
      
      const detailsWithRequest = requestDetails.map(detail => ({ ...detail, requestId: createdRequest._id }))
      const createdDetails = await RequestDetailsService.create(detailsWithRequest, session)
      if (createdDetails.length <= 0) throw new BadRequestError('Could not create details');
      
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
