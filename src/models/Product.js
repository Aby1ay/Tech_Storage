// src/models/Product.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProductSchema = new Schema({
  name: String,
  price: Number,
  description: String,
  category: String,
  image: String,
  rating: Number,
  reviews: [
    {
      userId: String,
      comment: String,
      rating: Number,
      date: String
    }
  ],
  details: String
});

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;
