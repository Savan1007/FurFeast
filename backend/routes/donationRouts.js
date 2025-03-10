const express = require('express');
const donationController = require('../controllers/donationController');

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Donation:
 *       type: object
 *       required:
 *         - donation_category
 *         - supplier_id
 *       properties:
 *         id:
 *           type: integer
 *           readOnly: true
 *           example: 1
 *         supplier_id:
 *           type: integer
 *           example: 123
 *         donation_category:
 *           type: string
 *           enum: [food, miscellaneous]
 *           example: food
 *         food_type:
 *           type: string
 *           enum: [dog, cat]
 *           nullable: true
 *           example: dog
 *         food_form:
 *           type: string
 *           enum: [dry, wet]
 *           nullable: true
 *           example: dry
 *         item_name:
 *           type: string
 *           enum: [collar, toy]
 *           nullable: true
 *           example: collar
 *         quantity:
 *           type: integer
 *           nullable: true
 *           example: 5
 *         unit:
 *           type: string
 *           enum: [kg, can, piece]
 *           nullable: true
 *           example: kg
 *         date_received:
 *           type: string
 *           format: date-time
 *           nullable: true
 *           example: "2024-03-20T12:00:00Z"
 *         status:
 *           type: string
 *           enum: [pending, received, processed]
 *           example: pending
 *         notes:
 *           type: string
 *           nullable: true
 *           example: "Special instructions"
 *     Supplier:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 123
 *         name:
 *           type: string
 *           example: "Pet Food Inc."
 * 
 *   responses:
 *     NotFound:
 *       description: The requested resource was not found
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               success:
 *                 type: boolean
 *                 example: false
 *               message:
 *                 type: string
 *                 example: "Donation not found"
 *     ValidationError:
 *       description: Validation error
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               success:
 *                 type: boolean
 *                 example: false
 *               message:
 *                 type: string
 *                 example: "Validation failed"
 *               errors:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                     path:
 *                       type: string
 */

/**
 * @swagger
 * /donation:
 *   get:
 *     summary: Retrieve all donations
 *     tags: [Donations]
 *     parameters:
 *       - in: query
 *         name: includeSupplier
 *         schema:
 *           type: boolean
 *         description: Include supplier details
 *         example: true
 *     responses:
 *       200:
 *         description: List of donations
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Donation'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "could not fetch donations!"
 */
router.get('/donation', donationController.findAll);

/**
 * @swagger
 * /donation/{id}:
 *   get:
 *     summary: Get a donation by ID
 *     tags: [Donations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *       - in: query
 *         name: includeSupplier
 *         schema:
 *           type: boolean
 *         description: Include supplier details
 *         example: true
 *     responses:
 *       200:
 *         description: Donation details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Donation'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 */
router.get('/donation/:id', donationController.findById)

/**
 * @swagger
 * /donation:
 *   post:
 *     summary: Create a new donation
 *     tags: [Donations]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - donation
 *               - id
 *             properties:
 *               donation:
 *                 $ref: '#/components/schemas/Donation'
 *               id:
 *                 type: integer
 *                 description: Supplier ID
 *                 example: 123
 *           example:
 *             donation:
 *               supplier_id: 123
 *               donation_category: food
 *               food_type: dog
 *               food_form: dry
 *               quantity: 10
 *               unit: kg
 *             id: 123
 *     responses:
 *       201:
 *         description: Donation created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "donation added successfully"
 *                 data:
 *                   $ref: '#/components/schemas/Donation'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       404:
 *         description: Supplier not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Supplier not found"
 */
router.post('/donation', donationController.create);

/**
 * @swagger
 * /donation/{id}:
 *   delete:
 *     summary: Delete a donation
 *     tags: [Donations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       204:
 *         description: Donation deleted successfully
 *       404:
 *         $ref: '#/components/responses/NotFound'
 */
router.delete('/donation/:id', donationController.delete);

/**
 * @swagger
 * /donation/{id}:
 *   put:
 *     summary: Update a donation
 *     tags: [Donations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               donation:
 *                 $ref: '#/components/schemas/Donation'
 *           example:
 *             donation:
 *               status: processed
 *               notes: "Processed on 2024-03-21"
 *     responses:
 *       200:
 *         description: Donation updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Donation'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 */
router.put('/donation/:id', donationController.update);
module.exports = router;