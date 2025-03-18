const DDsDAO = require('../dao/distributionDetailsDAO');
const { sequelize } = require('../models');

class DDsService {

    static async findAll() {
        try {
            return await DDsDAO.findAll();
        } catch (error) {
            console.error("Service error, (distributionDetailsService, findAll())", error.message);
            throw error;
        }
    }

    static async findById(id) {
        try {
            return await DDsDAO.findById(id);
        } catch (error) {
            console.error("Service error, (distributionDetailsService, findById())", error.message);
            throw error;
        }
    }

    static async create(distributionDetails, transaction = undefined) {
        let flag = false;
        if (!transaction){ transaction = await sequelize.transaction(); flag = true; }
        try {
            //helper for setting status. 
            const createdDistributionDetails = await DDsDAO.create(distributionDetails, transaction);
            flag && await transaction.commit();
            return createdDistributionDetails;
        } catch (error) {
            if(flag) await transaction.rollback();
            console.error("Service error, (distributionDetailsService, create())", error.message);
            throw error;
        }
    }

    static async update(id, distributionDetails){
        const transaction = await sequelize.transaction();
        try {
            const distribution = await this.findById(id);
            if (!distribution) { throw new Error('Distribution not found!') }
            distributionDetails.id = distribution.id;
            const updatedDist  = await DDsDAO.update(distributionDetails, transaction);
            await transaction.commit();
            return updatedDist;
        } catch (error) {
            await transaction.rollback();
            console.error("Service error, (distributionDetailsService, update())", error.message);
            throw error;
        }
    }
    static async delete(id){
        const transaction = await sequelize.transaction()
        try{
            const distribution = await this.findById(id);
            if(!distribution){throw new Error('Distribution not found!')}
            const idDetelet = await DDsDAO.delete(distribution, transaction);
            await transaction.commit();
            return idDetelet;
        }catch(error){
            await transaction.rollback();
            console.error("Service error, (distributionDetailsService, delete())", error.message);
            throw error;
        }
    }
    static async setStatus(){

    }
}



module.exports = DDsService;