// backend/routes/items.js

const express = require("express");
const router = express.Router();
const Item = require("../models/Item");

// POST /api/items → Create a new item in the archive
router.post("/", async (req, res) => {
  try {
    // Create a new item based on request body
    const newItem = new Item(req.body);

    // Save it to MongoDB
    const saved = await newItem.save();

    // Send the saved item back as response
    res.status(201).json(saved);
  } catch (err) {
    // If there's an error (e.g. missing name), send error message
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
