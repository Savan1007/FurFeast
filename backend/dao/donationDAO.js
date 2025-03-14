const {Donation} = require('../models');
const { Op } = require('sequelize');
class DonationDAO{

    /**
   * Fetches all donations.
   * @static
   * @param {string} [include] - Include DonationDetails if 'true'.
   * @returns {Promise<Donation[]>} Array of donations.
   * @throws {Error} Throws error if operation fails.
   */
    static async findAll(include){
       try{
        const option = {include : include || undefined}
        return  await Donation.findAll(option);
       } catch(error){
        console.error('DAO error, (donationDAO findAll()): ', error.message);
        throw error;
       }
    }

    
    /**
   * Finds donation by ID.
   * @static
   * @param {number} id - Donation ID.
   * @param {string} [include] - Include DonationDetails if 'true'.
   * @returns {Promise<Donation|null>} Donation instance or null.
   * @throws {Error} Throws error if operation fails.
   */
    static async findById(id, include, transaction){
        try{
            const options = {
                 include: include || undefined,
                 transaction : transaction || undefined
            }
            return await Donation.findByPk(id, options);
        }catch(error){
            console.error('DAO error, (donationDAO findById()): ', error.message);
            throw error;
        }
    }
   
    /**
   * Creates new donation.
   * @static
   * @param {object} donation - Donation data.
   * @param {object} [transaction] - Sequelize transaction.
   * @returns {Promise<Donation>} Created donation.
   * @throws {Error} Throws error if operation fails.
   */
    static async create(donation, transaction){
        try{
            return await Donation.create(donation, {transaction})
        }catch(error){
            console.error('DAO error, (donationDAO create()): ', error.message);
            throw error;
        }
    }

    /**
   * Updates donation.
   * @static
   * @param {Donation} donation - Donation instance to update.
   * @param {object} data - New data fields.
   * @param {object} [transaction] - Sequelize transaction.
   * @returns {Promise<Donation>} Updated donation.
   * @throws {Error} Throws error if operation fails.
   */
    static async update(donation, data, transaction){
        try{
            await donation.update(data, {transaction})
            return donation;
        }catch(error){
            console.error("DAO error(update, donationDAO): ", error.message,error.errors?.map(e=>({
                message: e.message,
                path: e.path,
            })));
            throw error;
        }
    }
    
     /**
   * Deletes donation(s) by ID(s).
   * @static
   * @param {number|number[]} ids - Single ID or array of IDs.
   * @param {object} [transaction] - Sequelize transaction.
   * @returns {Promise<boolean>} True if deletion succeeded.
   * @throws {Error} Throws error if operation fails.
   */
    static async deleteById(ids, transaction){
        try{
            const where = Array.isArray(ids) ? {id: [Op.in]=ids}: {id:ids};
            const countDeleted = await Donation.destroy({where, transaction});
            return countDeleted > 0;
        }catch(error){
            console.error('DAO error(donationDAO, deltedById()): ', error.message);
            throw error;
        }
    }

}

module.exports = DonationDAO;