// controllers/stockCategoryController.js

const StockCategory = require('../models/StockCategory');

// Create a new stock category
exports.createStockCategory = async (req, res) => {
  try {
    const newCategory = new StockCategory(req.body);
    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (error) {
    console.error('Error saving new stock category:', error.message);
    res.status(500).json({ error: 'Failed to save new stock category', details: error.message });
  }
};

// Get all stock categories
exports.getAllStockCategories = async (req, res) => {
  try {
    const categories = await StockCategory.find();
    res.json(categories);
  } catch (error) {
    console.error('Error fetching stock categories:', error);
    res.status(500).json({ error: 'Failed to fetch stock categories' });
  }
};

// Get a specific stock category by ID
exports.getStockCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await StockCategory.findById(id);
    if (!category) {
      return res.status(404).json({ error: 'Stock category not found' });
    }
    res.json(category);
  } catch (error) {
    console.error('Error fetching stock category:', error);
    res.status(500).json({ error: 'Failed to fetch stock category' });
  }
};

// Update a stock category by ID
exports.updateStockCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedCategory = await StockCategory.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedCategory) {
      return res.status(404).json({ error: 'Stock category not found' });
    }
    res.json(updatedCategory);
  } catch (error) {
    console.error('Error updating stock category:', error);
    res.status(500).json({ error: 'Failed to update stock category' });
  }
};

// Delete a stock category by ID
exports.deleteStockCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCategory = await StockCategory.findByIdAndDelete(id);
    if (!deletedCategory) {
      return res.status(404).json({ error: 'Stock category not found' });
    }
    res.json({ message: 'Stock category deleted successfully' });
  } catch (error) {
    console.error('Error deleting stock category:', error);
    res.status(500).json({ error: 'Failed to delete stock category' });
  }
};

