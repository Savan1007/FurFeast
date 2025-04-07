const RequestDetailsDAO = require('../dao/RequestDetailsDao');
const RequestDetails = require('../models/RequestDetails');
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

  // static async create(details, requestType,session = undefined) {
  //   let ownsSession = false;
  //   if (!session) {session = await mongoose.startSession();session.startTransaction();ownsSession = true;}
  //   try {
  //     const inventory = await InventoryService.findAll();
  //     const invMap = new Map();
  //     inventory.forEach(item => invMap.set(String(item._id), item.quantity));
  //     let updatedDetailsToModel;
  //     if(requestType === 'donation') updatedDetailsToModel =  this.donationDetailshandler(details)
  //     else updatedDetailsToModel = this.distributionDetailsHandler(details, invMap);

  //     const created = await RequestDetailsDAO.create(updatedDetailsToModel, session);
  //     if (ownsSession && session) {await session.commitTransaction();session.endSession();}
  //     return created;
  //   } catch (error) {
  //     if (ownsSession && session) {await session.abortTransaction();session.endSession();}
  //     console.error("Service error (RequestDetailsService, create):", error.message);
  //     throw error;
  //   } 
  // }

  static async create(details, session = undefined){
    let ownsSession = false;
    if (!session) {session = await mongoose.startSession();session.startTransaction();ownsSession = true;}
    try{
      const updatedDetailsToModel = details.map(detail=> new RequestDetails({...detail}))
      const created = await RequestDetailsDAO.create(updatedDetailsToModel, session);
      if(created.length <=0) throw new Error('Could Not Create Details.')
      if (ownsSession && session) {await session.commitTransaction();session.endSession();}
      return created;
    }catch(error){
      if (ownsSession && session) {await session.abortTransaction();session.endSession();}
      console.error("Service error (RequestDetailsService, create):", error.message);
      throw error;
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

  // static donationDetailshandler(details){
  //   return details.map(detail=> new RequestDetails({...detail, status:'pending',quantityProvided:null}))
  // }
  // static distributionDetailsHandler(details, invMap){
  //   return details.map(detail => {
  //       const available = invMap.get(String(detail.inventoryId)) ?? 0;
  //       let status;
      
  //       if (detail.quantity <= available) status = 'fulfilled';
  //       else if (available === 0) status = 'not_fulfilled';
  //       else status = 'partially_fulfilled';
      
  //       return new RequestDetails({
  //         ...detail,
  //         status,
  //         quantityAvailable:available
  //       });
  //     });
  // }

}

module.exports = RequestDetailsService;
