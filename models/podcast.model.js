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
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
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
      required: true,
      validate: {
        validator: async function (value) {
          const exists = await Category.findOne({ name: value });
          return !!exists;
        },
        message: (props) => `${props.value} is not a valid category`,
      },
    },
    slug: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("PodcastSchema", podcastSchema);
