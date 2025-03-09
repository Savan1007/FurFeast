const { Supplier } = require("../models");

/**
 * Data Access Object for Supplier model operations
 */
class SupplierDAO {
  /**
   * Creates a new supplier record
   * @param {Object} supplier - Supplier data to create
   * @param {Object} [transaction] - Sequelize transaction object
   * @returns {Promise<Supplier>} Newly created supplier instance
   * @throws {Error} "Duplicate entry" if email constraint violated
   * @throws {Error} General database error
   */
  static async create(supplier, transaction) {
    try {
      const newSupplier = await Supplier.create(supplier, { transaction });
      return newSupplier;
    } catch (error) {
      if (error.name === "SequelizeUniqueConstraintError") {
        console.error(
          "DAO Error (createSupplier) Unique constraint error:",
          error.errors.map((e) => e.message)
        );
        throw new Error(
          "Duplicate entry: A supplier with this email already exists."
        );
      }
      console.error("DAO Error (createSupplier):", error);
      throw new Error("Database error while creating supplier");
    }
  }
  /**
   * Finds supplier by email address
   * @param {string} email - Email to search
   * @returns {Promise<Supplier|null>} Found supplier or null
   * @throws {Error} Database query error
   */
  static async findByEmail(email) {
    try {
      const supplier = await Supplier.findOne({
        where: {
          email: email,
        },
      });
      return supplier;
    } catch (error) {
      console.error("DAO Error (SupplierDAO, findByEmail):", error);
      throw new Error("Database error while checking supplier email");
    }
  }

  /**
   * Retrieves all supplier records
   * @returns {Promise<Supplier[]>} Array of all suppliers
   * @throws {Error} Database query error
   */
  static async findAll() {
    try {
      return await Supplier.findAll();
    } catch (error) {
      console.error("DAO Error (findAll):", error);
      throw error;
    }
  }

   /**
   * Finds supplier by primary key ID
   * @param {number} id - Supplier ID to retrieve
   * @returns {Promise<Supplier|null>} Found supplier or null
   * @throws {Error} Database query error
   */
  static async findById(id) {
    try {
      return await Supplier.findByPk(id);
    } catch (error) {
      console.error("DAO Error (findById):", error);
      throw error;
    }
  }

 
/**
   * Updates supplier record
   * @param {Supplier} supplier - Supplier instance to update
   * @param {Object} data - New data values
   * @param {Object} [transaction] - Sequelize transaction
   * @returns {Promise<Supplier>} Updated supplier instance
   * @throws {Error} Database/validation error
   */
  static async update(supplier, data, transaction) {
    try {
      await supplier.update(data, { transaction });
      return supplier;
    } catch (error) {
      console.error(
        "DAO Error (update, supplierDAO):",
        error.errors.map((e) => ({
          message: e.message,
          path: e.path,
        }))
      );
      throw error;
    }
  }

 /**
   * Deletes supplier by ID
   * @param {number} id - Supplier ID to delete
   * @param {Object} [transaction] - Sequelize transaction
   * @returns {Promise<boolean>} True if deletion succeeded
   * @throws {Error} Database error
   */
  static async deleteById(id, transaction){
    try{
      const countDeleted = await Supplier.destroy({where: {id:id}},{ transaction})
      return countDeleted > 0
    }catch(error){
      console.error('DAO error (deleteById):', error.message)
      throw error
    }
  }


}

module.exports = SupplierDAO;
