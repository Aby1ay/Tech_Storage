const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User'); // Подключите вашу модель User

// Регистрация пользователя
router.post('/register', async (req, res) => {
    const { login, password } = req.body;

    try {
        const existingUser = await User.findOne({ login });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ login, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Registration failed', error });
    }
});

// Логин пользователя
router.post('/login', async (req, res) => {
    const { login, password } = req.body;

    try {
        const user = await User.findOne({ login });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Здесь можно создать JWT токен и отправить его пользователю
        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        res.status(500).json({ message: 'Login failed', error });
    }
});

module.exports = router;
