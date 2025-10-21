/**
 * @fileoverview Routes related to podcast functionality.
 * @module routes/podcastRoutes
 */

const express = require("express");
const router = express.Router();
const { getLatestPodcast } = require("../controllers/podcastController");

/**
 * @swagger
 * tags:
 *   name: Podcasts
 *   description: Endpoints for fetching and managing podcast content.
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Podcast:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: Unique identifier for the podcast.
 *         title:
 *           type: string
 *           description: Title of the podcast episode.
 *         shortDescription:
 *           type: string
 *           description: Short summary or overview of the podcast episode.
 *         datePosted:
 *           type: string
 *           format: date-time
 *           description: Date and time when the podcast was posted.
 *         user:
 *           type: string
 *           description: ID or username of the user who uploaded the podcast.
 *         picUrl:
 *           type: string
 *           format: uri
 *           description: URL of the podcast cover image.
 *         length:
 *           type: string
 *           description: Duration or length of the podcast (e.g., "35:20").
 *         videoUrl:
 *           type: string
 *           format: uri
 *           description: Link to the video version of the podcast, if available.
 *         category:
 *           type: string
 *           description: Category or genre of the podcast.
 *           enum:
 *             - world
 *             - politics
 *             - business
 *             - technology
 *             - health
 *             - sports
 *             - culture
 *             - podcast
 *           default: "Others"
 *         slug:
 *           type: string
 *           description: URL-friendly slug for the podcast.
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp when the podcast record was created.
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp when the podcast record was last updated.
 *       required:
 *         - id
 *         - title
 *       example:
 *         id: "pdc_23041"
 *         title: "The Future of Artificial Intelligence"
 *         shortDescription: "Exploring how AI is shaping the world of technology and ethics."
 *         datePosted: "2025-10-20T10:30:00Z"
 *         user: "user_123"
 *         picUrl: "https://example.com/images/podcast-cover.jpg"
 *         length: "42:15"
 *         videoUrl: "https://example.com/videos/ai-future.mp4"
 *         category: "technology"
 *         slug: "the-future-of-artificial-intelligence"
 *         createdAt: "2025-10-20T10:30:00Z"
 *         updatedAt: "2025-10-21T09:00:00Z"
 */

/**
 * @swagger
 * /api/podcasts/latest:
 *   get:
 *     summary: Get the latest podcasts
 *     description: Fetches a list of the most recently uploaded podcast episodes.
 *     tags: [Podcasts]
 *     responses:
 *       200:
 *         description: A list of the latest podcast episodes.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Podcast'
 *       404:
 *         description: No podcasts found.
 *       500:
 *         description: Internal server error.
 */

router.get("/latest", getLatestPodcast);

module.exports = router;
