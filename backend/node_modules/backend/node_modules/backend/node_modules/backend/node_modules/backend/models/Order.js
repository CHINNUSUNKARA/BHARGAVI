const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  customerId: { type: Number, required: true },
  products: [{ type: String, required: true }],
  totalAmount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
