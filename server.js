// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./src/routes/auth');
const productRoutes = require('./src/routes/products');
const orderRoutes = require('./src/routes/orders');
const supportRoutes = require('./src/routes/support');
const searchRoutes = require('./src/routes/search');
const cartRoutes = require('./src/routes/cart');

require('dotenv').config();

const app = express();

mongoose.connect('mongodb://localhost:27017/techstore', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Подключение к базе данных успешно');
}).catch((error) => {
  console.error('Ошибка подключения к базе данных:', error.message);
});

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/support', supportRoutes); 
app.use('/api/search', searchRoutes);
app.use('/api/cart', cartRoutes);


app.listen(5000, () => {
  console.log('Сервер запущен в порту 5000');
});

app.get('/', (req, res) => {
  res.send('Сервер запущен');
});

// Глобальный обработчик ошибок
app.use((err, req, res, next) => {
  console.error('Ошибка:', err.message); // Отладка
  res.status(500).json({ message: err.message });
});

