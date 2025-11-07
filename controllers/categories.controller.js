// controllers/categoryController.js
const Category = require("../models/categories.model");

exports.getCategories = async (req, res) => {
  const categories = await Category.find({});
  res.json(categories);
};

exports.addCategory = async (req, res) => {
  try {
    const category = new Category({ name: req.body.name });
    await category.save();
    res.status(201).json(category);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    await Category.deleteOne({ name: req.params.name });
    res.status(204).send();
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
