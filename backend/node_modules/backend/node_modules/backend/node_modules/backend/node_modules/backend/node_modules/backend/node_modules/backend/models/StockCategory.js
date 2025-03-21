const mongoose = require('mongoose');

const stockCategorySchema = new mongoose.Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
});

const StockCategory = mongoose.model('StockCategory', stockCategorySchema);
module.exports = StockCategory;
