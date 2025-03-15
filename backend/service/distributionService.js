'use strict'
const DServiceDAO = require('../dao/distributionDAO');
const { sequelize } = require('../models');
const RecipientService = require('./recipientService');


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
            const distribution = await DServiceDAO.findById(id, include, transaction);
            if(!distribution){throw new Error('Distribution not found');}
            return distribution;
        }
        catch(error){
            console.error('Service error, (DistributionService, findById()): ', error.message);
            throw error;
        }
    }

    static async create(distribution){
        const transaction = await sequelize.transaction();
        try{
            const recipientId = distribution.recipient_id;
            await RecipientService.findById(recipientId);
            const newDistribution = await DServiceDAO.create(distribution, transaction);
            transaction.commit();
            return newDistribution;
          
        }catch(error){
            transaction.rollback();
            console.error('Service error, (DistributionService, create()): ', error);
            throw error;
        }
    }

    static async update(id, distribution){
        const transaction = await sequelize.transaction();
        try{
            await RecipientService.findById(distribution.recipient_id);
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
            const {dataValues} = await DServiceDAO.delete(distribution, transaction);
            transaction.commit();
            return dataValues;
            
        }catch(error){
            transaction.rollback();
            console.error('Service error, (DistributionService, delete()): ', error);
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