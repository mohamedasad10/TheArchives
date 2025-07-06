// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // Load environment variables

const app = express();

// Middleware
// Enable CORS - optionally restrict to your frontend URL for security
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*'  // e.g., 'https://your-frontend-domain.com' or '*' for open
}));

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

// Error handling middleware for uncaught errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
