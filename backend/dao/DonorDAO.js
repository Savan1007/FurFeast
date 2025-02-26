const { Donor } = require("../models");

class DonorDAO {
  /**
   * Create a new donor
   * @param {Object} donor - Donor data
   * @param {Object} transaction - Sequelize transaction
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

  static async findByEmail(email) {
    try {
      const donor = await Donor.findOne({
        where: {
          email: email,
        },
      });
      return donor;
    } catch (error) {
      console.error("DAO Error (getDonorByEmail):", error);
      throw new Error("Database error while checking donor email");
    }
  }

  /**
   * Get all donors
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
   * Get a donor by ID
   * @param {number} id - Donor ID
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
   * Update donor details
   * @param {number} id - Donor ID
   * @param {Object} data - Updated donor details
   * @param {Object} transaction - Sequelize transaction
   * @returns {(null|Donor)}
   */
  static async update(donor, data, transaction) {
    try {
      await donor.update(data, { transaction });
      return donor;
    } catch (error) {
      console.error(
        "DAO Error (update):",
        error.errors.map((e) => ({
          message: e.message,
          path: e.path,
        }))
      );
      throw error;
    }
  }


  /**
   * @param {number} id - Donor ID
   * @returns {true|false} Retuens true if deleted, fasle if not
   */
  static async deleteById(id, transaction){
    try{
      const countDeleted = await Donor.destroy({where: {id:id}}, transaction)
      return countDeleted > 0
    }catch(error){
      console.error('DAO error (deleteById):', error.message)
      throw error
    }
  }


}

module.exports = DonorDAO;
