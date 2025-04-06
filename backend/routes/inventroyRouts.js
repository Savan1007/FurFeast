'use strict';

const express = require('express');
const InventoryController = require('../controllers/inventoryController');
const {findByIdValidation, updateInventoryQuantity, updateInventoryByModel} = require('../validator/inventroyValidator');

const router = express.Router();

router.get('/inventory', InventoryController.findAll);
router.get('/inventory/:id', findByIdValidation,InventoryController.findById);
router.put('/inventory/:id', updateInventoryQuantity,InventoryController.updateInventoryQuantity);
router.post('/inventory/reset', InventoryController.resetInventory);
router.put('/inventory/update/:id', updateInventoryByModel,InventoryController.updateByModel);
module.exports = router;
