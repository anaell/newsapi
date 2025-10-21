/**
 * @fileoverview Routes related to news functionality.
 * @module routes/newsRoutes
 */

const express = require("express");
const router = express.Router();

const {
  getTrendingNewsByCategory,
  getLatestNews,
  getLiveNews,
  getNewsByCategory,
  getNewsBySlug,
  searchNews,
} = require("../controllers/newsController");

/**
 * @swagger
 * tags:
 *   name: News
 *   description: Endpoints related to news functionality
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     NewsItem:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: Unique identifier for the news item.
 *         title:
 *           type: string
 *           description: Title of the news article.
 *         shortDescription:
 *           type: string
 *           description: Short summary or overview of the news article.
 *         datePosted:
 *           type: string
 *           format: date-time
 *           description: Date and time when the article was posted.
 *         user:
 *           type: string
 *           description: ID or username of the author who uploaded the article.
 *         picUrl:
 *           type: string
 *           format: uri
 *           description: URL of the main image associated with the news article.
 *         videoUrl:
 *           type: string
 *           format: uri
 *           description: URL of a related video (if available).
 *         timetoread:
 *           type: string
 *           description: Estimated time to read the article (e.g., "5 min").
 *         category:
 *           type: string
 *           description: Category or section of the news.
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
 *           description: URL-friendly slug of the article.
 *         content:
 *           type: string
 *           description: Full content or body of the news article.
 *         isTrending:
 *           type: boolean
 *           description: Indicates if the article is currently trending.
 *         isLiveUpdate:
 *           type: boolean
 *           description: Indicates if the article is part of live updates.
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp when the article was created.
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp when the article was last updated.
 *       required:
 *         - id
 *         - title
 *         - content
 *       example:
 *         id: "675c54f5bfe9a0323dfb5b91"
 *         title: "Tech Giants Announce New AI Partnership"
 *         shortDescription: "Leading tech firms collaborate to accelerate AI research and safety measures."
 *         datePosted: "2025-10-21T12:00:00Z"
 *         user: "user_123"
 *         picUrl: "https://example.com/images/ai-news.jpg"
 *         videoUrl: "https://example.com/videos/ai-news.mp4"
 *         timetoread: "5 min"
 *         category: "technology"
 *         slug: "tech-giants-announce-new-ai-partnership"
 *         content: "Leading technology companies have joined forces to develop safer AI models..."
 *         isTrending: true
 *         isLiveUpdate: false
 *         createdAt: "2025-10-21T12:00:00Z"
 *         updatedAt: "2025-10-21T14:00:00Z"
 */

/**
 * @swagger
 * /api/news/trending/{category}:
 *   get:
 *     summary: Get trending news by category
 *     tags: [News]
 *     parameters:
 *       - in: path
 *         name: category
 *         required: true
 *         schema:
 *           type: string
 *         description: News category
 *     responses:
 *       200:
 *         description: An array of trending news items
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/NewsItem'
 *       404:
 *         description: Category not found
 */

/**
 * @swagger
 * /api/news/latest:
 *   get:
 *     summary: Get the latest news
 *     tags: [News]
 *     responses:
 *       200:
 *         description: An array of latest news items
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/NewsItem'
 */

/**
 * @swagger
 * /api/news/category/{category}:
 *   get:
 *     summary: Get news by category
 *     tags: [News]
 *     parameters:
 *       - in: path
 *         name: category
 *         required: true
 *         schema:
 *           type: string
 *         description: News category
 *     responses:
 *       200:
 *         description: An array of news items for the specified category
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/NewsItem'
 *       404:
 *         description: Category not found
 */

/**
 * @swagger
 * /api/news/newsdetail/{slug}:
 *   get:
 *     summary: Get detailed news by slug
 *     tags: [News]
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *         description: Slug of the news article
 *     responses:
 *       200:
 *         description: A single news item
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NewsItem'
 *       404:
 *         description: News article not found
 */

/**
 * @swagger
 * /api/news/live:
 *   get:
 *     summary: Get live news updates
 *     tags: [News]
 *     responses:
 *       200:
 *         description: An array of live news updates
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/NewsItem'
 */

/**
 * @swagger
 * /api/news/search:
 *   get:
 *     summary: Search news by keyword
 *     tags: [News]
 *     parameters:
 *       - in: query
 *         name: q
 *         required: true
 *         schema:
 *           type: string
 *         description: Search query keyword
 *     responses:
 *       200:
 *         description: An array of matched news items
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/NewsItem'
 *       400:
 *         description: Missing or invalid query parameter
 */

/**
 * @route GET /api/news/trending/:category
 * @desc Get trending news by category
 * @param {string} category - News category
 * @returns {Object[]} 200 - An array of trending news items
 */
router.get("/trending/:category", getTrendingNewsByCategory);

/**
 * @route GET /api/news/latest
 * @desc Get latest news
 * @returns {Object[]} 200 - An array of latest news items
 */
router.get("/latest", getLatestNews);

/**
 * @route GET /api/news/category/:category
 * @desc Get news by category
 * @param {string} category - News category
 * @returns {Object[]} 200 - An array of news items
 */
router.get("/category/:category", getNewsByCategory);

/**
 * @route GET /api/news/newsdetail/:slug
 * @desc Get news by slug (detail page)
 * @param {string} slug - Slug of the news article
 * @returns {Object} 200 - A single news item
 */
router.get("/newsdetail/:slug", getNewsBySlug);

/**
 * @route GET /api/news/live
 * @desc Get live news
 * @returns {Object[]} 200 - An array of live news updates
 */
router.get("/live", getLiveNews);

/**
 * @route GET /api/news/search
 * @desc Search news by keyword
 * @query {string} q - Search query
 * @returns {Object[]} 200 - An array of matched news items
 */
router.get("/search", searchNews);

module.exports = router;
