/**
 * @fileoverview News routes with complete Swagger documentation.
 * @module routes/newsRoutes
 */

const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const {
  getTrendingNewsByCategory,
  getLatestNews,
  getLiveNews,
  getNewsByCategory,
  getNewsBySlug,
  searchNews,
  createNews,
  updateNews,
  deleteNews,
} = require("../controllers/newsController");

/**
 * @swagger
 * tags:
 *   name: News
 *   description: News management and retrieval endpoints
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
 *           description: User ID
 *         email:
 *           type: string
 *           description: Email of the user
 *         name:
 *           type: string
 *           description: Full name of the user
 *       example:
 *         _id: "64af21b1234567890abcdef1"
 *         email: "reporter@example.com"
 *         name: "Jane Reporter"
 *
 *     NewsItem:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         title:
 *           type: string
 *         shortDescription:
 *           type: string
 *         datePosted:
 *           type: string
 *           format: date-time
 *         user:
 *           $ref: '#/components/schemas/User'
 *         picUrl:
 *           type: string
 *           format: uri
 *         videoUrl:
 *           type: string
 *           format: uri
 *         timetoread:
 *           type: string
 *         category:
 *           type: string
 *         slug:
 *           type: string
 *         content:
 *           type: string
 *         isTrending:
 *           type: boolean
 *         isLiveUpdate:
 *           type: boolean
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *       required:
 *         - title
 *         - content
 *         - category
 *       example:
 *         _id: "675c54f5bfe9a0323dfb5b91"
 *         title: "Tech Giants Announce New AI Partnership"
 *         shortDescription: "Leading tech firms collaborate to accelerate AI research."
 *         datePosted: "2025-10-21T12:00:00Z"
 *         user:
 *           _id: "64af21b1234567890abcdef1"
 *           email: "reporter@example.com"
 *           name: "Jane Reporter"
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
 *         description: News category to filter (e.g., sports, politics)
 *     responses:
 *       200:
 *         description: List of trending news in the specified category
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/NewsItem'
 *       500:
 *         description: Server error while fetching trending news
 */
router.get("/trending/:category", getTrendingNewsByCategory);

/**
 * @swagger
 * /api/news/live:
 *   get:
 *     summary: Get latest live news updates
 *     tags: [News]
 *     responses:
 *       200:
 *         description: Array of live update news items
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/NewsItem'
 *       500:
 *         description: Server error while fetching live news
 */
router.get("/live", getLiveNews);

/**
 * @swagger
 * /api/news/latest:
 *   get:
 *     summary: Get the latest news with pagination
 *     tags: [News]
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
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: Paginated list of latest news
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 page:
 *                   type: integer
 *                 limit:
 *                   type: integer
 *                 total:
 *                   type: integer
 *                 podcasts:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/NewsItem'
 *       500:
 *         description: Server error while fetching latest news
 */
router.get("/latest", getLatestNews);

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
 *     responses:
 *       200:
 *         description: Array of news in the given category
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/NewsItem'
 *       500:
 *         description: Server error while fetching category news
 */
router.get("/category/:category", getNewsByCategory);

/**
 * @swagger
 * /api/news/newsdetail/{slug}:
 *   get:
 *     summary: Get a specific news item by slug
 *     tags: [News]
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *         description: Slug of the news item
 *     responses:
 *       200:
 *         description: Detailed news item data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NewsItem'
 *       404:
 *         description: News not found
 *       500:
 *         description: Server error while fetching news
 */
router.get("/newsdetail/:slug", getNewsBySlug);

/**
 * @swagger
 * /api/news/search:
 *   get:
 *     summary: Search for news items
 *     tags: [News]
 *     parameters:
 *       - in: query
 *         name: q
 *         required: true
 *         schema:
 *           type: string
 *         description: Keyword to search by title, description, or content
 *     responses:
 *       200:
 *         description: List of matching news items
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/NewsItem'
 *       500:
 *         description: Server error while searching news
 */
router.get("/search", searchNews);

/**
 * @swagger
 * /api/news:
 *   post:
 *     summary: Create a new news item
 *     tags: [News]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewsItem'
 *     responses:
 *       201:
 *         description: News created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NewsItem'
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.post("/", auth, createNews);

/**
 * @swagger
 * /api/news/{id}:
 *   put:
 *     summary: Update an existing news item
 *     tags: [News]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: News ID to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewsItem'
 *     responses:
 *       200:
 *         description: News updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NewsItem'
 *       403:
 *         description: Not authorized
 *       404:
 *         description: News not found
 *       500:
 *         description: Server error
 *
 *   delete:
 *     summary: Delete a news item by ID
 *     tags: [News]
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
 *         description: News deleted successfully
 *       403:
 *         description: Not authorized
 *       404:
 *         description: News not found
 *       500:
 *         description: Server error
 */
router.put("/:id", auth, updateNews);
router.delete("/:id", auth, deleteNews);

module.exports = router;
