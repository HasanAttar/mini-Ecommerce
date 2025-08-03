// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();
connectDB(); // connect to MongoDB (will work when it's installed)
var indexRouter = require('./routes/index');

app.use(cors());
app.use(express.json());

// Routes
app.use('/', indexRouter);

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/categories', require('./routes/categoryRoutes'));
app.use('/api/stats', require('./routes/statsRoutes'));



module.exports = app;
