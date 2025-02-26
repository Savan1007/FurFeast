const DonorDAO = require('../dao/DonorDAO');
const {sequelize} = require('../models');



class DonorService{
    static async createDonor(data){
        const transaction = await sequelize.transaction();
        try{
            const donor = await DonorDAO.create(data, transaction);
            await transaction.commit();
            return donor;
        }catch(error){
            await transaction.rollback();
            console.error('Service Error (createDonor):', error.message);
            throw error;
        }
    }


    static async findAllDonor(){
        try{
            return await DonorDAO.findAll();
        }catch(error){
            console.log('Service Error (findAllDonor):', error.message)
            throw error
        }
    }

    /**
     * @param {number} id - Donor id
     * @returns {donor|exception}  Throws exception if can not find any match with the id
     */
    static async findById(id){
        try{
            const donor = await DonorDAO.findById(id);
            if(donor){
                return donor;
            }else{
                 throw new Error('Donor Not Found.')
            }
        }catch(error){
            console.log('Service Error (findById):', error.message)
            throw error
        }
    }

    static async updateDonor(id,data){
        const transaction = await sequelize.transaction();
        try{
            // add validation for do not change the id!
            const oldDonor = await this.findById(id);
            const newDonor = await DonorDAO.update(oldDonor, data, transaction);
            await transaction.commit();
            return newDonor;

        }catch(error){
            await transaction.rollback();
            console.error('Servie error (updateDonor):',
                 error.errors.map(e=>({
                    message:e.message,
                    path: e.path
                 })
                        
            ));
            throw error
        }
    }


    static async deleteDonor(id){
        const transaction = await sequelize.transaction();
        try{
            const donor = await this.findById(id);
            const donorDeleted = DonorDAO.deleteById(id);
            await transaction.commit();
            return donorDeleted;
        }catch(error){
            console.error('Service error (deleteDonor):', error.message)
            await transaction.rollback();
            throw error
        }
    }


}

module.exports = DonorService;