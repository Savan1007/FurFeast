const { Op } = require('sequelize');
const { Donation } = require('../models')

class DonationDAO {

    /**
     * 
     * @param {*} donation 
     * @param {*} transaction 
     * @returns {Donation|Exception} returns new donation record or throws exception if can not 
     * find supplier! or any other errors!
     */
    static async create(donation, transaction) {
        try {
            const newDonation = await Donation.create(donation, transaction);
            return newDonation;
        } catch (error) {
            console.error('DonationDAO error (create):', error.message);
            throw error;
        }
    }


    /**
 * Retrieves all donations, optionally including associated Supplier data.
 * @param {boolean} [include=false] - Whether to include Supplier association
 * @returns {Promise<Donation[]>} Array of donation records
 * @throws {Error} If database query fails
 */
    static async findAll(include) {
        try{
            const option = include ? {include : 'Supplier'} : {};
            return await Donation.findAll(option);
        }catch(error){
            console.error("DonationDAO error (findAll donation):", error.message)
            throw error;
        }
    }

/**
 * Finds a donation by ID with optional supplier inclusion.
 * @param {number} id - ID of the donation to retrieve
 * @param {boolean} [include=false] - Whether to include associated Supplier model
 * @returns {Promise<Donation|null>} Donation record or null if not found
 * @throws {Error} If database query fails
 */
    static async findById(id, include){
        try{
            const option = include ? {include : 'Supplier'} : {};
            return await Donation.findByPk(id, option)
        }catch(error){
            console.error('DonationDAO error(findById): ', error.message);
            throw error;
        }
    }


/**
 * Deletes one or multiple donations by ID(s), optionally within a transaction.
 * @param {number|number[]} ids - Single ID or array of IDs to delete
 * @param {Object} [transaction] - Sequelize transaction object
 * @returns {Promise<boolean>} True if any deletions succeeded
 * @throws {Error} If database operation fails
 */
    static async deleteById(ids, transaction){
        try{
            const where = Array.isArray(ids) ? {id: [Op.in]=ids} : {id: ids};
            const countDeleted = await Donation.destroy({where, transaction});
            return countDeleted > 0;
        }catch(error){
            console.error('DonationDAO error(deltedById): ', error.message);
            throw error;
        }
    }

 /**
 * Update donation details.
 * @param {Donation} donation - Donation instance to update
 * @param {Object} data - Updated donation details
 * @param {Object} transaction - Sequelize transaction
 * @returns {Promise<Donation>} Updated donation instance
 * @throws {Error} If update fails
 */
    static async update(donation, data, transaction){
        try{
            await donation.update(data, {transaction});
            return donation;
        }catch(error){
            console.error("DAO error(update, donationDAO): ", error.errors?.map(e=>({
                message: e.message,
                path: e.path,
            })));
            throw error;
        }
    }
}




module.exports = DonationDAO;