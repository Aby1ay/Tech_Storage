const express = require('express');
const router = express.Router();
const Product = require('../models/Product'); // Подключите вашу модель Product

// Поиск товаров
router.get('/search', async (req, res) => {
    const { query } = req.query;

    try {
        const products = await Product.find({ name: new RegExp(query, 'i') });
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Search failed', error });
    }
});

module.exports = router;
