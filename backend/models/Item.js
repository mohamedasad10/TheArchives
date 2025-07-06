// backend/models/Item.js

const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  note: {
    type: String,
    trim: true
  },
  tag: {
    type: String,
    trim: true
  },
  year: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    trim: true,
    default: ''
  }
}, {
  timestamps: true,
  strict: false // Temporarily set to false to see if this fixes it
});

// Add a pre-save hook to debug
ItemSchema.pre('save', function(next) {
  console.log('Pre-save hook - this.image:', this.image);
  console.log('Pre-save hook - full document:', this.toObject());
  next();
});

module.exports = mongoose.model("Item", ItemSchema);