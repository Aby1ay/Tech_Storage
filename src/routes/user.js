// src/routes/user.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Order = require('../models/Order');
const Cart = require('../models/Cart');
const authMiddleware = require('../middleware/auth');

router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId).select('-password');
    const orders = await Order.find({ user: userId });
    const cart = await Cart.find({ user: userId });

    res.json({ user, orders, cart });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;