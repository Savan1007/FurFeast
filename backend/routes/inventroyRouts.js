'use strict';

const express = require('express');
const InventoryController = require('../controllers/inventoryController');

const router = express.Router();

router.get('/inventory', InventoryController.findAll);
router.put('/inventory', InventoryController.updateInventoryQuantity);
router.post('/inventory', InventoryController.adjustInventory);
router.post('/inventory/reset', InventoryController.resetInventory);

module.exports = router;
