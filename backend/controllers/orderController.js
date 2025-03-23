const Order = require('../models/Order');

exports.createOrder = async (req, res) => {
  try {
    // Input Validation: You can use a library like Joi or express-validator for more complex validation
    const { customerId, itemName, itemBrand, itemQuantity, itemPrice, dateOfOrder } = req.body;
    
    // Basic checks (more advanced validation can be done with validation libraries)
    if (!customerId || !itemName || !itemBrand || !itemQuantity || !itemPrice || !dateOfOrder) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const newOrder = new Order({
      customerId,
      itemName,
      itemBrand,
      itemQuantity,
      itemPrice,
      dateOfOrder,
    });

    // Save the new order to the database
    await newOrder.save();

    // Optionally populate customer information (if needed)
    const populatedOrder = await newOrder.populate('customerId').execPopulate();

    // Send back the order with the populated customer data (optional)
    res.status(201).json(populatedOrder);
  } catch (error) {
    console.error('Error saving new order:', error.message);
    res.status(500).json({ error: 'Failed to save new order', details: error.message });
  }
};


exports.getAllOrders = async (req, res) => {
  try {
    // Pagination logic (optional)
    const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
    const limit = parseInt(req.query.limit) || 10; // Default to 10 items per page if not provided
    const skip = (page - 1) * limit;

    const orders = await Order.find()
      .skip(skip)
      .limit(limit)
      .populate('customerId'); // Populate customerId to get customer details as well
    
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
};
