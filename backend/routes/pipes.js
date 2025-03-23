const express = require('express');
const router = express.Router();
const { Item, Pipe } = require('../models/Item');

// Get all pipes (all types of pipes)
// Get all pipes (all types of pipes)
router.get('/', async (req, res) => {
    try {
        const items = await Item.find(); // Get all items
        const pipes = items.map(item => item.pipes).flat(); // Flatten the pipes array across all items
        res.json(pipes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get pipes by type
router.get('/:type', async (req, res) => {
    try {
        const pipes = await Pipe.find({ type: req.params.type });
        if (pipes.length === 0) {
            return res.status(404).json({ message: 'No pipes found for this type' });
        }
        res.json(pipes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Add a new pipe (for any type)
router.post('/', async (req, res) => {
    const { type, size, price } = req.body;

    if (!type || !size || !price) {
        return res.status(400).json({ message: 'Type, size, and price are required' });
    }

    const pipe = new Pipe({
        type,
        size,
        price,
    });

    try {
        const newPipe = await pipe.save();
        res.status(201).json(newPipe);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update a pipe by type and size
router.put('/:type/:size', async (req, res) => {
    try {
        const pipe = await Pipe.findOne({ type: req.params.type, size: req.params.size });

        if (!pipe) {
            return res.status(404).json({ message: 'Pipe not found' });
        }

        pipe.price = req.body.price || pipe.price;

        const updatedPipe = await pipe.save();
        res.json(updatedPipe);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a pipe by type and size
router.delete('/:type/:size', async (req, res) => {
    try {
        const pipe = await Pipe.findOneAndDelete({
            type: req.params.type,
            size: req.params.size,
        });

        if (!pipe) {
            return res.status(404).json({ message: 'Pipe not found' });
        }

        res.json({ message: 'Pipe deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
