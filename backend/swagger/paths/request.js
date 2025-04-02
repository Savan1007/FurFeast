/**
 * @swagger
 * tags:
 *   name: Request
 *   description: Donation and Distribution Requests
 */

/**
 * @swagger
 * /request:
 *   get:
 *     summary: Get all requests
 *     tags: [Request]
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *       - in: query
 *         name: requestType
 *         schema:
 *           type: string
 *           enum: [donation, distribution]
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *           description: MongoDB ObjectId of the user
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *           description: Filter requests created after this date
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *           description: Filter requests created before this date
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *       - in: query
 *         name: includeDetails
 *         schema:
 *           type: string
 *       - in: query
 *         name: includeUser
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of requests
 */


/**
 * @swagger
 * /request:
 *   post:
 *     summary: Create a request and its details (flow)
 *     tags: [Request]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - request
 *               - requestDetails
 *             properties:
 *               request:
 *                 type: object
 *                 required:
 *                   - requestedBy
 *                   - requestType
 *                 properties:
 *                   requestedBy:
 *                     type: string
 *                     description: MongoDB ObjectId of the user
 *                   requestType:
 *                     type: string
 *                     enum: [donation, distribution]
 *                   notes:
 *                     type: string
 *               requestDetails:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - inventoryId
 *                     - quantity
 *                   properties:
 *                     inventoryId:
 *                       type: string
 *                     quantity:
 *                       type: number
 *     responses:
 *       201:
 *         description: Request flow created
 *       400:
 *         description: Validation error
 */

/**
 * @swagger
 * /request/{id}:
 *   get:
 *     summary: Get a request by ID
 *     tags: [Request]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Request found
 *       404:
 *         description: Request not found
 */

/**
 * @swagger
 * /request/{id}:
 *   put:
 *     summary: Update a request (usually its status)
 *     tags: [Request]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [pending, approved, rejected, processed]
 *     responses:
 *       200:
 *         description: Request updated
 *       400:
 *         description: Validation or update error
 */
