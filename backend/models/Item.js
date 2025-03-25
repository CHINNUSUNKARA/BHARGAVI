// models/Item.js
const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
});

const BrandSchema = new mongoose.Schema({
  name: { type: String, required: true },
  categories: { type: [CategorySchema], default: [] },
});

const ItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  brands: { type: [BrandSchema], default: [] },
});

module.exports = mongoose.model('Item', ItemSchema);
