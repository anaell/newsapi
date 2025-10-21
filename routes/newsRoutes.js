

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
 *           description: Unique identifier for the news item
 *         title:
 *           type: string
 *           description: Title of the news article
 *         slug:
 *           type: string
 *           description: URL-friendly slug of the news article
 *         category:
 *           type: string
 *           description: Category of the news (e.g., Politics, Sports, Technology)
 *         content:
 *           type: string
 *           description: Full content of the news article
 *         imageUrl:
 *           type: string
 *           format: uri
 *           description: Image associated with the news article
 *         publishedAt:
 *           type: string
 *           format: date-time
 *           description: Date and time when the article was published
 *         author:
 *           type: string
 *           description: Author of the news article
 *       example:
 *         id: "675c54f5bfe9a0323dfb5b91"
 *         title: "Tech Giants Announce New AI Partnership"
 *         slug: "tech-giants-announce-new-ai-partnership"
 *         category: "Technology"
 *         content: "Leading technology companies have joined forces to develop..."
 *         imageUrl: "https://example.com/images/ai-news.jpg"
 *         publishedAt: "2025-10-21T12:00:00Z"
 *         author: "John Doe"
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
 * @route GET /api/news/lastest
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
