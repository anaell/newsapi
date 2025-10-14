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

router.get("/trending", getTrendingNewsByCategory);
router.get("/lastest", getLatestNews);
router.get("/category/:category", getNewsByCategory);
router.get("/:slug", getNewsBySlug);
router.get("/live", getLiveNews);
router.get("/search", searchNews);

module.exports = router;
