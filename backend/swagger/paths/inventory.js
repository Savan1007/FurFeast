/**
 * @swagger
 * tags:
 *   name: Inventory
 *   description: Inventory management endpoints
 */

/**
 * @swagger
 * /inventory:
 *   get:
 *     summary: Get all inventory items
 *     tags: [Inventory]
 *     responses:
 *       200:
 *         description: List of all inventory items
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /inventory/{id}:
 *   get:
 *     summary: Get a single inventory item by ID
 *     tags: [Inventory]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *         description: Inventory item ID
 *     responses:
 *       200:
 *         description: Inventory item found
 *       400:
 *         description: Validation error
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /inventory/{id}:
 *   put:
 *     summary: Update quantity of an inventory item by ID
 *     tags: [Inventory]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *         description: Inventory item ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             quantity: 100
 *     responses:
 *       200:
 *         description: Inventory quantity updated
 *       400:
 *         description: Validation or update error
 */

/**
 * @swagger
 * /inventory/reset:
 *   post:
 *     summary: Reset all inventory quantities to zero
 *     tags: [Inventory]
 *     responses:
 *       200:
 *         description: Inventory reset successfully
 *       500:
 *         description: Server error
 */
