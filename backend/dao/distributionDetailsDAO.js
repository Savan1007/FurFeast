const {DistributionDetails, Inventory, Distribution, Recipient} = require('../models');

class DistributionDetailsDAO{

    static async findAll() {
        try{
            return await DistributionDetails.findAll();
        }catch(error){
            console.error("DAO error, (DistributionDetailsDAO, findAll())",error);
            throw error;
        }
    }

    static async findById(id) {
        try{
            return await DistributionDetails.findByPk(id);
        }catch(error){
            console.error("DAO error, (DistributionDetailsDAO, findById())",error);
            throw error;
        }
    }

    static async create(distributionDetails, transaction) {
        try{
            if(Array.isArray(distributionDetails)){
                return await DistributionDetails.bulkCreate(distributionDetails,{transaction});
            }
            return await DistributionDetails.create(distributionDetails,{transaction});
        }catch(error){
            console.error("DAO error, (DistributionDetailsDAO, create())",error);
            throw error;
        }
    }

    static async update(distributionDetails, transaction) {
        try{
            const options = {where: {id: distributionDetails.id}, transaction: transaction};
            const updatedDistributionDetails = await DistributionDetails.update(distributionDetails, options);
            return updatedDistributionDetails;
        }catch(error){
            console.error("DAO error, (DistributionDetailsDAO, update())",error);
            throw error;
        }
    }

    static async delete(distribution, transaction) { 
        try{
            const options = { transaction: transaction};
            return await distribution.destroy(options);
        }catch(error){
            console.error("DAO error, (DistributionDetailsDAO, delete())",error);
            throw error;
        }

    }
}

module.exports = DistributionDetailsDAO;