const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/orders'); // Импортируйте orders маршруты

const app = express();

mongoose.connect('mongodb://localhost:27017/techstore', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(cors());
app.use(bodyParser.json());

app.use('/auth', authRoutes);
app.use('/products', productRoutes);
app.use('/orders', orderRoutes); // Подключите orders маршруты

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
