const mongoose = require('mongoose');
const customerSchema = new mongoose.Schema({
  id: { type: String, required: false },
  name: { type: String, required: true },
  surname: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
});

const Customer = mongoose.model('Customer', customerSchema);
module.exports = Customer;