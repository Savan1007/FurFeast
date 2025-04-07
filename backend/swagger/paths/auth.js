/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication endpoints
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email: { type: string, example: "user@example.com" }
 *               password: { type: string, example: "securePassword123" }
 *               username: { type: string, example: "user123" }
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /auth/create:
 *   post:
 *     summary: Admin creates a new user
 *     tags: [Auth]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email: { type: string, example: "newuser@example.com" }
 *               password: { type: string, example: "adminSetPassword" }
 *               username: { type: string, example: "newuser" }
 *     responses:
 *       201:
 *         description: User created
 *       400:
 *         description: Error during creation
 */

/**
 * @swagger
 * /auth/users:
 *   get:
 *     summary: Get users with filters and pagination
 *     tags: [Auth]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema: { type: integer, default: 1 }
 *       - in: query
 *         name: limit
 *         schema: { type: integer, default: 10 }
 *       - in: query
 *         name: email
 *         schema: { type: string }
 *       - in: query
 *         name: username
 *         schema: { type: string }
 *       - in: query
 *         name: isVerified
 *         schema: { type: boolean }
 *       - in: query
 *         name: isBanned
 *         schema: { type: boolean }
 *       - in: query
 *         name: sortBy
 *         schema: { type: string, default: "createdAt" }
 *       - in: query
 *         name: sortOrder
 *         schema: { type: string, enum: [asc, desc], default: "desc" }
 *     responses:
 *       200:
 *         description: List of users with total count
 */

/**
 * @swagger
 * /auth/username-exists:
 *   get:
 *     summary: Check if a username exists
 *     tags: [Auth]
 *     parameters:
 *       - in: query
 *         name: username
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Username existence result
 *       400:
 *         description: Username is required
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login
 *     tags: [Auth]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email: { type: string, example: "user@example.com" }
 *               password: { type: string, example: "yourPassword" }
 *     responses:
 *       200:
 *         description: Logged in
 *       401:
 *         description: Invalid credentials
 */

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Logout
 *     tags: [Auth]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Logged out
 *       500:
 *         description: Logout failed
 */

/**
 * @swagger
 * /auth/refresh:
 *   get:
 *     summary: Refresh access token
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Token refreshed
 *       401:
 *         description: Refresh token missing
 *       403:
 *         description: Invalid or expired refresh token
 */

/**
 * @swagger
 * /auth/verify-email:
 *   get:
 *     summary: Verify user email
 *     tags: [Auth]
 *     parameters:
 *       - in: query
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Email verified successfully
 *       400:
 *         description: Invalid or expired token
 */