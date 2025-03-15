'use strict';

const { Distribution } = require('../models');
const distribution = require('../models/distribution');
class DistributionDAO{

    static async findAll(include=undefined, transaction=undefined){
        try{ 
          
            const options = {include: include, transaction: transaction};
            return await Distribution.findAll(options);
        }catch(error){
         console.error('DAO error, (DistributionDAO, findAll()): ', error.message);
         throw error;
        } 
    }

    static async findById(id, include=undefined, transaction=undefined){
        try{
            const options = {include: include, transaction: transaction};
            return await Distribution.findByPk(id, options);
        }catch(error){
            console.error('DAO error, (DistributionDAO, findById()): ', error.message);
            throw error;
        }
    }

    static async create(distribution, transaction=undefined){      
        try{
            return await Distribution.create(distribution, {transaction: transaction});
        }catch(error){
            console.error('DAO error, (DistributionDAO, create()): ', error.message);
            throw error;
        }
    }

    static async update(newDisData, transaction=undefined){
        try{
            const options = {where: {id: newDisData.id}, transaction: transaction};
            return await Distribution.update(newDisData, options);
        }catch(error){
            console.error('DAO error, (DistributionDAO, update()): ', error.message);
            throw error;
        }
    }

    static async delete(distribution, transaction=undefined){
        try{
            const options = {transaction: transaction};
            return await distribution.destroy(options);
        }catch(error){
            console.error('DAO error, (DistributionDAO, delete()): ', error.message);
            throw error;
        }
    }
}

module.exports = DistributionDAO;