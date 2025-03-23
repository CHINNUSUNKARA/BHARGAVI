// controllers/stockSummaryController.js

const StockSummary = require('../models/StockSummary');

// Create a new stock summary
exports.createStockSummary = async (req, res) => {
  try {
    const newStockSummary = new StockSummary(req.body);
    await newStockSummary.save();
    res.status(201).json(newStockSummary);
  } catch (error) {
    console.error('Error saving new stock summary:', error.message);
    res.status(500).json({ error: 'Failed to save new stock summary', details: error.message });
  }
};

// Get all stock summaries
exports.getAllStockSummaries = async (req, res) => {
  try {
    const stockSummaries = await StockSummary.find();
    res.json(stockSummaries);
  } catch (error) {
    console.error('Error fetching stock summaries:', error);
    res.status(500).json({ error: 'Failed to fetch stock summaries' });
  }
};

// Get a specific stock summary by ID
exports.getStockSummaryById = async (req, res) => {
  try {
    const { id } = req.params;
    const stockSummary = await StockSummary.findById(id);
    if (!stockSummary) {
      return res.status(404).json({ error: 'Stock summary not found' });
    }
    res.json(stockSummary);
  } catch (error) {
    console.error('Error fetching stock summary:', error);
    res.status(500).json({ error: 'Failed to fetch stock summary' });
  }
};

// Update a stock summary by ID
exports.updateStockSummary = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedStockSummary = await StockSummary.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedStockSummary) {
      return res.status(404).json({ error: 'Stock summary not found' });
    }
    res.json(updatedStockSummary);
  } catch (error) {
    console.error('Error updating stock summary:', error);
    res.status(500).json({ error: 'Failed to update stock summary' });
  }
};

// Delete a stock summary by ID
exports.deleteStockSummary = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedStockSummary = await StockSummary.findByIdAndDelete(id);
    if (!deletedStockSummary) {
      return res.status(404).json({ error: 'Stock summary not found' });
    }
    res.json({ message: 'Stock summary deleted successfully' });
  } catch (error) {
    console.error('Error deleting stock summary:', error);
    res.status(500).json({ error: 'Failed to delete stock summary' });
  }
};
