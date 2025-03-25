const express = require('express');
const router = express.Router();
const { Iron } = require('../models/Item'); // Import Iron model

// Create a new Iron item (POST)
router.post('/', async (req, res) => {
  const iron = new Iron(req.body);
  try {
    await iron.save();
    res.send(iron);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Get all Iron items, optionally filter by brand (GET)
router.get('/', async (req, res) => {
  try {
    const { brand } = req.query; // Get brand from query parameters
    const filter = brand ? { brand } : {}; // If a brand is provided, filter by brand, else return all

    const irons = await Iron.find(filter); // Fetch filtered or all items
    res.json(irons);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Get a single Iron item by ID (GET)
router.get('/:id', async (req, res) => {
  try {
    const iron = await Iron.findById(req.params.id); // Find the Iron by ID
    if (!iron) {
      return res.status(404).send({ message: 'Iron not found' });
    }
    res.json(iron);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Update an Iron item by ID, optionally filter by brand (PUT)
router.put('/:id', async (req, res) => {
  try {
    const { brand } = req.query; // Get brand from query parameters
    const filter = brand ? { brand, _id: req.params.id } : { _id: req.params.id };

    const iron = await Iron.findOneAndUpdate(filter, req.body, { new: true });
    if (!iron) {
      return res.status(404).send({ message: 'Iron not found' });
    }
    res.json({ status: 'Iron updated', iron });
  } catch (err) {
    res.status(500).send(err);
  }
});

// Delete an Iron item by ID, optionally filter by brand (DELETE)
router.delete('/:id', async (req, res) => {
  try {
    const { brand } = req.query; // Get brand from query parameters
    const filter = brand ? { brand, _id: req.params.id } : { _id: req.params.id };

    const iron = await Iron.findOneAndDelete(filter);
    if (!iron) {
      return res.status(404).send({ message: 'Iron not found' });
    }
    res.json({ status: 'Iron deleted' });
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
