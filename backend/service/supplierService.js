const SupplierDAO = require('../dao/supplierDAO');
const {sequelize} = require('../models');



class SupplierService{
    static async createSupplier(data){
        const transaction = await sequelize.transaction();
        try{
            const supplier = await SupplierDAO.create(data, transaction);
            await transaction.commit();
            return supplier;
        }catch(error){
            await transaction.rollback();
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
    static async findById(id){
        try{
            const supplier = await SupplierDAO.findById(id);
            if(supplier){
                return supplier;
            }else{
                 throw new Error('Supplier Not Found.')
            }
        }catch(error){
            console.log('SupplierService Error (findById):', error.message)
            throw error
        }
    }



    static async updateSupplier(id,data){
        const transaction = await sequelize.transaction();
        try{
            // add validation for do not change the id!
            const oldSupplier = await this.findById(id);
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