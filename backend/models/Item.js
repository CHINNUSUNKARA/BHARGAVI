const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  price: { type: Number, default: null } // Optional price field
});

const brandSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true, trim: true },
  categories: [categorySchema] // Nested categories
});

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  brands: [brandSchema] // Nested brands
});

module.exports = mongoose.model("Item", itemSchema);
