const express = require('express');
const router = express.Router();

// Sample Iron Data
let ironItems = [
    { size: "16mm", price: 500 },
    { size: "12mm", price: 450 },
    { size: "10mm", price: 400 },
    { size: "8mm", price: 400 },
    { size: "6mm", price: 400 },
];

// Get all iron items
router.get('/', (req, res) => {
    res.json(ironItems);
});

// Get specific iron item by size
router.get('/:size', (req, res) => {
    const ironItem = ironItems.find(item => item.size === req.params.size);
    if (ironItem) {
        res.json(ironItem);
    } else {
        res.status(404).json({ message: 'Iron item not found' });
    }
});

// Add a new iron item
router.post('/', (req, res) => {
    const { size, price } = req.body;
    if (!size || !price) {
        return res.status(400).json({ message: 'Size and price are required' });
    }
    const newIronItem = { size, price };
    ironItems.push(newIronItem);
    res.status(201).json(newIronItem);
});

// Update iron item by size
router.put('/:size', (req, res) => {
    const ironItem = ironItems.find(item => item.size === req.params.size);
    if (!ironItem) {
        return res.status(404).json({ message: 'Iron item not found' });
    }
    const { price } = req.body;
    ironItem.price = price;
    res.json(ironItem);
});

// Delete an iron item by size
router.delete('/:size', (req, res) => {
    const index = ironItems.findIndex(item => item.size === req.params.size);
    if (index === -1) {
        return res.status(404).json({ message: 'Iron item not found' });
    }
    ironItems.splice(index, 1);
    res.json({ message: 'Iron item deleted successfully' });
});

module.exports = router;
