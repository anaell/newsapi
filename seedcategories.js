require("dotenv").config();
const mongoose = require("mongoose");
const Categories = require("./models/categories.model");

const categories = [
  { name: "world news" },
  { name: "technology" },
  { name: "sports" },
  { name: "health" },
  { name: "business" },
  { name: "podcast" },
  { name: "politics" },
  { name: "culture" },
];

mongoose.connect(process.env.MONGODB_URI).then(async () => {
  await Categories.insertMany(categories);
  console.log("Database seeded successfully");
  mongoose.disconnect();
});
