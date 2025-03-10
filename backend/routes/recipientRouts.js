const express = require('express');
const recipientController = require('../controllers/recipientController');
const router = express.Router();


/**
 * @swagger
 * components:
 *   schemas:
 *     Recipient:
 *       type: object
 *       required:
 *         - name
 *         - phone
 *         - email
 *         - address
 *         - recipient_type
 *       properties:
 *         id:
 *           type: integer
 *           readOnly: true
 *           example: 1
 *         name:
 *           type: string
 *           example: "City Animal Shelter"
 *         contact_person:
 *           type: string
 *           nullable: true
 *           example: "John Doe"
 *         phone:
 *           type: string
 *           example: "+1-555-123-4567"
 *         email:
 *           type: string
 *           format: email
 *           example: "shelter@example.com"
 *         address:
 *           type: string
 *           example: "123 Main St, Cityville"
 *         recipient_type:
 *           type: string
 *           enum: [shelter, foster, organization]
 *           example: shelter
 *         notes:
 *           type: string
 *           nullable: true
 *           example: "Accepts only cat food"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           readOnly: true
 *           example: "2024-03-20T12:00:00Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           readOnly: true
 *           example: "2024-03-20T12:00:00Z"

 *   responses:
 *     RecipientNotFound:
 *       description: The requested recipient was not found
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
 *                 example: "Recipient not found"
 */

/**
 * @swagger
 * /recipient:
 *   post:
 *     tags: [Recipient]
 *     summary: Create a new recipient
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Recipient'
 *     responses:
 *       201:
 *         description: Recipient created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Recipient'
 
 */
router.post("/recipient", recipientController.create);

/**
 * @swagger
 * /recipient:
 *   get:
 *     tags: [Recipient]
 *     summary: Retrieve all recipients
 *     responses:
 *       200:
 *         description: A list of all recipients
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Recipient'
 *       500:
 *         description: Internal server error
 */
router.get("/recipient", recipientController.findAll);

/**
 * @swagger
 * /recipient/{id}:
 *   get:
 *     tags: [Recipient]
 *     summary: Get recipient by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Recipient found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Recipient'
 */
router.get("/recipient/:id", recipientController.findByPk);

/**
 * @swagger
 * /recipient/{id}:
 *   put:
 *     tags: [Recipient]
 *     summary: Update an existing recipient
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Recipient'
 *     responses:
 *       200:
 *         description: Recipient updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Recipient'
 */
router.put("/recipient/:id", recipientController.update);

/**
 * @swagger
 * /recipient/{id}:
 *   delete:
 *     tags: [Recipient]
 *     summary: Delete a recipient
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Successfully deleted
 */
router.delete("/recipient/:id", recipientController.delete);





module.exports = router;