const DonationDAO = require("../dao/DonationDAO");
const supplierService = require('./supplierService');
const { sequelize } = require("../models");


class DonationService {


     /**
   * Creates a new donation associated with a supplier.
   * @param {Object} donation - Donation data to create
   * @param {number} supplierId - ID of the associated supplier
   * @returns {Promise<Donation>} Newly created donation with supplier association
   * @throws {Error} If supplier not found or database operation fails
   */
    static async createDonation(donation, id) {
        const transaction = await sequelize.transaction();
        try {
            console.log('DonationService.createDonation:', donation, id);
            const supplier = await supplierService.findById(donation.supplier_id);
            const newDonation = await DonationDAO.create(donation, {transaction});
            await newDonation.setSupplier(supplier, {transaction});
            await transaction.commit();
            return newDonation;
        } catch (error) {
            await transaction.rollback();
            console.error('DonationService error (create donation):', error.message, error.errors?.map(e => ({
                message: e.message,
                path: e.path
            })));
            throw error
        }
    }

    /**
   * Retrieves all donations with their associated supplier data(if include set to true!).
   * @returns {Promise<Donation[]>} Array of donations including supplier details
   * @throws {Error} If database query fails
   */
    static async findAllDonations(include=false) {
        try{
           
            return await DonationDAO.findAll(include);
        }catch(error){
            console.error("DonationService error (findAllDoantions):", error.message);
            throw error;
        }
    }


/**
 * Retrieves a donation by ID with optional supplier inclusion, validating its existence.
 * @param {number} id - ID of the donation to retrieve
 * @param {boolean} [include=false] - Whether to include associated Supplier data
 * @returns {Promise<Donation>} Found donation record with optional association
 * @throws {Error} "Donation Not Found" if no record exists
 * @throws {Error} Propagates database errors
 */
    static async findDonationById(id, include=false){
        try{
            const donation = await DonationDAO.findById(id, include);
            if(donation){
                return donation;
            }else{
                throw new Error("Donation Not Found.")
            }
        }catch(error){
            console.error('DonationService error(findDonationById): ', error.message);
            throw error;

        }
    }

   /**
 * Deletes a donation by ID within a transaction, ensuring atomicity.
 * @param {number} id - ID of the donation to delete
 * @returns {Promise<boolean>} True if deletion succeeded, false otherwise
 * @throws {Error} "Donation Not Found" if no record exists
 * @throws {Error} Propagates database transaction errors
 */
    static async deleteDonationById(id){
        const transaction = await sequelize.transaction();
        try{
            const donation = await this.findDonationById(id);
            const isDeleted = await DonationDAO.deleteById(donation.id, transaction);
            await transaction.commit();
            return isDeleted;
        }catch(error){
            console.error("donationSerivce error(deleteDonationById): ", error.message);
            await transaction.rollback();
            throw error;
        }
    }

    /**
 * Updates a donation record within a transaction, ensuring data consistency.
 * @param {number} id - ID of the donation to update
 * @param {Object} data - New data to apply to the donation
 * @returns {Promise<Donation>} Updated donation instance
 * @throws {Error} "Donation Not Found" if no record exists
 * @throws {Error} Propagates validation/database errors
 */
    static async updateDonation(id, data){
        const transaction = await sequelize.transaction();
        try{
            const oldDonation = await this.findDonationById(id);
            const newDonation = await DonationDAO.update(oldDonation, data, transaction);
            await transaction.commit();
            return newDonation;
        }catch(error){
            await transaction.rollback();
            console.error('donationSerive error (updateSupplier):',
                 error.errors?.map(e=>({
                    message:e.message,
                    path: e.path
                 }), error.message                    
            ));
            throw error;
        }
    }
}

module.exports = DonationService;