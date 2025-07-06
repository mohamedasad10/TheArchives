// backend/routes/items.js
// This file handles all API routes for item management in The Archives application
// Routes include: CREATE, READ, UPDATE, DELETE operations for items

const express = require("express");
const router = express.Router();
const Item = require("../models/Item"); // Import the Item model for database operations

// POST /api/items → Create a new item in the archive
// This route handles creating new items with full debugging and error handling
router.post("/", async (req, res) => {
  // Debug logging to track incoming requests
  console.log("POST /api/items called");
  console.log("Request body:", req.body);
  console.log("Image field specifically:", req.body.image);

  try {
    // Create the new item object manually to ensure all fields are properly mapped
    // This approach allows us to control exactly what data gets saved
    const itemData = {
      name: req.body.name,     // Item name/title
      note: req.body.note,     // Item description/notes
      tag: req.body.tag,       // Category tag for organization
      year: req.body.year,     // Year associated with the item
      price: req.body.price,   // Price/value of the item
      image: req.body.image    // Base64 encoded image or image URL
    };
    
    // Debug logging to verify data structure before saving
    console.log("Item data being saved:", itemData);
    
    // Create new Item instance using Mongoose model
    const newItem = new Item(itemData);
    console.log("New item before save:", newItem);
    
    // Save to MongoDB database
    const saved = await newItem.save();
    console.log("Item saved:", saved);
    console.log("Saved item image:", saved.image);
    
    // Return the saved item with 201 Created status
    res.status(201).json(saved);
  } catch (err) {
    // Error handling for validation errors, database errors, etc.
    console.error("Error saving item:", err);
    res.status(400).json({ error: err.message });
  }
});

// GET /api/items → Fetch all items from the archive
// This route retrieves all items sorted by creation date (newest first)
router.get("/", async (req, res) => {
  try {
    // Find all items and sort by createdAt field in descending order
    // This ensures newest items appear first in the frontend
    const items = await Item.find().sort({ createdAt: -1 });
    
    // Return all items with 200 OK status
    res.status(200).json(items);
  } catch (err) {
    // Error handling for database connection issues, etc.
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/items/:id → Update an existing item in the archive
// This route handles editing/updating existing items with full debugging
router.put("/:id", async (req, res) => {
  // Debug logging to track update requests
  console.log("PUT /api/items/:id called");
  console.log("Item ID:", req.params.id);
  console.log("Request body:", req.body);
  console.log("Image in request:", req.body.image);

  try {
    // Find the existing item first to see what's currently stored
    // This helps with debugging and ensures the item exists before updating
    const existingItem = await Item.findById(req.params.id);
    console.log("Existing item:", existingItem);

    // Update the item using findByIdAndUpdate method
    const updatedItem = await Item.findByIdAndUpdate(
      req.params.id,    // ID from URL parameters
      req.body,         // Updated data from frontend request body
      { new: true }     // Return the new/updated version of the item (not the old one)
    );

    // Check if item was found and updated
    if (!updatedItem) {
      return res.status(404).json({ error: "Item not found" });
    }

    // Debug logging to verify successful update
    console.log("Updated item:", updatedItem);
    console.log("Updated item image:", updatedItem.image);
    
    // Return the updated item with 200 OK status
    res.status(200).json(updatedItem);
  } catch (err) {
    // Error handling for validation errors, invalid IDs, etc.
    console.error("Error updating item:", err);
    res.status(400).json({ error: err.message });
  }
});

// DELETE /api/items/:id → Remove item from archive
// This route handles permanent deletion of items from the database
router.delete("/:id", async (req, res) => {
  try {
    // Find and delete the item by ID in one operation
    const deletedItem = await Item.findByIdAndDelete(req.params.id);

    // Check if item was found and deleted
    if (!deletedItem) {
      return res.status(404).json({ error: "Item not found" });
    }

    // Return success message with 200 OK status
    // Using emoji to make the response more user-friendly
    res.status(200).json({ message: "🗑️ Item deleted successfully" });
  } catch (err) {
    // Error handling for invalid IDs, database errors, etc.
    res.status(400).json({ error: err.message });
  }
});

// Export the router so it can be used in the main app.js file
// This allows the Express app to use these routes under the /api/items path
module.exports = router;