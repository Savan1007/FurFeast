'use strict';

const express = require('express');
const InventoryController = require('../controllers/inventoryController');
const {findByIdValidation, updateInventoryQuantity} = require('../validator/inventroyValidator');

const router = express.Router();

router.get('/inventory', InventoryController.findAll);
router.get('/inventory/:id', findByIdValidation,InventoryController.findById);
router.put('/inventory/:id', updateInventoryQuantity,InventoryController.updateInventoryQuantity);
router.post('/inventory/reset', InventoryController.resetInventory);

module.exports = router;
