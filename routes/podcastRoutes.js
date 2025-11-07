/**
 * @fileoverview Podcast routes with complete Swagger documentation.
 * @module routes/podcastRoutes
 */

const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const {
  getLatestPodcast,
  createPodcast,
  getPodcastById,
  updatePodcast,
  deletePodcast,
} = require("../controllers/podcastController");

/**
 * @swagger
 * tags:
 *   name: Podcasts
 *   description: Endpoints related to podcast management and discovery
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: MongoDB ObjectId of the user
 *         email:
 *           type: string
 *           description: Email of the podcast author
 *         name:
 *           type: string
 *           description: Display name of the user
 *       example:
 *         _id: "64af21b1234567890abcdef1"
 *         email: "creator@example.com"
 *         name: "Jane Creator"
 *
 *     Podcast:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         title:
 *           type: string
 *           description: Title of the podcast
 *         shortDescription:
 *           type: string
 *           description: Brief summary of the podcast
 *         datePosted:
 *           type: string
 *           format: date-time
 *           description: Date when the podcast was posted
 *         user:
 *           $ref: '#/components/schemas/User'
 *         picUrl:
 *           type: string
 *           format: uri
 *           description: Thumbnail or cover image URL
 *         videoUrl:
 *           type: string
 *           format: uri
 *           description: Video or audio file URL
 *         category:
 *           type: string
 *           description: Category of the podcast (e.g., technology, sports)
 *         slug:
 *           type: string
 *           description: URL-friendly slug for the podcast
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *       required:
 *         - title
 *         - user
 *         - category
 *       example:
 *         _id: "675c54f5bfe9a0323dfb5b91"
 *         title: "The Future of AI"
 *         shortDescription: "Exploring how AI is shaping our world."
 *         datePosted: "2025-11-07T12:00:00Z"
 *         user:
 *           _id: "64af21b1234567890abcdef1"
 *           email: "creator@example.com"
 *           name: "Jane Creator"
 *         picUrl: "https://example.com/podcast-image.jpg"
 *         videoUrl: "https://example.com/podcast-episode.mp3"
 *         category: "Technology"
 *         slug: "the-future-of-ai"
 *         createdAt: "2025-11-07T12:00:00Z"
 *         updatedAt: "2025-11-07T12:30:00Z"
 */

/**
 * @swagger
 * /api/podcasts/latest:
 *   get:
 *     summary: Get the latest podcasts with pagination
 *     tags: [Podcasts]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of podcasts per page
 *     responses:
 *       200:
 *         description: Paginated list of the latest podcasts
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 limit:
 *                   type: integer
 *                   example: 10
 *                 total:
 *                   type: integer
 *                   example: 34
 *                 podcasts:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Podcast'
 *       500:
 *         description: Server error while fetching podcasts
 */
router.get("/latest", getLatestPodcast);

/**
 * @swagger
 * /api/podcasts:
 *   post:
 *     summary: Create a new podcast
 *     tags: [Podcasts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Podcast'
 *     responses:
 *       201:
 *         description: Podcast created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Podcast'
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.post("/", auth, createPodcast);

/**
 * @swagger
 * /api/podcasts/{id}:
 *   get:
 *     summary: Get a podcast by its ID
 *     tags: [Podcasts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Podcast ID
 *     responses:
 *       200:
 *         description: Podcast retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Podcast'
 *       404:
 *         description: Podcast not found
 *       500:
 *         description: Server error
 *
 *   put:
 *     summary: Update an existing podcast
 *     tags: [Podcasts]
 *     security:
 *       - bearerAuth: []
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
 *               title:
 *                 type: string
 *               shortDescription:
 *                 type: string
 *               picUrl:
 *                 type: string
 *               videoUrl:
 *                 type: string
 *               category:
 *                 type: string
 *               slug:
 *                 type: string
 *     responses:
 *       200:
 *         description: Podcast updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Podcast'
 *       403:
 *         description: Not authorized
 *       404:
 *         description: Podcast not found
 *       500:
 *         description: Server error
 *
 *   delete:
 *     summary: Delete a podcast by ID
 *     tags: [Podcasts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Podcast deleted successfully
 *       403:
 *         description: Not authorized
 *       404:
 *         description: Podcast not found
 *       500:
 *         description: Server error
 */
router.get("/:id", getPodcastById);
router.put("/:id", auth, updatePodcast);
router.delete("/:id", auth, deletePodcast);

module.exports = router;
