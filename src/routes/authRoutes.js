const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const auth = require('../middleware/auth');

// Регистрация пользователя
router.post('/register', async (req, res) => {
  const { login, password } = req.body;
  try {
    let user = await User.findOne({ login });
    if (user) {
      return res.status(400).json({ errors: [{ msg: 'Пользователь уже существует' }] });
    }
    user = new User({ login, password });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();
    const payload = { user: { id: user.id } };
    jwt.sign(payload, 'yourSecretKey', { expiresIn: 360000 }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Ошибка сервера');
  }
});

// Вход пользователя
router.post('/login', async (req, res) => {
  const { login, password } = req.body;
  try {
    let user = await User.findOne({ login });
    if (!user) {
      return res.status(400).json({ errors: [{ msg: 'Неверные учетные данные' }] });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ errors: [{ msg: 'Неверные учетные данные' }] });
    }
    const payload = { user: { id: user.id } };
    jwt.sign(payload, 'yourSecretKey', { expiresIn: 360000 }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Ошибка сервера');
  }
});

// Получение данных пользователя
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Ошибка сервера');
  }
});

module.exports = router;
