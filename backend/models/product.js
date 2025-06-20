const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  company: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true, // e.g., TV, Fridge, etc.
  },
  details: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    default: 0,
  },
  stock: {
    type: Number,
    required: true,
    default: 0,
  }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
