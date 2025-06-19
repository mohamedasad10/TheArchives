// backend/models/Item.js

const mongoose = require("mongoose");

// Define the structure/schema for each item in the archive
const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },  // Item name is mandatory
  year: Number,                            // Optional: year of purchase or use
  price: Number,                           // Optional: how much it cost
  tag: String,                             // Optional: category e.g., 'medicine'
  note: String,                            // Optional: additional info like brand/dosage
  createdAt: { type: Date, default: Date.now }  // Auto-sets when item is created
});

// Export the model to use it in routes
const Item = mongoose.model("Item", itemSchema);
module.exports = Item;
