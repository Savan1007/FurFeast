const SupplierDAO = require('../dao/supplierDAO');
const {sequelize} = require('../models');



class SupplierService{
    static async createSupplier(data, transaction=undefined){
        let flag = false
        if(!transaction){flat = true;transaction = await sequelize.transaction();}
        try{
            const supplier = await SupplierDAO.create(data, transaction);
            if(flag){await transaction.commit();}
            return supplier;
        }catch(error){
            if(flag){await transaction.rollback();}            
            console.error('Service Error (createSupplier):', error.message);
            throw error;
        }
    }


    static async findAllSupplier(){
        try{
            return await SupplierDAO.findAll();
        }catch(error){
            console.log('Service Error (findAllSupplier):', error.message)
            throw error
        }
    }

    /**
     * @param {number} id - Supplier id
     * @returns {supplier|exception}  Throws exception if can not find any match with the id
     */
    static async findById(id, include=undefined, transaction=undefined){
        let flag = false;
        if(!transaction){flag=true; transaction = await sequelize.transaction();}
        try{
            const associationMap = {
                d: 'Donation',
                dd: 'DonationDetails'
            }
            console.log('findbyid supplier service', id)
            include = include?.map(item=> associationMap[item]|| undefined)  
            const supplier = await SupplierDAO.findById(id, include, transaction);
            if(flag) await transaction.commit();
            return supplier
           
        }catch(error){
            if(flag) await transaction.rollback()
            console.log('SupplierService Error (findById):', error.message)
            throw error
        }
    }



    static async updateSupplier(id,data){
        const transaction = await sequelize.transaction();
        try{
            // add validation for do not change the id!
            const oldSupplier = await this.findById(id);
            if(!oldSupplier){throw new Error('Supplier Not Found.');}
            const newSupplier = await SupplierDAO.update(oldSupplier, data, transaction);
            await transaction.commit();
            return newSupplier;

        }catch(error){
            await transaction.rollback();
            console.error('Servie error (updateSupplier):',
                 error.errors.map(e=>({
                    message:e.message,
                    path: e.path
                 })
                        
            ));
            throw error
        }
    }


    
    static async deleteSupplier(id){
        const transaction = await sequelize.transaction();
        try{
            const supplier = await this.findById(id);
            if(!supplier){throw new Error('Supplier Not Found!')}
            const supplierDeleted = SupplierDAO.deleteById(id, transaction);
            await transaction.commit();
            return supplierDeleted;
        }catch(error){
            console.error('Service error (deleteSupplier):', error.message)
            await transaction.rollback();
            throw error
        }
    }


}

module.exports = SupplierService;