const express = require('express');
const router = express.Router();

// Sample Cement Data
let cementItems = {
    Ambuja: { price: 380 },
    Nagarjuna: { price: 400 },
    Ramco: { price: 380 },
    Sagar: { price: 380 },
    Ultratech: { price: 380 },
};

// Get all cement brands
router.get('/', (req, res) => {
    res.json(cementItems);
});

// Get cement details by brand
router.get('/:brand', (req, res) => {
    const brand = cementItems[req.params.brand];
    if (brand) {
        res.json(brand);
    } else {
        res.status(404).json({ message: 'Cement brand not found' });
    }
});

// Add a new cement brand
router.post('/', (req, res) => {
    const { brand, price } = req.body;
    if (!brand || !price) {
        return res.status(400).json({ message: 'Brand and price are required' });
    }
    cementItems[brand] = { price };
    res.status(201).json({ brand, price });
});

// Update a cement brand
router.put('/:brand', (req, res) => {
    const cementBrand = cementItems[req.params.brand];
    if (!cementBrand) {
        return res.status(404).json({ message: 'Cement brand not found' });
    }
    const { price } = req.body;
    cementBrand.price = price;
    res.json(cementBrand);
});

// Delete a cement brand
router.delete('/:brand', (req, res) => {
    if (!cementItems[req.params.brand]) {
        return res.status(404).json({ message: 'Cement brand not found' });
    }
    delete cementItems[req.params.brand];
    res.json({ message: 'Cement brand deleted successfully' });
});

module.exports = router;
