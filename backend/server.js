// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // Load environment variables

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // allows JSON in req.body

// Route Handler for /api/items
const itemRoutes = require("./routes/items");
app.use("/api/items", itemRoutes); // Use item routes

// Test route
app.get('/', (req, res) => {
  res.send('🧠 ArchiveVault Backend is running!');
});

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('🟢 Connected to MongoDB'))
.catch((err) => console.error('❌ MongoDB error:', err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
