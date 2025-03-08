'use strict';

const { Inventory } = require('../models');

class InventoryDAO {
    /**
     * Fetch all inventory items.
     * @returns {Promise<Array<Inventory>>} - An array of all inventory items.
     * @throws {Error} - Throws an error if fetching fails.
     */
    static async findAll() {
        try {
            return await Inventory.findAll();
        } catch (error) {
            console.error('DAO error, (InventoryDAO, findAll()): ', error.message);
            throw error;
        }
    }

    /**
     * Find an inventory item by its attributes.
     * 
     * @param {string} category - The category of the item ('food' or 'miscellaneous').
     * @param {string|null} foodType - If 'food', specify type ('dog' or 'cat'), otherwise null.
     * @param {string|null} foodForm - If 'food', specify form ('wet' or 'dry'), otherwise null.
     * @param {string|null} itemName - If 'miscellaneous', specify item ('collar' or 'toy'), otherwise null.
     * @returns {Promise<Inventory|null>} - Returns the inventory item if found, otherwise null.
     * @throws {Error} - Throws an error if fetching fails.
     */
    static async findItem(category, foodType = null, foodForm = null, itemName = null) {
        try {
            return await Inventory.findOne({
                where: { category, food_type: foodType, food_form: foodForm, item_name: itemName }
            });
        } catch (error) {
            console.error('DAO error, (InventoryDAO, findItem()): ', error.message);
            throw error;
        }
    }

    /**
     * Update the quantity of an inventory item.
     * 
     * @param {Inventory} item - The inventory item model object.
     * @param {number} quantity - The new quantity to set.
     * @param {object} transaction - Sequelize transaction object.
     * @returns {Promise<Inventory>} - The updated inventory item.
     */
    static async updateQuantity(item, quantity, transaction) {
        try {
            item.quantity = quantity;
            await item.save({ transaction });
            return item;
        } catch (error) {
            console.error('DAO error, (InventoryDAO, updateQuantity()): ', error.message);
            throw error;
        }
    }

    /**
     * Increase the quantity of an inventory item.
     * 
     * @param {Inventory} item - The inventory item model object.
     * @param {number} amount - The amount to add.
     * @param {object} transaction - Sequelize transaction object.
     * @returns {Promise<Inventory>} - The updated inventory item.
     */
    static async increaseQuantity(item, amount, transaction) {
        try {
            if(amount ===null || amount === undefined){
                throw new Error("Amount should be a positive Number! or check the dictation of that!");
            }
            item.quantity += amount;
            await item.save({ transaction });
            return item;
        } catch (error) {
            console.error('DAO error, (InventoryDAO, increaseQuantity()): ', error.message);
            throw error;
        }
    }

    /**
     * Decrease the quantity of an inventory item.
     * Ensures stock does not go below zero.
     * 
     * @param {Inventory} item - The inventory item model object.
     * @param {number} amount - The amount to subtract.
     * @param {object} transaction - Sequelize transaction object.
     * @returns {Promise<Inventory>} - The updated inventory item.
     * @throws {Error} - Throws an error if stock is insufficient.
     */
    static async decreaseQuantity(item, amount, transaction) {
        try {
            if (item.quantity < amount) {
                throw new Error(`Not enough stock available for ${item.category} (${item.food_type || item.item_name})!`);
            }else if(amount ===null || amount === undefined){
                throw new Error("Amount should be a positive Number! or check the dictation of that!");
            }
            item.quantity -= amount;
            console.log(item.quantity)
            await item.save({ transaction });
            return item;
        } catch (error) {
            console.error('DAO error, (InventoryDAO, decreaseQuantity()): ', error.message);
            throw error;
        }
    }

    /**
     * Reset all inventory stock to zero.
     * 
     * @param {object} transaction - Sequelize transaction object.
     * @returns {Promise<void>}
     * @throws {Error} - Throws an error if reset fails.
     */
    static async resetInventory(transaction) {
        try {
            await Inventory.update({ quantity: 0 }, { where: {}, transaction });
        } catch (error) {
            console.error('DAO error, (InventoryDAO, resetInventory()): ', error.message);
            throw error;
        }
    }
}

module.exports = InventoryDAO;
