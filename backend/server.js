// File: server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

// Models & DB
import './db.js'; // Ensure this connects to MongoDB
import User from './models/user.js';
import Product from './models/product.js'; // ✅ FIX: You were importing Product from user.js by mistake

dotenv.config();

const app = express();
const PORT = 4000;
const Private_key = process.env.Private_key;

// Middleware
app.use(cors({
  origin: 'http://localhost:3000', // React frontend ka origin
  credentials: true               // allow cookies
}));
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());

const logRequest = (req, res, next) => {
  console.log(`${new Date().toLocaleString()} Request made to: ${req.originalUrl}`);
  next();
};

app.use(logRequest);

// -------------------- Signup --------------------
app.post('/signup', async (req, res) => {
  try {
    const { shopname, ownername, password, email } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    const user = await User.create({
      shopname,
      ownername,
      password: hashed,
      email,
    });

    const token = jwt.sign({ shopname, ownername, email }, Private_key);
    res.cookie("token", token);
    res.status(201).json(user);
  } catch (err) {
    console.log("Signup Error:", err);
    res.status(400).json({ error: err.message });
  }
});

// -------------------- Login --------------------
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: "Invalid email or password" });

   
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// -------------------- Create Product --------------------
app.post('/products', async (req, res) => {
  try {
    const { company, type, details, price, stock } = req.body;
    const product = await Product.create({
      company,
      type,
      details,
      price: Number(price),
      stock: Number(stock),
    });
    res.status(201).send(product);
  } catch (err) {
    console.log("Product Create Error:", err);
    res.status(400).json({ error: err.message });
  }
});

// -------------------- Get All Products --------------------
app.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    console.log("Fetch Error:", err);
    res.status(500).json({ error: err.message });
  }
});

// -------------------- Update Product by Type --------------------
app.put('/products/:id', async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json({ error: 'Update failed' });
  }
});

// -------------------- Delete Product by Type --------------------
app.delete('/products/:id', async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
