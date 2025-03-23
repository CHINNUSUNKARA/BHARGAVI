const mongoose = require('mongoose');

// Define the schema for the Order model
const orderSchema = new mongoose.Schema({
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
  itemName: { type: String, required: true },
  itemBrand: { type: String, required: true },
  itemQuantity: { type: Number, required: true },
  itemPrice: { type: Number, required: true },
  dateOfOrder: { type: Date, required: true },
});

// Create the Order model
const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
