'use strict';

const { sequelize } = require('../models');
const InventoryDAO = require('../dao/inventoryDao');

class InventoryService {
    /**
     * Fetch all inventory items.
     * @returns {Promise<Array<Inventory>>} - Returns an array of all inventory items.
     * @throws {Error} - Throws an error if fetching fails.
     */
    static async findAll() {
        try {
            return await InventoryDAO.findAll();
        } catch (error) {
            console.error('Service error, (InventoryService, findAll()): ', error.message);
            throw new Error('Failed to fetch inventory.');
        }
    }

    /**
     * Find a specific inventory item.
     * 
     * @param {string} category - The category ('food' or 'miscellaneous').
     * @param {string|null} foodType - Food type ('dog' or 'cat'), or null for misc.
     * @param {string|null} foodForm - Food form ('wet' or 'dry'), or null for misc.
     * @param {string|null} itemName - Misc item name ('collar' or 'toy'), or null for food.
     * @returns {Promise<Inventory>} - The found inventory item.
     * @throws {Error} - Throws an error if the item is not found.
     */
    static async findItem(category, foodType = null, foodForm = null, itemName = null) {
        try {
            const item = await InventoryDAO.findItem(category, foodType, foodForm, itemName);
            if (!item) throw new Error(`Item not Found!: ${category} (${foodType || itemName})!`);
            return item;
        } catch (error) {
            console.error('Service error, (InventoryService, findItem()): ', error.message);
            throw error;
        }
    }

    /**
     * Update inventory quantity.
     * Uses transactions to ensure atomicity.
     * First, it finds the item, then updates its quantity.
     * 
     * @param {string} category
     * @param {string|null} foodType
     * @param {string|null} foodForm
     * @param {string|null} itemName
     * @param {number} quantity - The new quantity to set.
     * @returns {Promise<Inventory>} - The updated inventory item.
     * @throws {Error} - Throws an error if update fails or the item does not exist.
     */
    static async updateQuantity(category, foodType, foodForm, itemName, quantity) {
        const transaction = await sequelize.transaction();
        try {
            const item = await this.findItem(category, foodType, foodForm, itemName);
            const updatedItem = await InventoryDAO.updateQuantity(item, quantity, transaction);
            await transaction.commit();
            return updatedItem;
        } catch (error) {
            await transaction.rollback();
            console.error('Service error, (InventoryService, updateQuantity()): ', error.message);
            throw error;
        }
    }

    /**
     * Increase inventory quantity.
     * Uses transactions to ensure atomicity.
     * First, it finds the item, then increases its quantity.
     * 
     * @param {string} category
     * @param {string|null} foodType
     * @param {string|null} foodForm
     * @param {string|null} itemName
     * @param {number} amount - The amount to add.
     * @returns {Promise<Inventory>} - The updated inventory item.
     * @throws {Error} - Throws an error if update fails or the item does not exist.
     */
    static async increaseQuantity(category, foodType, foodForm, itemName, amount) {
        const transaction = await sequelize.transaction();
        try {
            const item = await this.findItem(category, foodType, foodForm, itemName);
            const updatedItem = await InventoryDAO.increaseQuantity(item, amount, transaction);
            await transaction.commit();
            return updatedItem;
        } catch (error) {
            await transaction.rollback();
            console.error('Service error, (InventoryService, increaseQuantity()): ', error.message);
            throw error;
        }
    }

    /**
     * Decrease inventory quantity.
     * Ensures stock does not go below zero.
     * Uses transactions to ensure atomicity.
     * First, it finds the item, then decreases its quantity.
     * 
     * @param {string} category
     * @param {string|null} foodType
     * @param {string|null} foodForm
     * @param {string|null} itemName
     * @param {number} amount - The amount to subtract.
     * @returns {Promise<Inventory>} - The updated inventory item.
     * @throws {Error} - Throws an error if stock is insufficient, the item does not exist, or update fails.
     */
    static async decreaseQuantity(category, foodType, foodForm, itemName, amount) {
        const transaction = await sequelize.transaction();
        try {
            const item = await this.findItem(category, foodType, foodForm, itemName); 
            if (item.quantity < amount) {
                throw new Error(`Not enough stock available for ${item.category} (${item.food_type || item.item_name})!`);
            }

            const updatedItem = await InventoryDAO.decreaseQuantity(item, amount, transaction);
            await transaction.commit();
            return updatedItem;
        } catch (error) {
            await transaction.rollback();
            console.error('Service error, (InventoryService, decreaseQuantity()): ', error.message);
            throw error;
        }
    }

    /**
     * Reset all inventory stock to zero.
     * Uses transactions to ensure atomicity.
     * 
     * @returns {Promise<void>}
     * @throws {Error} - Throws an error if reset fails.
     */
    static async resetInventory() {
        const transaction = await sequelize.transaction();
        try {
            await InventoryDAO.resetInventory(transaction);
            await transaction.commit();
        } catch (error) {
            await transaction.rollback();
            console.error('Service error, (InventoryService, resetInventory()): ', error.message);
            throw new Error('Failed to reset inventory.');
        }
    }
}

module.exports = InventoryService;
