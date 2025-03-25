const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables from a .env file
const app = express();
const port = process.env.PORT || 5000; // Use environment variable for port

app.use(cors());
app.use(express.json()); // For parsing application/json

// Import routes
const customerRoutes = require('./routes/customerRoutes');
const orderRoutes = require('./routes/orderRoutes');
const itemRoutes = require('./routes/itemRoutes');
const stockCategoryRoutes = require('./routes/stockCategoryRoutes');
const stockSummaryRoutes = require('./routes/stockSummaryRoutes');
const ironRoutes = require('./routes/iron');
const cementRoutes = require('./routes/cement');
const pipesRoutes = require('./routes/pipes');
const sheetsRoutes = require('./routes/sheets');
const supplierRoutes = require('./routes/SupplierRoutes'); // Import the supplier routes


// Set up the routes
app.use('/api/dashboard/items/iron', ironRoutes);
app.use('/api/dashboard/items/cement', cementRoutes);
app.use('/api/dashboard/items/pipes', pipesRoutes);
app.use('/api/dashboard/items/sheets', sheetsRoutes);
app.use('/api/dashboard/customers', customerRoutes);
app.use('/api/dashboard/orders', orderRoutes);
app.use('/api/dashboard/items', itemRoutes);
app.use('/api/dashboard/stocks', stockCategoryRoutes);
app.use('/api/dashboard/stock', stockSummaryRoutes);
app.use('/api/dashboard/suppliers', supplierRoutes); // Prefix with '/api/dashboard/suppliers'


// MongoDB URI from .env file
const mongoURI = process.env.MONGO_URI;
if (!mongoURI) {
  console.error('MongoDB URI not found in environment variables');
  process.exit(1); // Exit process if no MongoDB URI is found
}

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit process if MongoDB connection fails
  });

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
