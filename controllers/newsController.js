const News = require("../models/news.model");

const getAllCategory = async (req, res) => {
  try {
    const allCategory = News.schema.path("category").enumValues;
    res.status(200).json({ categories: allCategory });
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ message: "Server error while fetching categories" });
  }
};

const getTrendingNewsByCategory = async (req, res) => {
  try {
    const news = await News.find({
      isTrending: true,
      category: req.params.category,
    }).select("shortDescription picUrl videoUrl slug");
    res.status(200).json(news);
  } catch (error) {
    console.error("Error fetching trending news:", error);
    res
      .status(500)
      .json({ message: "Server error while fetching trending news" });
  }
};

const getLiveNews = async (req, res) => {
  try {
    const news = await News.find({ isLiveUpdate: true })
      .sort({ createdAt: -1 })
      .limit(10)
      .select("title user shortDescription picUrl slug category");
    res.status(200).json(news);
  } catch (error) {
    console.error("Error fetching live news:", error);
    res.status(500).json({ message: "Server error while fetching live news" });
  }
};

const getLatestNews = async (req, res) => {
  try {
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

    res.status(200).json(news);
  } catch (error) {
    console.error("Error fetching latest news:", error);
    res
      .status(500)
      .json({ message: "Server error while fetching latest news" });
  }
};

const getNewsByCategory = async (req, res) => {
  try {
    const news = await News.find({ category: req.params.category }).select(
      "title imgUrl videoUrl datePosted user shortDescription picUrl slug"
    );
    res.status(200).json(news);
  } catch (error) {
    console.error("Error fetching news by category:", error);
    res
      .status(500)
      .json({ message: "Server error while fetching news by category" });
  }
};

const getNewsBySlug = async (req, res) => {
  try {
    const news = await News.findOne({ slug: req.params.slug });
    if (!news) {
      return res.status(404).json({ message: "News not found" });
    }
    res.status(200).json(news);
  } catch (error) {
    console.error("Error fetching news by slug:", error);
    res
      .status(500)
      .json({ message: "Server error while fetching news by slug" });
  }
};

const searchNews = async (req, res) => {
  try {
    const { q } = req.query;
    const news = await News.find({
      $or: [
        { title: new RegExp(q, "i") },
        { shortDescription: new RegExp(q, "i") },
        { category: new RegExp(q, "i") },
        { content: new RegExp(q, "i") },
      ],
    }).select("title shortDescription slug");
    res.status(200).json(news);
  } catch (error) {
    console.error("Error searching news:", error);
    res.status(500).json({ message: "Server error while searching news" });
  }
};

module.exports = {
  getTrendingNewsByCategory,
  getLatestNews,
  getLiveNews,
  getNewsBySlug,
  getNewsByCategory,
  searchNews,
  getAllCategory,
};
