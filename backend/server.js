const express = require('express');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json()); // For parsing application/json


// const Pipes={GpPipes:"",KalaiPipes:"",RoundPipes:"",StraightPipes:""};
// const Cement={Nagarjuna:"",Ramco:"",Ambuja:"",Sagar:"",UltraTech:""};
// const Iron={ "24mm":"","16mm":"","12mm":"","10mm":"","8mm":""};
// const Sheets={ "24g":"","22g":"","20g":"","18g":"","16g":""};

// let stockSummary = [
//   {id:"1",name:Iron},
//   {id:"2",name:Cement},
//   {id:"3",name:Pipes},
//   {id:"4",name:Sheets}
// ];

// Assuming the Express app is already set up

// Mock data (use in-memory or you can save it to a database)
let stockSummary = [
  { id: "1", Iron: { "24mm": "0", "16mm": "0", "12mm": "0", "10mm": "0", "8mm": "0" } },
  { id: "2", Cement: { "Nagarjuna": "0", "Ramco": "0", "Ambuja": "0", "Sagar": "0", "UltraTech": "0" } },
  { id: "3", Pipes: { "GpPipes": "0", "KalaiPipes": "0", "RoundPipes": "0", "StraightPipes": "0" } },
  { id: "4", Sheets: { "24g": "0", "22g": "0", "20g": "0", "18g": "0", "16g": "0" } }
];

// POST route to add stock data
app.post('/api/dashboard/stock', (req, res) => {
  const newStockData = req.body; // The data coming from Postman
  stockSummary = [...stockSummary, ...newStockData]; // Add the new stock data to the existing summary
  res.status(201).json({ message: "Stock data added successfully", data: newStockData });
});
app.put('/api/dashboard/stock/:item', (req, res) => {
  const itemName = req.params.item;
  const newQuantities = req.body;  // Expecting the new quantities for that category

  const stockItem = stockSummary.find(item => item.hasOwnProperty(itemName));
  if (stockItem) {
    stockItem[itemName] = {
      ...stockItem[itemName],
      ...newQuantities,
    };
    res.json({ message: `Stock for ${itemName} updated successfully`, stockItem });
  } else {
    res.status(404).json({ error: `Item ${itemName} not found` });
  }
});



let recentOrders = [
  { id: 1, item: 'Iron', total: 200 },
  { id: 2, item: 'Cement', total: 500 },
];
let revenue = 12000;
let lowStockItems = [
  { id: 1, name: 'Iron', quantity: 50 },
  { id: 2, name: 'Cement', quantity: 200 },
];

// Mock data for stock categories
let stockCategories = [
  {
    id: 1,
    category: 'Iron Rods',
    subCategories: [
      { id: 1, name: '20mm', quantity: 100 },
      { id: 2, name: '16mm', quantity: 150 },
    ],
  },
  {
    id: 2,
    category: 'Cement Bags',
    subCategories: [
      { id: 1, name: 'Nagarjuna', quantity: 500 },
      { id: 2, name: 'Ramco', quantity: 300 },
    ],
  },
];


// API Endpoints
// Get stock summary
app.get('/api/dashboard/stock', (req, res) => {
  res.json(stockSummary);
});

// Get recent orders
app.get('/api/dashboard/orders', (req, res) => {
  res.json(recentOrders);
});

// Get revenue
app.get('/api/dashboard/revenue', (req, res) => {
  res.json(revenue);
});

// Get low stock items
app.get('/api/dashboard/low-stock', (req, res) => {
  res.json(lowStockItems);
});

// Create a new order (POST request)
app.post('/api/dashboard/orders', (req, res) => {
  const newOrder = req.body;
  newOrder.id = recentOrders.length + 1;
  recentOrders.push(newOrder);
  revenue += newOrder.total;
  res.status(201).json(newOrder);
});

// Update an existing order (PUT request)
app.put('/api/dashboard/orders/:id', (req, res) => {
  const orderId = parseInt(req.params.id);
  const updatedOrder = req.body;

  const orderIndex = recentOrders.findIndex(order => order.id === orderId);
  if (orderIndex !== -1) {
    recentOrders[orderIndex] = { ...recentOrders[orderIndex], ...updatedOrder };
    res.json(recentOrders[orderIndex]);
  } else {
    res.status(404).send('Order not found');
  }
});

// Delete an order (DELETE request)
app.delete('/api/dashboard/orders/:id', (req, res) => {
  const orderId = parseInt(req.params.id);

  const orderIndex = recentOrders.findIndex(order => order.id === orderId);
  if (orderIndex !== -1) {
    revenue -= recentOrders[orderIndex].total;
    recentOrders.splice(orderIndex, 1);
    res.status(200).send(`Order with ID ${orderId} deleted successfully`);
  } else {
    res.status(404).send('Order not found');
  }
});

// Update stock (PUT request)
app.put('/api/dashboard/stock/:item', (req, res) => {
  const itemName = req.params.item;
  const newQuantity = req.body.quantity;

  if (stockSummary[itemName] !== undefined) {
    stockSummary[itemName] = newQuantity;
    res.json({ item: itemName, quantity: newQuantity });
  } else {
    res.status(404).send('Item not found');
  }
});

// CRUD Operations for Stock Categories
// 1. Get all stock categories
app.get('/api/dashboard/stocks', (req, res) => {
  res.json(stockCategories);
});

// 2. Get a specific stock category by ID
app.get('/api/dashboard/stocks/:id', (req, res) => {
  const categoryId = parseInt(req.params.id);
  const category = stockCategories.find(c => c.id === categoryId);
  if (category) {
    res.json(category);
  } else {
    res.status(404).send('Category not found');
  }
});

// 3. Create a new stock category
app.post('/api/dashboard/stocks', (req, res) => {
  const newCategory = req.body;
  newCategory.id = stockCategories.length + 1; // Automatically generate an ID
  stockCategories.push(newCategory);
  res.status(201).json(newCategory);
});

// 4. Update an existing stock category by ID
app.put('/api/dashboard/stocks/:id', (req, res) => {
  const categoryId = parseInt(req.params.id);
  const updatedCategory = req.body;

  const categoryIndex = stockCategories.findIndex(c => c.id === categoryId);
  if (categoryIndex !== -1) {
    stockCategories[categoryIndex] = { ...stockCategories[categoryIndex], ...updatedCategory };
    res.json(stockCategories[categoryIndex]);
  } else {
    res.status(404).send('Category not found');
  }
});

// 5. Delete a stock category by ID
app.delete('/api/dashboard/stocks/:id', (req, res) => {
  const categoryId = parseInt(req.params.id);

  const categoryIndex = stockCategories.findIndex(c => c.id === categoryId);
  if (categoryIndex !== -1) {
    stockCategories.splice(categoryIndex, 1);
    res.status(200).send(`Category with ID ${categoryId} deleted successfully`);
  } else {
    res.status(404).send('Category not found');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
