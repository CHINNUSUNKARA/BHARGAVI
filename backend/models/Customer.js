const mongoose = require('mongoose');
const customerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  customId: { type: String, unique: true },  // Avoid using 'id' as a field name
});

const Customer = mongoose.model('Customer', customerSchema);
module.exports = Customer;