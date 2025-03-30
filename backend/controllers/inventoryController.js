'use strict';

const InventoryService = require('../service/InventoryService');
const { validationResult } = require("express-validator");


class InventoryController {
 
    static async findAll(req, res) {
        try {
            const data = await InventoryService.findAll();
            return res.status(200).json({ success: true, data });
        } catch (error) {
            console.error('Controller error, (InventoryController, getAllInventory()): ', error.message);
            return res.status(500).json({ success: false, message: 'Failed to fetch inventory.' });
        }
    }

    static async findById(req, res) {
        try {
            const errors = validationResult(req).array();
            if(errors.length>0){throw { status: 400, errors: errors };}
            const data = await InventoryService.findById(req.params.id);
            return res.status(200).json({ success: true, data });
        } catch (error) {
            if (error?.errors) {return res.status(error.status || 400).json({ success: false, message: 'Validation error', errors: error.errors });}
            console.error('Controller error, (InventoryController, getAllInventory()): ', error.message);
            return res.status(500).json({ success: false, message: 'Failed to fetch inventory.' });
        }
    }


    static async getInventoryItem(req, res) {
        try {
            const { category, foodType, foodForm, itemName } = req.query;
            const item = await InventoryService.findItem(category, foodType, foodForm, itemName);
            return res.status(200).json({ success: true, data: item });
        } catch (error) {
            console.error('Controller error, (InventoryController, getInventoryItem()): ', error.message);
            return res.status(404).json({ success: false, message: error.message });
        }
    }

  
    static async updateInventoryQuantity(req, res) {
        try {
            const errors = validationResult(req).array();
            if(errors.length>0){throw { status: 400, errors: errors };}
            const { quantity } = req.body;
            const id = req.params.id
            console.log('here in controller')
            const updatedItem = await InventoryService.updateInventoryQuantity(id, quantity);
            res.status(200).json({ success: true, data: updatedItem });
        } catch (error) {
            if (error?.errors) {return res.status(error.status || 400).json({ success: false, message: 'Validation error', errors: error.errors });}
            console.error('Controller error, (InventoryController, updateInventoryQuantity()): ', error.message);
            return res.status(400).json({ success: false, message: error.message });
        }
    }

    static async adjustInventory(req, res) {
        try {
            const { category, foodType, foodForm, itemName, amount, operation } = req.body;
    
            if (operation === 'increase') {
                const updatedItem = await InventoryService.increaseQuantity(category, foodType, foodForm, itemName, amount);
                return res.status(200).json({ success: true, data: updatedItem });
            } else if (operation === 'decrease') {
                const updatedItem = await InventoryService.decreaseQuantity(category, foodType, foodForm, itemName, amount);
                return res.status(200).json({ success: true, data: updatedItem });
            } else {
                return res.status(400).json({ success: false, message: 'Invalid operation. Use "increase" or "decrease".' });
            }
        } catch (error) {
            console.error('Controller error, (InventoryController, adjustInventory()): ', error.message);
            return res.status(400).json({ success: false, message: error.message });
        }
    }
  
    static async resetInventory(req, res) {
        try {
            await InventoryService.resetInventory();
            return res.status(200).json({ success: true, message: 'Inventory reset successfully.' });
        } catch (error) {
            console.error('Controller error, (InventoryController, resetInventory()): ', error.message);
            return res.status(500).json({ success: false, message: 'Failed to reset inventory.' });
        }
    }
}

module.exports = InventoryController;
