require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const productsRoutes = require('./src/routes/productRoute');
const usersRoutes = require('./src/routes/userRoute');

const app = express();
const port = process.env.PORT || 9000;

app.use(cors());
app.use(express.json());
app.use('/api', productsRoutes);
app.use('/api', usersRoutes);

app.get('/', (req, res) => {
    res.send("Welcome to Full API Rest Playhard E-commerce");
});