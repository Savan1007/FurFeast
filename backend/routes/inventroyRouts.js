'use strict';

const express = require('express');
const InventoryController = require('../controllers/inventoryController');

const router = express.Router();


/**
 * @swagger
 * tags:
 *   name: Inventory
 *   description: Managing Inventory (view, update, reset stock, etc.)
 */


/**
 * @swagger
 * components:
 *   schemas:
 *     Inventory:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         category:
 *           type: string
 *           enum: [food, miscellaneous]
 *           example: "food"
 *         food_type:
 *           type: string
 *           enum: [dog, cat]
 *           nullable: true
 *           example: "dog"
 *         food_form:
 *           type: string
 *           enum: [dry, wet]
 *           nullable: true
 *           example: "wet"
 *         item_name:
 *           type: string
 *           enum: [collar, toy]
 *           nullable: true
 *           example: "collar"
 *         quantity:
 *           type: integer
 *           example: 50
 *         unit:
 *           type: string
 *           enum: [kg, can, piece]
 *           nullable: true
 *           example: "kg"
 *         last_updated:
 *           type: string
 *           format: date-time
 *           example: "2025-01-01T10:00:00.000Z"
 */



/**
 * @swagger
 * /inventory:
 *   get:
 *     summary: Retrieve all inventory items
 *     tags: [Inventory]
 *     responses:
 *       200:
 *         description: A JSON array of all inventory items
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/InventoryItem'
 */
router.get('/inventory', InventoryController.findAll);

/**
 * @swagger
 * /inventory:
 *   put:
 *     summary: Set the exact quantity for a specific item
 *     tags: [Inventory]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               category:
 *                 type: string
 *                 example: food
 *               foodType:
 *                 type: string
 *                 example: dog
 *               foodForm:
 *                 type: string
 *                 example: wet
 *               itemName:
 *                 type: string
 *                 example: null
 *               quantity:
 *                 type: integer
 *                 example: 100
 *     responses:
 *       200:
 *         description: Returns the updated item
 */
router.put('/inventory', InventoryController.updateInventoryQuantity);

/**
 * @swagger
 * /inventory:
 *   post:
 *     summary: Increase or decrease a specific item quantity
 *     tags: [Inventory]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               category:
 *                 type: string
 *                 example: miscellaneous
 *               foodType:
 *                 type: string
 *                 example: null
 *               foodForm:
 *                 type: string
 *                 example: null
 *               itemName:
 *                 type: string
 *                 example: collar
 *               amount:
 *                 type: integer
 *                 example: 10
 *               operation:
 *                 type: string
 *                 example: increase
 *                 description: "Use 'increase' or 'decrease'"
 *     responses:
 *       200:
 *         description: Returns the updated item
 */
router.post('/inventory', InventoryController.adjustInventory);

/**
 * @swagger
 * /inventory/reset:
 *   post:
 *     summary: Resets all inventory items to 0 quantity
 *     tags: [Inventory]
 *     responses:
 *       200:
 *         description: Inventory successfully reset
 */
router.post('/inventory/reset', InventoryController.resetInventory);

module.exports = router;
