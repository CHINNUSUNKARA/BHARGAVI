// routes/supplierRoutes.js
const express = require('express');
const Supplier = require('../models/Suppiler'); // Import the Supplier model
const router = express.Router();

// Create a new supplier (POST)
router.post('/', async (req, res) => {
  const { name, contact, address, outstandingPayments, pendingDeliveries } = req.body;

  try {
    const newSupplier = new Supplier({
      name,
      contact,
      address,
      outstandingPayments,
      pendingDeliveries,
    });

    await newSupplier.save();
    res.status(201).json(newSupplier); // Send the new supplier as a response
  } catch (error) {
    res.status(400).json({ message: 'Error creating supplier', error });
  }
});

// Get all suppliers (GET)
router.get('/', async (req, res) => {
  try {
    const suppliers = await Supplier.find();
    res.status(200).json(suppliers); // Send the list of suppliers as a response
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving suppliers', error });
  }
});

// Get a specific supplier by ID (GET)
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const supplier = await Supplier.findById(id);
    if (!supplier) {
      return res.status(404).json({ message: 'Supplier not found' });
    }
    res.status(200).json(supplier); // Send the supplier details as a response
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving supplier', error });
  }
});

// Update a supplier (PUT)
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, contact, address, outstandingPayments, pendingDeliveries } = req.body;

  try {
    const updatedSupplier = await Supplier.findByIdAndUpdate(
      id,
      {
        name,
        contact,
        address,
        outstandingPayments,
        pendingDeliveries,
      },
      { new: true }
    );

    if (!updatedSupplier) {
      return res.status(404).json({ message: 'Supplier not found' });
    }

    res.status(200).json(updatedSupplier); // Send the updated supplier as a response
  } catch (error) {
    res.status(400).json({ message: 'Error updating supplier', error });
  }
});

// Delete a supplier (DELETE)
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedSupplier = await Supplier.findByIdAndDelete(id);

    if (!deletedSupplier) {
      return res.status(404).json({ message: 'Supplier not found' });
    }

    res.status(200).json({ message: 'Supplier deleted successfully' }); // Confirmation message
  } catch (error) {
    res.status(500).json({ message: 'Error deleting supplier', error });
  }
});

module.exports = router;
