
const DonationDAO = require('../dao/donationDAO');
const { sequelize } = require('../models');
const SupplierService = require('./supplierService');

class DonationService{
    
    static async findAll(include){
        try{
            const associationMap = {
                dd: 'DonationDetails',
                sp:'Supplier'
            }
            include = include?.map(item=> associationMap[item] || undefined)
            return await DonationDAO.findAll(include);
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
            include = include?.map(item=> associationMap[item] || item)
            const donation = await DonationDAO.findById(id, include, transaction);
            if(donation){
                return donation;
            }else{
                throw new Error("Donation Not Found.")
            }
        }catch(error){
            console.error('DAO error(donationService, findById()): ', error.message);
            throw error;
        }
    }

    static async create(id, donation, details= undefined){
        const transaction = await sequelize.transaction();
        try{
             const supplier = await SupplierService.findById(id,false ,transaction);
             donation.supplier_id = id;
             const newDonation = await DonationDAO.create(donation, transaction);
            
            // loginc for adding details !!! details is a array of donations 
            // const newDetails = await DonationDetailsService.create(details, transaction)
             await transaction.commit();
             return newDonation;
        }catch(error){
            await transaction.rollback();
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
            const isDeleted = await DonationDAO.deleteById(id, transaction);
            await transaction.commit();
            return isDeleted;
        }catch(error){
            console.error("Serivce error(donationService, delete): ", error.message);
            await transaction.rollback();
            throw error;
        }

    }
    
}

module.exports = DonationService;