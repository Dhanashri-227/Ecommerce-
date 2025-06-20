const mongoose = require('mongoose');
require('dotenv').config();

const mongoUrl = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/Ecommerce';

mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('connected', () => {
  console.log('Connected to MongoDB');
});

db.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

db.on('disconnected', () => {
  console.warn(' MongoDB disconnected');
});

module.exports = db;
