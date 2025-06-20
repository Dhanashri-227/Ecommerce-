const express = require('express');
const router = express.Router();
const Product = require('../models/product');

// 📦 Get all products
router.get('/', async (req, res) => {
  try {
    const data = await Product.find();
    res.status(200).json(data);
  } catch (err) {
    console.error('Fetch products error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// 📦 Add product
router.post('/', async (req, res) => {
  try {
    const { company, type, details, price, stock } = req.body;
    const product = await Product.create({
      company,
      type,
      details,
      price: Number(price),
      stock: Number(stock),
    });
    res.status(201).json(product);
  } catch (err) {
    console.error('Add product error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// 🔄 Update product by `type`
router.put('/:type', async (req, res) => {
  try {
    const updatedProduct = await Product.findOneAndUpdate(
      { type: req.params.type },
      req.body,
      { new: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(200).json(updatedProduct);
  } catch (err) {
    console.error('Update product error:', err);
    res.status(500).json({ error: 'Update failed' });
  }
});

// ❌ Delete product by `type`
router.delete('/:type', async (req, res) => {
  try {
    const response = await Product.findOneAndDelete({ type: req.params.type });
    if (!response) {
      return res.status(404).json({ error: 'Product type not found' });
    }
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (err) {
    console.error('Delete product error:', err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
