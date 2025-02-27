const express = require('express');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());

// Mock data
const stockSummary = { iron: 500, cement: 1000 };
const recentOrders = [
  { id: 1, item: 'Iron', total: 200 },
  { id: 2, item: 'Cement', total: 500 },
];
const revenue = 12000;
const lowStockItems = [
  { id: 1, name: 'Iron', quantity: 50 },
  { id: 2, name: 'Cement', quantity: 200 },
];

// API Endpoints
app.get('/api/dashboard/stock', (req, res) => {
  res.json(stockSummary);
});

app.get('/api/dashboard/orders', (req, res) => {
  res.json(recentOrders);
});

app.get('/api/dashboard/revenue', (req, res) => {
  res.json(revenue);
});

app.get('/api/dashboard/low-stock', (req, res) => {
  res.json(lowStockItems);
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
