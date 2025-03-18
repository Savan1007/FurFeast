'use strict'
const DServiceDAO = require('../dao/distributionDAO');
const RecipientService = require('./recipientService');
const DDsSetvice = require('./distributionDetailsService');
const { sequelize } = require('../models');
const InventoryService = require('./inventoryService');


class DistributionService{
  
    static async findAll(include, transaction=undefined){
        try{
            include = associationMap(include);  
            return await DServiceDAO.findAll(include,transaction);
        }catch(error){
            console.error('Service error, (DistributionService, findAll()): ', error.message);
            throw error;
        }
    }

    static async findById(id, include, transaction=undefined){

        try{
            include = associationMap(include);   
            return await DServiceDAO.findById(id, include, transaction);
        }catch(error){
            console.error('Service error, (DistributionService, findById()): ', error.message);
            throw error;
        }
    }

    static async create(distribution, transaction=undefined){
        let flag = false;
        if(!transaction){
            transaction = await sequelize.transaction();
            flag = true;
        } 
        try{
            const recipientId = distribution.recipient_id;
            const recipient = await RecipientService.findById(recipientId);
            if(!recipient){throw new Error('Recipient not found!')}
            const newDistribution = await DServiceDAO.create(distribution, transaction);

            flag && transaction.commit();
            return newDistribution;
          
        }catch(error){
            if(flag) transaction.rollback();
            console.error('Service error, (DistributionService, create()): ', error);
            throw error;
        }
    }

    static async update(id, distribution){
        const transaction = await sequelize.transaction();
        try{
            const recepient = await RecipientService.findById(distribution.recipient_id);
            if(!recepient){throw new Error('Recipient not found!')}
            await this.findById(id);
            distribution.id = id;
            transaction.commit();
            return await DServiceDAO.update(distribution, transaction);
            
        }catch(error){
            transaction.rollback();
            console.error('Service error, (DistributionService, update()): ', error);
            throw error;
        }
    }

    static async delete(id){
        const transaction = await sequelize.transaction();
        try{
            const distribution = await this.findById(id);
            if(!distribution){throw new Error('Distribution not found!')}
            const {dataValues} = await DServiceDAO.delete(distribution, transaction);
            transaction.commit();
            return dataValues;
            
        }catch(error){
            transaction.rollback();
            console.error('Service error, (DistributionService, delete()): ', error);
            throw error;
        }
    }

    static async createFlow(data) {
        const transaction = await sequelize.transaction();
        try {
            let { recipient, distribution, distributionDetails } = data;
            if (!recipient || !distribution || !distributionDetails) { throw new Error('Invalid data!') }
            if (!recipient?.id) {
                recipient = await RecipientService.createRecipient(recipient, transaction);
                distribution.recipient_id = recipient.id;
            } else {
                const recipientExist = await RecipientService.findById(recipient.id);
                if (!recipientExist) { throw new Error('Recipient not found!') }
                distribution.recipient_id = recipient.id;
            }
            distribution = await this.create(distribution, transaction);
            if (Array.isArray(distributionDetails)) {
                distributionDetails.forEach(element => {
                    if (element.inventory_id < 1 || element.inventory_id > 6) { throw new Error('Invalid inventory ID:D'); }
                    element.distribution_id = distribution.id;
                });
            } else {
                if (distributionDetails.inventory_id < 1 || distributionDetails.inventory_id > 6) { throw new Error('Invalid inventory ID'); }
                distributionDetails.distribution_id = distribution.id;
            }
            distributionDetails = await DDsSetvice.create(distributionDetails, transaction);
            await transaction.commit();

        } catch (error) {
            await transaction.rollback();
            console.error('Service error, (DistributionService, createFlow()): ', error.message);
            throw error;
        }
    }

    
                  
}

function associationMap(item){
    
    const associationMap = {
        rp:'Recipient',
        dd:'DistributionDetails'
    }
    item = item?.map(item=> associationMap[item] || undefined)
    return item
}

module.exports = DistributionService;