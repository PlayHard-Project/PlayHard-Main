require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const productsRoutes = require('./routes/productRoute');
const usersRoutes = require('./routes/userRoute');
const brandsRoutes = require('./routes/brandRoute');
const ordersRoutes = require('./routes/orderRoute');
const offersRoutes = require('./routes/offerRoute');

const configureAppImplementingMongoDBServer = (app) => {
    const port = process.env.PORT || 9000;

    app.set('port', port);

    app.use(cors());
    app.use(express.json());
    app.use('/api', productsRoutes);
    app.use('/api', usersRoutes);
    app.use('/api', brandsRoutes);
    app.use('/api', ordersRoutes);
    app.use('/api', offersRoutes);

    app.get('/', (req, res) => {
        res.send("Welcome to Full API Rest Playhard E-commerce");
    });

    mongoose.connect(process.env.MONGODB_URI)
        .then(() => console.log("-> Successfully connected to MongoDB Atlas."))
        .catch((error) => console.error(error));
};

module.exports = configureAppImplementingMongoDBServer;
