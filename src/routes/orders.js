const express = require('express');
const router = express.Router();
const Order = require('../models/Order'); // Подключите вашу модель Order

// Создание заказа
router.post('/create', async (req, res) => {
    const { user, items, total } = req.body;

    try {
        const newOrder = new Order({ user, items, total });
        await newOrder.save();
        res.status(201).json({ message: 'Order created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Order creation failed', error });
    }
});

module.exports = router;
