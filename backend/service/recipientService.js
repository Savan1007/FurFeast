const RecipientDAO = require('../dao/recipientDAO');

const {sequelize} = require('../models');


/**
 * Service layer for handling Recipient business logic and transactions
 */
class RecipientService{


    /**
   * Creates a new recipient with transaction management
   * @param {Object} data - Recipient creation data
   * @returns {Promise<Recipient>} Newly created recipient
   * @throws {Error} Propagates database/validation errors
   */
    static async createRecipient(data, transaction = undefined){
        let flag = false;
       if(!transaction) {transaction = await sequelize.transaction(); flag = true;}
        try{
            if(!data.email || !data.phone){
                throw new Error('Phone number or Email is missing!')
            }
            const ifExist = await this.findByEmailOrPhone({email:data.email, phone:data.phone},transaction);
            if(!ifExist){
                const recipient = await RecipientDAO.create(data, transaction);
                flag && await transaction.commit();
                return recipient;
            }else{
                throw new Error('There is a recipient with privided email or phone.')
            }
        }catch(error){
            if(flag) await transaction.rollback();
            console.error('Service Error (createRecipient):', error.message);
            throw error;
        }
    }


/**
 * Fetch a recipient by email or phone.
 * @param {Object} emailAndPhone - Object containing email and/or phone.
 * @returns {boolean} - Returns true if a recipient is found, otherwise false.
 * @throws {Error} - Throws database error if any.
 */
    static async findByEmailOrPhone(emailAndPhone, transaction){
        try{
            const recipient = await RecipientDAO.findByEmailOrPhone(emailAndPhone, transaction)
            return recipient ? true : false;
        }catch(error){
            console.error('Service error, (recipientService, findByEmailOrPhone()): ', error.message);
            throw error;
        }

    }

    /**
   * Retrieves all recipient records
   * @returns {Promise<Recipient[]>} Array of all recipients
   * @throws {Error} Database query errors
   */
    static async findAllRecipient(){
        try{
            return await RecipientDAO.findAll();
        }catch(error){
            console.log('Service Error (findAllRecipient):', error.message)
            throw error
        }
    }


    
    /**
   * Finds recipient by ID with existence validation
   * @param {number} id - Recipient ID
   * @returns {Promise<Recipient>} Found recipient record
   * @throws {Error} "Recipient Not Found" if no record exists
   * @throws {Error} Database errors
   */
    static async findById(id){
        // return all the recieves till now!!!! as well if the option is true!!!
        try{
            return await RecipientDAO.findById(id);       
        }catch(error){
            console.log('RecipientService Error (findById):', error.message)
            throw error
        }
    }


    /**
   * Updates recipient record with transaction safety
   * @param {number} id - Recipient ID to update
   * @param {Object} data - Update data (prevents ID modification)
   * @returns {Promise<Recipient>} Updated recipient instance
   * @throws {Error} Validation/database errors
   */
    static async updateRecipient(id,data){
        const transaction = await sequelize.transaction();
        try{
            // add validation for do not change the id!
            const oldRecipient = await this.findById(id);
            if(!oldRecipient){throw new Error('Recipient Not Found.');}
            const newRecipient = await RecipientDAO.update(oldRecipient, data, transaction);
            await transaction.commit();
            return newRecipient;

        }catch(error){
            await transaction.rollback();
            console.error('Servie error (updateRecipient):',
                 error.errors.map(e=>({
                    message:e.message,
                    path: e.path
                 })
                        
            ));
            throw error
        }
    }


    /**
   * Deletes recipient with transaction management
   * @param {number} id - Recipient ID to delete
   * @returns {Promise<boolean>} True if deletion succeeded
   * @throws {Error} "Recipient Not Found" or database errors
   */
    static async deleteRecipient(id){
        const transaction = await sequelize.transaction();
        try{
            const recipient = await this.findById(id);
            if(!recipient){throw new Error('Recipient Not Found.');}
            const recipientDeleted = RecipientDAO.deleteById(id,transaction);
            await transaction.commit();
            return recipientDeleted;
        }catch(error){
            console.error('Service error (deleteRecipient):', error.message)
            await transaction.rollback();
            throw error
        }
    }

}



module.exports = RecipientService;