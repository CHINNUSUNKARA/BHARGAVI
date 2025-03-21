const mongoose = require('mongoose');

const stockSummarySchema = new mongoose.Schema({
  category: { type: String, required: true },
  items: { type: Map, of: String, required: true },
});

const StockSummary = mongoose.model('StockSummary', stockSummarySchema);
module.exports = StockSummary;
