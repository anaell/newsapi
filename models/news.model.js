const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema(
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
    videoUrl: {
      type: String,
      required: false,
    },
    timetoread: {
      type: String,
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
    content: {
      type: String,
      required: true,
    },
    isTrending: {
      type: Boolean,
    },
    isLiveUpdate: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("NewsSchema", newsSchema);
