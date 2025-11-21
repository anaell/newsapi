const mongoose = require("mongoose");
const Category = require("./categories.model");

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
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
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
    content: {
      type: String,
      required: true,
    },
    isTrending: {
      type: Boolean,
      // default: false,
    },
    isLiveUpdate: {
      type: Boolean,
      // default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("NewsSchema", newsSchema);
