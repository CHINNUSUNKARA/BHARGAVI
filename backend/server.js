const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const fsPromises = require('fs').promises;
require('dotenv').config(); // Load environment variables

const app = express();
const port = process.env.PORT || 5000; // Use environment variable for port

app.use(cors());
app.use(express.json()); // For parsing application/json

// File paths for data persistence
const stockFilePath = path.join(__dirname, 'data', 'stockSummary.json');
const ordersFilePath = path.join(__dirname, 'data', 'orders.json');
const stockCategoriesFilePath = path.join(__dirname, 'data', 'stockCategories.json');

// Function to create directory if it doesn't exist
const createDirectoryIfNotExists = async (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    await fsPromises.mkdir(dirPath, { recursive: true });
  }
};

// Function to save data to a file
const saveDataToFile = async (filePath, data) => {
  const dirPath = path.dirname(filePath);
  await createDirectoryIfNotExists(dirPath);
  await fsPromises.writeFile(filePath, JSON.stringify(data, null, 2));
};

// Function to load data from a file (returns default data if file doesn't exist)
const loadDataFromFile = async (filePath, defaultData) => {
  const dirPath = path.dirname(filePath);
  await createDirectoryIfNotExists(dirPath);
  
  if (fs.existsSync(filePath)) {
    try {
      const data = await fsPromises.readFile(filePath);
      return JSON.parse(data);
    } catch (error) {
      console.error(`Error parsing JSON from ${filePath}:`, error);
      await saveDataToFile(filePath, defaultData);
      return defaultData;
    }
  } else {
    await saveDataToFile(filePath, defaultData);
    return defaultData;
  }
};

// Default data to be used if the file doesn't exist
const defaultStockSummary = [
  { "Iron": { "24mm": "0", "16mm": "0", "12mm": "0", "10mm": "0", "8mm": "0" } },
  { "Cement": { "Nagarjuna": "0", "Ramco": "0", "Ambuja": "0", "Sagar": "0", "UltraTech": "0" } },
  { "Pipes": { "GpPipes": "0", "KalaiPipes": "0", "RoundPipes": "0", "StraightPipes": "0" } },
  { "Sheets": { "24g": "0", "22g": "0", "20g": "0", "18g": "0", "16g": "0" } }
];
const defaultOrders = [];
const defaultStockCategories = [
  { "id": 1, "name": "Iron" },
  { "id": 2, "name": "Cement" },
  { "id": 3, "name": "Pipes" },
  { "id": 4, "name": "Sheets" }
];

// Load initial data from files (if they exist or create with default data)
let stockSummary, recentOrders, stockCategories;

(async () => {
  stockSummary = await loadDataFromFile(stockFilePath, defaultStockSummary);
  recentOrders = await loadDataFromFile(ordersFilePath, defaultOrders);
  stockCategories = await loadDataFromFile(stockCategoriesFilePath, defaultStockCategories);
})();

app.get('/api/dashboard/stock', (req, res) => {
  res.json(stockSummary);
});

// API Endpoints


// Get stock by category (Iron, Cement, etc.)
app.get('/api/dashboard/stock/:category', async (req, res) => {
  const category = req.params.category;
  const stockItem = stockSummary.find(item => item.hasOwnProperty(category));

  if (stockItem) {
    res.json(stockItem[category]);
  } else {
    res.status(404).json({ error: `Category ${category} not found` });
  }
});

// PUT route to update stock data by category
app.put('/api/dashboard/stock/:category', async (req, res) => {
  const category = req.params.category;
  const newQuantities = req.body;  // Expecting the new quantities for that category

  const stockItem = stockSummary.find(item => item.hasOwnProperty(category));

  if (stockItem) {
    stockItem[category] = { ...stockItem[category], ...newQuantities };
    await saveDataToFile(stockFilePath, stockSummary); // Save updated stock data to file
    res.json({ message: `Stock for ${category} updated successfully`, stockItem });
  } else {
    res.status(404).json({ error: `Category ${category} not found` });
  }
});

// Get recent orders
app.get('/api/dashboard/orders', async (req, res) => {
  res.json(recentOrders);
});

// Create a new order (POST request)
app.post('/api/dashboard/orders', async (req, res) => {
  const newOrder = req.body;
  newOrder.id = recentOrders.length + 1;
  recentOrders.push(newOrder);
  await saveDataToFile(ordersFilePath, recentOrders); // Save the updated orders data to file
  res.status(201).json(newOrder);
});

// Update an existing order (PUT request)
app.put('/api/dashboard/orders/:id', async (req, res) => {
  const orderId = parseInt(req.params.id);
  const updatedOrder = req.body;

  const orderIndex = recentOrders.findIndex(order => order.id === orderId);
  if (orderIndex !== -1) {
    recentOrders[orderIndex] = { ...recentOrders[orderIndex], ...updatedOrder };
    await saveDataToFile(ordersFilePath, recentOrders); // Save the updated orders data to file
    res.json(recentOrders[orderIndex]);
  } else {
    res.status(404).json({ error: 'Order not found' });
  }
});

// Delete an order (DELETE request)
app.delete('/api/dashboard/orders/:id', async (req, res) => {
  const orderId = parseInt(req.params.id);

  const orderIndex = recentOrders.findIndex(order => order.id === orderId);
  if (orderIndex !== -1) {
    recentOrders.splice(orderIndex, 1);
    await saveDataToFile(ordersFilePath, recentOrders); // Save the updated orders data to file
    res.status(200).json({ message: `Order with ID ${orderId} deleted successfully` });
  } else {
    res.status(404).json({ error: 'Order not found' });
  }
});

// Get stock categories
app.get('/api/dashboard/stocks', async (req, res) => {
  res.json(stockCategories);
});

// Get a specific stock category by ID
app.get('/api/dashboard/stocks/:id', async (req, res) => {
  const categoryId = parseInt(req.params.id);
  const category = stockCategories.find(c => c.id === categoryId);
  if (category) {
    res.json(category);
  } else {
    res.status(404).json({ error: 'Category not found' });
  }
});

// Create a new stock category
app.post('/api/dashboard/stocks', async (req, res) => {
  const newCategory = req.body;
  newCategory.id = stockCategories.length > 0 
  ? Math.max(...stockCategories.map(c => c.id)) + 1 
  : 1;
  stockCategories.push(newCategory);
  await saveDataToFile(stockCategoriesFilePath, stockCategories); // Save the new category to file
  res.status(201).json(newCategory);
});

// Update an existing stock category by ID
app.put('/api/dashboard/stocks/:id', async (req, res) => {
  const categoryId = parseInt(req.params.id);
  const updatedCategory = req.body;

  const categoryIndex = stockCategories.findIndex(c => c.id === categoryId);
  if (categoryIndex !== -1) {
    stockCategories[categoryIndex] = { ...stockCategories[categoryIndex], ...updatedCategory };
    await saveDataToFile(stockCategoriesFilePath, stockCategories); // Save the updated category to file
    res.json(stockCategories[categoryIndex]);
  } else {
    res.status(404).json({ error: 'Category not found' });
  }
});

// Delete a stock category by ID
app.delete('/api/dashboard/stocks/:id', async (req, res) => {
  const categoryId = parseInt(req.params.id);

  const categoryIndex = stockCategories.findIndex(c => c.id === categoryId);
  if (categoryIndex !== -1) {
    stockCategories.splice(categoryIndex, 1);
    await saveDataToFile(stockCategoriesFilePath, stockCategories); // Save the updated categories to file
    res.status(200).json({ message: `Category with ID ${categoryId} deleted successfully` });
  } else {
    res.status(404).json({ error: 'Category not found' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
