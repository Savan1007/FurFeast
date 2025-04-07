
const DonationDAO = require('../dao/donationDAO');
const { sequelize } = require('../models');
const DonationDetailsService = require('./donationDetailsService');
const SupplierService = require('./supplierService');

class DonationService{
    
    static async findAll(query, transaction=undefined){
        try{
            const {status,page = 1,limit = 10,sort = 'createdAt',order = 'DESC',includeDetails = 'false',includeSupplier = 'false',} = query;
            const where = {};
            if (status) where.status = status;
          
            const offset = (parseInt(page) - 1) * parseInt(limit);
            const include = [];
          
            if (includeDetails === 'true') {include.push('DonationDetails');}
            if (includeSupplier === 'true') {include.push('Supplier');}
          
            return await DonationDAO.findAll({where,limit: parseInt(limit),offset,order: [[sort, order.toUpperCase()]],include,page: parseInt(page), transaction});
           
        }catch(error){
            console.error("Service error (donationService , findAll()): ", error.message);
            throw error;
        }
    }


    static async findById(id, include, transaction){
        try{
            const associationMap = {
                dd: 'DonationDetails',
                sp: 'Supplier'
            }
            include = include?.map(item=> associationMap[item] || item);   
            return  await DonationDAO.findById(id, include, transaction);
        }catch(error){
            console.error('DAO error(donationService, findById()): ', error.message);
            throw error;
        }
    }

    static async create(donation, transaction=undefined){
        let flag = false
        if(!transaction){flag = true;transaction = await sequelize.transaction();}
        try{
             const newDonation = await DonationDAO.create(donation, transaction);
            if(flag){await transaction.commit();}
             return newDonation;
        }catch(error){
            if(flag){await transaction.rollback();}
            console.error('Service error (donationService create()):', error.message, error.errors?.map(e => ({
                message: e.message,
                path: e.path
            })));
            throw error
        }
    }

    static async update(id, data){
        const transaction = await sequelize.transaction();
        try{
            const oldDonation = await this.findById(id, undefined, transaction);
            if(!oldDonation){throw new Error('Donation Not Found!')}
            const newDonation = await DonationDAO.update(oldDonation, data, transaction);
            await transaction.commit();
            return newDonation;
        }catch(error){
            await transaction.rollback();
            console.error('Serive error (donationService, update):',error.message);
            throw error;
        }   
    }

    static async deleteById(id){
        const transaction = await sequelize.transaction();
        try{
            const donation = await this.findById(id, undefined, transaction);
            if(!donation){throw new Error('Donation Not Found!')}
            const isDeleted = await DonationDAO.deleteById(id, transaction);
            await transaction.commit();
            return isDeleted;
        }catch(error){
            console.error("Serivce error(donationService, delete): ", error.message);
            await transaction.rollback();
            throw error;
        }
    }

    static async createFlow(data){
        const transaction = await sequelize.transaction();
        try{
            const {donation, donationDetails, supplier} = data;
            let createdSupplier, createdDonationDetails;
            if(!donation || !donationDetails || !supplier){throw new Error('Invalid data.');}
            if(!supplier.id ){
                createdSupplier = await SupplierService.createSupplier(supplier, transaction);
                donation.supplier_id = createdSupplier.id;
                createdSupplier.donation_count += 1
            }else{
                createdSupplier = await SupplierService.findById(supplier.id, undefined, transaction);
                if(!createdSupplier){throw new Error('Supplier not found.')}
                createdSupplier.donation_count += 1
                donation.supplier_id = createdSupplier.id;
            }
            const createdDonation = await this.create(donation,transaction);
            if(Array.isArray(donationDetails)){
                donationDetails.forEach(item=>{
                    item.donation_id = createdDonation.id;
                })
                createdDonationDetails = await DonationDetailsService.create(donationDetails, transaction);
            }else{
                donationDetails.donation_id = createdDonation.id;
                createdDonationDetails = await DonationDetailsService.create(donationDetails, transaction);
            }
            await transaction.commit();  
            return {createdDonation, createdDonationDetails, createdSupplier}

        }catch(error){
            await transaction.rollback();
            console.error("Service error, (donationservice, createFlow())", error.message);
            throw error;
        }
       
    }
    
}

module.exports = DonationService;