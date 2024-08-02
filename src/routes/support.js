// src/routes/support.js
const express = require('express');
const router = express.Router();
const SupportMessage = require('../models/SupportMessage');

// Обработчик POST-запроса для поддержки
router.post('/', async (req, res) => {
  console.log('Received support request:', req.body); // Отладка
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newMessage = new SupportMessage({
      name,
      email,
      subject,
      message
    });

    await newMessage.save();
    res.status(201).json({ message: "Ваше сообщение отправлено. Мы свяжемся с вами в ближайшее время." });
  } catch (error) {
    console.error('Error saving support message:', error.message); // Отладка
    res.status(500).json({ message: "Не удалось отправить сообщение. Пожалуйста, повторите попытку позже." });
  }
});

module.exports = router;
