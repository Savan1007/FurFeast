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

            const distributionDetails = await DDsDAO.findById(id);
            if(!distributionDetails){
                throw new Error('DistributionDetails Not Found.');
            }
            return distributionDetails
        } catch (error) {
            console.error("Service error, (distributionDetailsService, findById())", error.message);
            throw error;
        }
    }

    static async create(distributionDetails) {
        const transaction = await sequelize.transaction();
        try {
            const createdDistributionDetails = await DDsDAO.create(distributionDetails, transaction);
            await transaction.commit();
            return createdDistributionDetails;
        } catch (error) {
            await transaction.rollback();
            console.error("Service error, (distributionDetailsService, create())", error.message);
            throw error;
        }
    }

    static async update(id, distributionDetails){
        const transaction = await sequelize.transaction();
        try {
            const distribution = await this.findById(id);
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
            const idDetelet = await DDsDAO.delete(distribution, transaction);
            await transaction.commit();
            return idDetelet;
        }catch(error){
            await transaction.rollback();
            console.error("Service error, (distributionDetailsService, delete())", error.message);
            throw error;
        }
    }
}

module.exports = DDsService;