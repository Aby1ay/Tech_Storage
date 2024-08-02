const express = require('express');
const router = express.Router();
const Product = require('../models/Product'); // Замените на вашу модель

// Поиск товаров по запросу
router.get('/', async (req, res) => {
  const { query } = req.query;
  try {
    const results = await Product.find({
      name: { $regex: query, $options: 'i' } // Поиск по имени с учетом регистра
    });
    res.json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
