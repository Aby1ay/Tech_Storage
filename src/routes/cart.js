// /src/routes/cart.js
const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const auth = require('../middleware/auth');

// Получить корзину текущего пользователя
router.get('/', auth, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user._id }).populate('items.productId');
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Добавить товар в корзину
router.post('/add', auth, async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const cart = await Cart.findOne({ userId: req.user._id });

    if (cart) {
      const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
      if (itemIndex > -1) {
        // Обновить количество товара
        cart.items[itemIndex].quantity += quantity;
      } else {
        // Добавить новый товар
        cart.items.push({ productId, quantity });
      }
      await cart.save();
    } else {
      // Создать новую корзину
      const newCart = new Cart({
        userId: req.user._id,
        items: [{ productId, quantity }]
      });
      await newCart.save();
    }

    res.status(201).json({ message: 'Товар добавлен в корзину' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Удалить товар из корзины
router.delete('/remove/:productId', auth, async (req, res) => {
  try {
    const { productId } = req.params;
    const cart = await Cart.findOne({ userId: req.user._id });

    if (cart) {
      cart.items = cart.items.filter(item => item.productId.toString() !== productId);
      await cart.save();
      res.json({ message: 'Товар удален из корзины' });
    } else {
      res.status(404).json({ message: 'Корзина не найдена' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
