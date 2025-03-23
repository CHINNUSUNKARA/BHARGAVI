// routes/stockSummaryRoutes.js

const express = require('express');
const router = express.Router();
const stockSummaryController = require('../controllers/stockSummaryController');

// Create a new stock summary
router.post('/', stockSummaryController.createStockSummary);

// Get all stock summaries
router.get('/', stockSummaryController.getAllStockSummaries);

// Get a specific stock summary by ID
router.get('/:id', stockSummaryController.getStockSummaryById);

// Update a stock summary by ID
router.put('/:id', stockSummaryController.updateStockSummary);

// Delete a stock summary by ID
router.delete('/:id', stockSummaryController.deleteStockSummary);

module.exports = router;
