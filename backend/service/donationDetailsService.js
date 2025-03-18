const DDsDAO = require("../dao/donationDetailsDAO");
const DonationService = require('./donationService');
const supplierService = require('./supplierService');
const { sequelize } = require("../models");


class DonationDetailsService {


    static async findAll(include) {
        try{  
            include = associationMap(include);
            return await DDsDAO.findAll(include);
        }catch(error){
            console.error("Service error (DonationService findAll()):", error.message);
            throw error;
        }
    }

    static async findById(id, include){
        try{
            include = associationMap(include);
            return await DDsDAO.findById(id, include);   
        }catch(error){
            console.error('Service error(donationDetailsService, findById): ', error.message);
            throw error;

        }
    }



    static async create(details, transaction=undefined) {
        let flag = false;
        if(!transaction){flag = true; transaction = await sequelize.transaction();}
        try {
            const newDetails = await DDsDAO.create(details, transaction);
            if(flag){ await transaction.commit();}
            return newDetails;
        } catch (error) {
            if(flag){ await transaction.rollback();}  
            console.error('Service error (donationDetailsService create()):', error.message);
            throw error
        }
    }

    static async deleteById(ids){
        const transaction = await sequelize.transaction();
        try{
            const donationDetails = await this.findById(ids);
            if(!donationDetails){throw new Error('DonationDetails Not Found');}
            const isDeleted = await DDsDAO.deleteById(ids, transaction);
            await transaction.commit();
            return isDeleted;
        }catch(error){
            console.error("Service error(donationDetailsService deleteById()): ", error.message);
            await transaction.rollback();
            throw error;
        }
    }


    static async update(id, data){
        const transaction = await sequelize.transaction();
        try{
            const oldDDs = await this.findById(id);
            if(!oldDDs){throw new Error('DonationDetails Not Found');}
            const newDDs = await DDsDAO.update(oldDDs, data, transaction);
            await transaction.commit();
            return newDDs;
        }catch(error){
            await transaction.rollback();
            console.error('Serive error (donationDetailsService ,update()):',error.message);
            throw error;
        }
    }
}

function associationMap(item){
    const associationMap = {
        sp:'Supplier',
        d:'Donation'
    }
    item = item?.map(item=> associationMap[item] || undefined)
    return item
}
module.exports = DonationDetailsService;