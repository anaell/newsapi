// routes/authRoutes.js
const express = require("express");
const router = express.Router();
const userController = require("../controllers/users.controller");
const auth = require("../middleware/auth");

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           example: user@example.com
 *         role:
 *           type: string
 *           enum: [user, admin]
 *           example: user
 *
 *     SignupRequest:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           example: user@example.com
 *         password:
 *           type: string
 *           example: StrongPassword123
 *         adminCode:
 *           type: string
 *           description: Optional admin secret key for admin registration
 *           example: myAdminSecretKey
 *
 *     LoginRequest:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           example: user@example.com
 *         password:
 *           type: string
 *           example: StrongPassword123
 *
 *     AuthResponse:
 *       type: object
 *       properties:
 *         token:
 *           type: string
 *           description: JWT token for authentication
 *           example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *         user:
 *           $ref: '#/components/schemas/User'
 *         message:
 *           type: string
 *           example: User created successfully
 *
 *   responses:
 *     BadRequest:
 *       description: Missing or invalid fields
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               error:
 *                 type: string
 *                 example: Email or Password field is missing
 *     Conflict:
 *       description: Email already in use
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               error:
 *                 type: string
 *                 example: Email already in use
 *     Unauthorized:
 *       description: Invalid credentials
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               error:
 *                 type: string
 *                 example: Invalid credentials
 *     ServerError:
 *       description: Internal server error
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               error:
 *                 type: string
 *                 example: Signup failed
 */

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: API for user signup and login
 */

/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     summary: Register a new user
 *     description: Creates a new user. If the correct admin code is provided, assigns the admin role.
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SignupRequest'
 *           example:
 *             email: user@example.com
 *             password: StrongPassword123
 *             adminCode: myAdminSecretKey
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *             example:
 *               token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *               user:
 *                 email: user@example.com
 *                 role: user
 *               message: User created successfully
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       409:
 *         $ref: '#/components/responses/Conflict'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login a user
 *     description: Authenticates the user and returns a JWT token.
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *           example:
 *             email: user@example.com
 *             password: StrongPassword123
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *             example:
 *               token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *               user:
 *                 email: user@example.com
 *                 role: user
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: User not found
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */

/**
 * @route PUT /api/auth/users/:id
 * @summary Update a user's profile
 * @description
 * Updates an existing user.
 * Only the user themselves **or an admin** can perform this action.
 * A normal user **cannot update their role** — if `role` is passed, it will be removed.
 *
 * @param {string} req.params.id - The ID of the user to update
 * @param {Object} req.body - Fields to update (email, name, role*)
 * @param {string} [req.body.email] - Updated email
 * @param {string} [req.body.name] - Updated name
 * @param {string} [req.body.role] - Updated role (only admin can change)
 *
 * @requires Authentication (Bearer Token)
 *
 * @returns {200 OK} User updated successfully
 * @returns {400 Bad Request} Invalid input data
 * @returns {401 Unauthorized} If user is not the owner AND not admin
 * @returns {500 Internal Server Error} Server error
 */

/**
 * @route DELETE /api/auth/users/:id
 * @summary Delete a user and all related content
 * @description
 * Deletes a user by ID and cascades deletion to:
 * - News authored by the user
 * - Podcasts created by the user
 *
 * Only the user themselves **or an admin** can delete a user.
 *
 * @param {string} req.params.id - The ID of the user to delete
 *
 * @requires Authentication (Bearer Token)
 *
 * @returns {200 OK} User deleted successfully
 * @returns {401 Unauthorized} If user is not the owner AND not admin
 * @returns {404 Not Found} If user does not exist
 * @returns {500 Internal Server Error} Server error
 */

router.post("/signup", userController.signup);
router.post("/login", userController.login);
router.put("/users/:id", auth, userController.updateUser);
router.delete("/users/:id", auth, userController.deleteUser);

module.exports = router;
