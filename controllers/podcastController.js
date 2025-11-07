// controllers/podcastController.js
const Podcast = require("../models/podcast.model");

const getLatestPodcast = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  const podcasts = await Podcast.find()
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .select(
      "title user shortDescription picUrl videoUrl datePosted slug category"
    )
    .populate("user", "email name");
  const total = await Podcast.countDocuments();
  res.json({
    page,
    limit,
    total,
    podcasts,
  });
};

const createPodcast = async (req, res) => {
  try {
    const podcast = new Podcast({ ...req.body, user: req.user.id });
    await podcast.save();
    res.status(201).json(podcast);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getPodcastById = async (req, res) => {
  const podcast = await Podcast.findById(req.params.id).populate(
    "user",
    "email name"
  );
  if (!podcast) return res.status(404).json({ message: "Podcast not found" });
  res.json(podcast);
};

const updatePodcast = async (req, res) => {
  const podcast = await Podcast.findById(req.params.id);
  if (!podcast) return res.status(404).json({ message: "Podcast not found" });

  if (podcast.user.toString() !== req.user.id && req.user.role !== "admin") {
    return res.status(403).json({ message: "Not authorized" });
  }

  Object.assign(podcast, req.body);
  await podcast.save();
  res.json(podcast);
};

const deletePodcast = async (req, res) => {
  const podcast = await Podcast.findById(req.params.id);
  if (!podcast) return res.status(404).json({ message: "Podcast not found" });

  if (podcast.user.toString() !== req.user.id && req.user.role !== "admin") {
    return res.status(403).json({ message: "Not authorized" });
  }

  await podcast.deleteOne();
  res.status(204).send();
};

module.exports = {
  getLatestPodcast,
  createPodcast,
  getPodcastById,
  updatePodcast,
  deletePodcast,
};
