const Podcast = require("../models/podcast.model");

const getLatestPodcast = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  const podcast = await Podcast.find()
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .select(
      "title user shortDescription picUrl videoUrl datePosted slug category"
    );
  res.json(podcast);
};

module.exports = { getLatestPodcast };
