const express = require('express');
const router = express.Router();

// Sample Sheets Data
let sheets = {
    jsw: [
        { width: "4x8", price: 300 },
        { width: "4x10", price: 350 },
    ],
    zindal: [
        { width: "4x8", price: 280 },
        { width: "4x10", price: 330 },
    ],
};

// Get all JSW sheets
router.get('/jsw', (req, res) => {
    res.json(sheets.jsw);
});

// Add a new JSW sheet
router.post('/jsw', (req, res) => {
    const { width, price } = req.body;
    if (!width || !price) {
        return res.status(400).json({ message: 'Width and price are required' });
    }
    sheets.jsw.push({ width, price });
    res.status(201).json({ width, price });
});

// Update a JSW sheet by width
router.put('/jsw/:width', (req, res) => {
    const sheet = sheets.jsw.find(s => s.width === req.params.width);
    if (!sheet) {
        return res.status(404).json({ message: 'Sheet not found' });
    }
    sheet.price = req.body.price;
    res.json(sheet);
});

// Delete a JSW sheet by width
router.delete('/jsw/:width', (req, res) => {
    const index = sheets.jsw.findIndex(s => s.width === req.params.width);
    if (index === -1) {
        return res.status(404).json({ message: 'Sheet not found' });
    }
    sheets.jsw.splice(index, 1);
    res.json({ message: 'Sheet deleted successfully' });
});

// Similarly, add routes for Zindal sheets.
module.exports = router;
