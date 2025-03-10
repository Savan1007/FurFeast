const express = require('express');
const supplierController = require('../controllers/supplierController');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Suppliers
 *   description: Supplier management
 */

/**
 * @swagger
 * /suppliers:
 *   get:
 *     summary: Get all suppliers
 *     tags: [Suppliers]
 *     responses:
 *       200:
 *         description: A list of suppliers
 *       500:
 *         description: Server error
 */
router.get('/suppliers', supplierController.findAll);


/**
 * @swagger
 * /suppliers:
 *   post:
 *     summary: Create a new supplier
 *     tags: [Suppliers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               supplier:
 *                 $ref: '#/components/schemas/Supplier'
 *     responses:
 *       201:
 *         description: Supplier created
 *       400:
 *         description: Invalid input
 *       409:
 *         description: Duplicate email
 */
router.post('/suppliers',supplierController.create);


/**
 * @swagger
 * /suppliers/{id}:
 *   get:
 *     summary: Get a supplier by ID
 *     tags: [Suppliers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Supplier data
 *       404:
 *         description: Supplier not found
 */
router.get('/suppliers/:id', supplierController.findByPk);

/**
 * @swagger
 * /suppliers/{id}:
 *   put:
 *     summary: Update a supplier
 *     tags: [Suppliers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               supplier:
 *                 $ref: '#/components/schemas/Supplier'
 *     responses:
 *       201:
 *         description: Supplier updated
 *       400:
 *         description: Invalid input
 */
router.put('/suppliers/:id',supplierController.update);



/**
 * @swagger
 * /suppliers/{id}:
 *   delete:
 *     summary: Delete a supplier
 *     tags: [Suppliers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Supplier deleted
 *       404:
 *         description: Supplier not found
 */
router.delete('/suppliers/:id', supplierController.delete);



module.exports = router;