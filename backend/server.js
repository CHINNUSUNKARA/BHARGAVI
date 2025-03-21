const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables from a .env file

// Models
const Customer = require('./models/Customer');
const StockSummary = require('./models/StockSummary');
const Order = require('./models/Order');
const StockCategory = require('./models/StockCategory');

const app = express();
const port = process.env.PORT || 5000; // Use environment variable for port

app.use(cors());
app.use(express.json()); // For parsing application/json

// MongoDB URI from .env file
const mongoURI = process.env.MONGO_URI || 'your-mongo-db-uri';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('MongoDB connection error:', err));

// API Routes

// Customers
app.get('/api/dashboard/customers', async (req, res) => {
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
});

app.get('/api/dashboard/customers/name/:name', async (req, res) => {
  try {
    // Use RegExp to allow partial and case-insensitive match
    const regex = new RegExp(req.params.name, 'i');
    const customer = await Customer.findOne({ name: { $regex: regex } });

    if (customer) {
      res.json(customer);
    } else {
      res.status(404).json({ error: 'Customer not found' });
    }
  } catch (err) {
    console.error('Error finding customer by name:', err);
    res.status(500).json({ error: 'Server error' });
  }
});


app.post('/api/dashboard/customers', async (req, res) => {
  const newCustomer = new Customer(req.body);
  await newCustomer.save();
  res.status(201).json(newCustomer);
});

app.put('/api/dashboard/customers/:id', async (req, res) => {
  const updatedCustomer = await Customer.findOneAndUpdate(
    { id: req.params.id },
    req.body,
    { new: true }
  );
  if (updatedCustomer) {
    res.json(updatedCustomer);
  } else {
    res.status(404).json({ error: 'Customer not found' });
  }
});


app.delete('/api/dashboard/customers/:id', async (req, res) => {
  try {
    // Find and delete the customer by custom 'id'
    const deletedCustomer = await Customer.findOneAndDelete({ id: req.params.id });

    // Check if a customer was deleted
    if (deletedCustomer) {
      return res.json({ message: 'Customer deleted successfully' });
    } else {
      return res.status(404).json({ error: 'Customer not found' });
    }
  } catch (error) {
    console.error('Error deleting customer:', error);
    return res.status(500).json({ error: 'Failed to delete customer' });
  }
});

// Stock Summary
app.get('/api/dashboard/stock', async (req, res) => {
  const stockSummary = await StockSummary.find();
  res.json(stockSummary);
});

app.get('/api/dashboard/stock/:category', async (req, res) => {
  const stock = await StockSummary.findOne({ category: req.params.category });
  if (stock) {
    res.json(stock.items);
  } else {
    res.status(404).json({ error: `Category ${req.params.category} not found` });
  }
});

app.put('/api/dashboard/stock/:category', async (req, res) => {
  const updatedStock = await StockSummary.findOneAndUpdate(
    { category: req.params.category },
    { $set: { items: req.body } },
    { new: true }
  );
  if (updatedStock) {
    res.json(updatedStock);
  } else {
    res.status(404).json({ error: `Category ${req.params.category} not found` });
  }
});

// Orders
app.get('/api/dashboard/orders', async (req, res) => {
  const orders = await Order.find();
  res.json(orders);
});

app.post('/api/dashboard/orders', async (req, res) => {
  const newOrder = new Order(req.body);
  await newOrder.save();
  res.status(201).json(newOrder);
});

app.put('/api/dashboard/orders/:id', async (req, res) => {
  const updatedOrder = await Order.findOneAndUpdate(
    { id: req.params.id },
    req.body,
    { new: true }
  );
  if (updatedOrder) {
    res.json(updatedOrder);
  } else {
    res.status(404).json({ error: 'Order not found' });
  }
});

app.delete('/api/dashboard/orders/:id', async (req, res) => {
  const deletedOrder = await Order.findOneAndDelete({ id: req.params.id });
  if (deletedOrder) {
    res.status(200).json({ message: `Order with ID ${req.params.id} deleted successfully` });
  } else {
    res.status(404).json({ error: 'Order not found' });
  }
});

// Stock Categories
app.get('/api/dashboard/stocks', async (req, res) => {
  const categories = await StockCategory.find();
  res.json(categories);
});

app.post('/api/dashboard/stocks', async (req, res) => {
  const newCategory = new StockCategory(req.body);
  await newCategory.save();
  res.status(201).json(newCategory);
});

app.put('/api/dashboard/stocks/:id', async (req, res) => {
  const updatedCategory = await StockCategory.findOneAndUpdate(
    { id: req.params.id },
    req.body,
    { new: true }
  );
  if (updatedCategory) {
    res.json(updatedCategory);
  } else {
    res.status(404).json({ error: 'Category not found' });
  }
});

app.delete('/api/dashboard/stocks/:id', async (req, res) => {
  const deletedCategory = await StockCategory.findOneAndDelete({ id: req.params.id });
  if (deletedCategory) {
    res.status(200).json({ message: `Category with ID ${req.params.id} deleted successfully` });
  } else {
    res.status(404).json({ error: 'Category not found' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
  