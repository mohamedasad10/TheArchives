// backend/routes/items.js

const express = require("express");
const router = express.Router();
const Item = require("../models/Item");

// POST /api/items → Create a new item in the archive
router.post("/", async (req, res) => {
  console.log("POST /api/items called");
  console.log("Request body:", req.body);

  try {
    const newItem = new Item(req.body);
    const saved = await newItem.save();
    console.log("Item saved:", saved);
    res.status(201).json(saved);
  } catch (err) {
    console.error("Error saving item:", err);
    res.status(400).json({ error: err.message });
  }
});

// GET /api/items → Fetch all items
router.get("/", async (req, res) => {
  try {
    const items = await Item.find().sort({ createdAt: -1 });
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/items/:id → Update an existing item
router.put("/:id", async (req, res) => {
  try {
    const updatedItem = await Item.findByIdAndUpdate(
      req.params.id,    // ID from URL
      req.body,         // Updated data from frontend
      { new: true }     // Return the new version of the item
    );

    if (!updatedItem) {
      return res.status(404).json({ error: "Item not found" });
    }

    res.status(200).json(updatedItem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
