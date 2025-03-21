const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  id: { 
    type: Number, 
    required: false, // 'id' is optional, MongoDB will generate a unique '_id' if not provided
    unique: true, // Ensure that the 'id' is unique
  },
  name: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true 
  },
  phone: { 
    type: String, // Change phone to String to accommodate international formats, +, etc.
    required: true 
  },
  address: { 
    type: String, 
    required: true 
  },
});

// You might want to add an index on 'id' to make lookups faster.
customerSchema.index({ id: 1 }); // Index on 'id' field

const Customer = mongoose.model('Customer', customerSchema);
module.exports = Customer;