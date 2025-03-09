const { Recipient } = require('../models')
const { Op } = require('sequelize');

/**
 * Data Access Object for handling Recipient database operations
 */
class RecipientDAO {


    /**
   * Creates a new recipient record
   * @param {Object} recipient - Recipient data to create
   * @param {Object} [transaction] - Sequelize transaction object
   * @returns {Promise<Recipient>} Newly created recipient
   * @throws {Error} "Duplicate entry" if email constraint violated
   * @throws {Error} General database error
   */
    static async create(recipient, transaction) {
        try {
            const newRecipient = await Recipient.create(recipient, { transaction });
            return newRecipient;
        } catch (error) {
            if (error.name === "SequelizeUniqueConstraintError") {
                console.error(
                    "DAO Error (RecipeintDAO, Create) Unique constraint error:",
                    error.errors.map((e) => e.message)
                );
                throw new Error(
                    "Duplicate entry: A Recipient with this email already exists."
                );
            }
            console.error("DAO Error (RecipientDAO , create):", error, error.errors?.map((e)=>({
                message: e.message,
                path:e.path
            })));
            throw new Error("Database error while creating recipient");
        }
    }


    /**
   * Finds recipient by email address
   * @param {string} email - Email to search
   * @returns {Promise<Recipient|null>} Found recipient or null
   * @throws {Error} Database error
   */
    static async findByEmail(email) {
        try {
            const recipient = await Recipient.findOne({
                where: {
                    email: email,
                },
            });
            return recipient;
        } catch (error) {
            console.error("DAO Error (RecipientDAO findByEmail):", error);
            throw new Error("Database error while checking recipient email");
        }
    }

    /**
   * Retrieves all recipients
   * @returns {Promise<Recipient[]>} Array of recipients
   * @throws {Error} Database error
   */
    static async findAll() {
        try {
            return await Recipient.findAll();
        } catch (error) {
            console.error("DAO Error (RecipientDAO, findAll):", error);
            throw error;
        }
    }

    /**
   * Finds recipient by primary key ID
   * @param {number} id - Recipient ID
   * @returns {Promise<Recipient|null>} Found recipient or null
   * @throws {Error} Database error
   */
    static async findById(id) {
        try {
            return await Recipient.findByPk(id);
        } catch (error) {
            console.error("DAO Error (RecipientDAO, findById):", error);
            throw error;
        }
    }


    /**
   * Updates a recipient record
   * @param {Recipient} recipient - Recipient instance to update
   * @param {Object} data - New data values
   * @param {Object} [transaction] - Sequelize transaction
   * @returns {Promise<Recipient>} Updated recipient instance
   * @throws {Error} Database error
   */
    static async update(recipient, data, transaction) {
        try {
            await recipient.update(data, { transaction });
            return recipient;
        } catch (error) {
            console.error(
                "DAO Error (RecipientDAO, update):",
                error.errors.map((e) => ({
                    message: e.message,
                    path: e.path,
                }))
            );
            throw error;
        }
    }

    /**
   * Deletes a recipient by ID
   * @param {number} id - Recipient ID to delete
   * @param {Object} [transaction] - Sequelize transaction
   * @returns {Promise<boolean>} True if deletion succeeded
   * @throws {Error} Database error
   */
    static async deleteById(id, transaction){
        try{
          const countDeleted = await Recipient.destroy({where: {id:id}},{ transaction})
          return countDeleted > 0
        }catch(error){
          console.error('DAO error (RecipientDAO, deleteById):', error.message)
          throw error
        }
    }

 /**
     * Fetch a recipient by email or phone.
     * @param {Object} criteria - Object containing email and/or phone.
     * @returns {Promise<Recipient|null>} - Recipient if found, otherwise null.
     */
    static async findByEmailOrPhone(emailAndPhone, transaction){
        const {email, phone} = emailAndPhone;
        try{
            const recipient = await Recipient.findOne({where: {[Op.or]:[{email: email},{phone: phone}]}, transaction});
            return recipient;
        }catch(error){
            console.error('DAO error (RecipientDAO, findByEmailOrPhone()):', error.message)
            throw error
        }

    }



}



module.exports = RecipientDAO