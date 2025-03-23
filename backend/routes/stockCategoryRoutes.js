// routes/stockCategoryRoutes.js

const express = require('express');
const router = express.Router();
const stockCategoryController = require('../controllers/stockCategoryController');

// Create a new stock category
router.post('/', stockCategoryController.createStockCategory);

// Get all stock categories
router.get('/', stockCategoryController.getAllStockCategories);

// Get a specific stock category by ID
router.get('/:id', stockCategoryController.getStockCategoryById);

// Update a stock category by ID
router.put('/:id', stockCategoryController.updateStockCategory);

// Delete a stock category by ID
router.delete('/:id', stockCategoryController.deleteStockCategory);

module.exports = router;
