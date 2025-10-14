const News = require("../models/news.model");

const getTrendingNewsByCategory = async (req, res) => {
  const news = await News.find({
    isTrending: true,
    category: `${req.params.category}`,
  }).select("shortDescription picUrl videoUrl slug");
  res.json(news);
};

const getLiveNews = async (req, res) => {
  const news = await News.find({ isLiveUpdate: true })
    .sort({ createdAt: -1 })
    .limit(10)
    .select("title user shortDescription picUrl slug category");
  res.json(news);
};

const getLatestNews = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  const news = await News.find()
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .select(
      "title user shortDescription picUrl videoUrl datePosted slug category"
    );
  res.json(news);
};

const getNewsByCategory = async (req, res) => {
  const news = await News.find({ category: req.params.category }).select(
    "title imgUrl videoUrl datePosted user shortDescription picUrl slug"
  );
  res.json(news);
};

const getNewsBySlug = async (req, res) => {
  const news = await News.findOne({ slug: req.params.slug });
  res.json(news);
};

const searchNews = async (req, res) => {
  const { q } = req.query;
  const news = await News.find({
    $or: [
      { title: new RegExp(q, "i") },
      { shortDescription: new RegExp(q, "i") },
      { category: new RegExp(q, "i") },
      { content: new RegExp(q, "i") },
    ],
  }).select("title shortDescription slug");
  res.json(news);
};

module.exports = {
  getTrendingNewsByCategory,
  getLatestNews,
  getLiveNews,
  getNewsBySlug,
  getNewsByCategory,
  searchNews,
};
