const { Donor } = require("../models");

/**
 * Data Access Object for Donor model operations
 */
class DonorDAO {
  /**
   * Creates a new donor record
   * @param {Object} donor - Donor data to create
   * @param {Object} [transaction] - Sequelize transaction object
   * @returns {Promise<Donor>} Newly created donor instance
   * @throws {Error} "Duplicate entry" if email constraint violated
   * @throws {Error} General database error
   */
  static async create(donor, transaction) {
    try {
      const newDonor = await Donor.create(donor, { transaction });
      return newDonor;
    } catch (error) {
      if (error.name === "SequelizeUniqueConstraintError") {
        console.error(
          "DAO Error (createDonor) Unique constraint error:",
          error.errors.map((e) => e.message)
        );
        throw new Error(
          "Duplicate entry: A donor with this email already exists."
        );
      }
      console.error("DAO Error (createDonor):", error);
      throw new Error("Database error while creating donor");
    }
  }
  /**
   * Finds donor by email address
   * @param {string} email - Email to search
   * @returns {Promise<Donor|null>} Found donor or null
   * @throws {Error} Database query error
   */
  static async findByEmail(email) {
    try {
      const donor = await Donor.findOne({
        where: {
          email: email,
        },
      });
      return donor;
    } catch (error) {
      console.error("DAO Error (DonorDAO, findByEmail):", error);
      throw new Error("Database error while checking donor email");
    }
  }

  /**
   * Retrieves all donor records
   * @returns {Promise<Donor[]>} Array of all donors
   * @throws {Error} Database query error
   */
  static async findAll() {
    try {
      return await Donor.findAll();
    } catch (error) {
      console.error("DAO Error (findAll):", error);
      throw error;
    }
  }

   /**
   * Finds donor by primary key ID
   * @param {number} id - Donor ID to retrieve
   * @returns {Promise<Donor|null>} Found donor or null
   * @throws {Error} Database query error
   */
  static async findById(id) {
    try {
      return await Donor.findByPk(id);
    } catch (error) {
      console.error("DAO Error (findById):", error);
      throw error;
    }
  }

 
/**
   * Updates donor record
   * @param {Donor} donor - Donor instance to update
   * @param {Object} data - New data values
   * @param {Object} [transaction] - Sequelize transaction
   * @returns {Promise<Donor>} Updated donor instance
   * @throws {Error} Database/validation error
   */
  static async update(donor, data, transaction) {
    try {
      await donor.update(data, { transaction });
      return donor;
    } catch (error) {
      console.error(
        "DAO Error (update, donorDAO):",
        error.errors.map((e) => ({
          message: e.message,
          path: e.path,
        }))
      );
      throw error;
    }
  }

 /**
   * Deletes donor by ID
   * @param {number} id - Donor ID to delete
   * @param {Object} [transaction] - Sequelize transaction
   * @returns {Promise<boolean>} True if deletion succeeded
   * @throws {Error} Database error
   */
  static async deleteById(id, transaction){
    try{
      const countDeleted = await Donor.destroy({where: {id:id}},{ transaction})
      return countDeleted > 0
    }catch(error){
      console.error('DAO error (deleteById):', error.message)
      throw error
    }
  }


}

module.exports = DonorDAO;
