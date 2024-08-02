const express = require('express');
const Order = require('../models/Order');
const router = express.Router();

router.post('/', async (req, res) => {
  const { userId, items, total, status } = req.body;
  try {
    const order = new Order({
      userId,
      items,
      total,
      status
    });
    await order.save();
    res.status(201).json(order);
  } catch (error) {
    console.error('Ошибка при сохранении заказа:', error.message);
    res.status(500).json({ message: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    console.error('Ошибка при получении заказов:', error.message);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
