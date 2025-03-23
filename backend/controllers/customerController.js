const Customer = require('../models/Customer');

exports.getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.find();
    if (customers.length === 0) {
      return res.status(404).json({ error: 'No customers found' });
    }
    res.json(customers);
  } catch (err) {
    console.error('Error fetching customers:', err);
    res.status(500).json({ error: 'Failed to fetch customers' });
  }
};

exports.createCustomer = async (req, res) => {
  try {
    const newCustomer = new Customer(req.body);
    await newCustomer.save();
    res.status(201).json(newCustomer);
  } catch (error) {
    console.error('Error saving new customer:', error.message);
    res.status(500).json({ error: 'Failed to save new customer', details: error.message });
  }
};

// Add other methods for update, delete, and find by name as needed
