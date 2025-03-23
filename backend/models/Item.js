const mongoose = require('mongoose');

// Define sub-schemas for iron, cement, pipe, and sheet
const ironSchema = new mongoose.Schema({
    size: String, // Size of the Iron (e.g., 20mm, 16mm, etc.)
    price: Number, // Price for that specific size
});

const cementSchema = new mongoose.Schema({
    brand: String, // Brand of Cement (e.g., Nagarjuna, Ultratech, etc.)
    quantity: Number, // Quantity available
    price: Number, // Price per unit
});

const pipeSchema = new mongoose.Schema({
    type: { type: String, required: true }, // The type of pipe (e.g., 'gp-kalai-round', 'gp', etc.)
    size: { type: String, required: true }, // The size of the pipe (e.g., '¾ inch', '1 inch', etc.)
    price: { type: Number, required: true }, // The price of the pipe
});

const sheetSchema = new mongoose.Schema({
    brand: String, // Brand of sheet (e.g., JSW, Zindal)
    customWidth: String, // Custom width
    price: Number, // Price per sheet
});

// Define the main item schema that includes all the materials
const itemSchema = new mongoose.Schema({
    iron: [ironSchema],  // Iron with sizes and prices
    cement: [cementSchema],  // Cement with brand, quantity, and price
    pipes: [pipeSchema],  // Pipes with types and sizes with prices
    sheets: [sheetSchema],  // Sheets with brand, custom width, and price
});

// Create the Item model
const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
