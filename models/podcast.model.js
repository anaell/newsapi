const mongoose = require("mongoose");

const podcastSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    shortDescription: {
      type: String,
    },
    datePosted: {
      type: Date,
    },
    user: {
      type: String,
      ref: "User",
    },
    picUrl: {
      type: String,
      required: false,
    },
    length: {
      type: String,
    },
    videoUrl: {
      type: String,
      required: false,
    },
    category: {
      type: String,
      enum: [
        "world",
        "politics",
        "business",
        "technology",
        "health",
        "sports",
        "culture",
        "podcast",
      ],
      default: "Others",
    },
    slug: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("PodcastSchema", podcastSchema);
