/**
 * Configuration function to implement MongoDB server functionality in an Express application.
 * @module configureAppImplementingMongoDBServer
 * @param {Object} app - Express application instance.
 * @returns {void}
 */
const configureAppImplementingMongoDBServer = (app) => {
    require('dotenv').config();

    const express = require('express');
    const cors = require('cors');
    const mongoose = require('mongoose');

    const productsRoutes = require('./routes/productRoute');
    const usersRoutes = require('./routes/userRoute');
    const brandsRoutes = require('./routes/brandRoute');
    const ordersRoutes = require('./routes/orderRoute');
    const offersRoutes = require('./routes/offerRoute');
    const port = process.env.PORT || 9000;

    app.set('port', port);

    /**
     * Enable Cross-Origin Resource Sharing for the Express application.
     * @name app.use
     * @method
     * @param {Function} cors - CORS middleware.
     * @returns {void}
     */
    app.use(cors());

    /**
     * Parse JSON-encoded bodies for incoming requests.
     * @name app.use
     * @method
     * @param {Function} express.json - Middleware to parse JSON.
     * @returns {void}
     */
    app.use(express.json());

    /**
     * Mount product-related routes under the '/api' path.
     * @name app.use
     * @method
     * @param {string} '/api' - The base path for product routes.
     * @param {Object} productsRoutes - Product-related routes.
     * @returns {void}
     */
    app.use('/api', productsRoutes);

    /**
     * Mount user-related routes under the '/api' path.
     * @name app.use
     * @method
     * @param {string} '/api' - The base path for user routes.
     * @param {Object} usersRoutes - User-related routes.
     * @returns {void}
     */
    app.use('/api', usersRoutes);

    /**
     * Mount brand-related routes under the '/api' path.
     * @name app.use
     * @method
     * @param {string} '/api' - The base path for brand routes.
     * @param {Object} brandsRoutes - Brand-related routes.
     * @returns {void}
     */
    app.use('/api', brandsRoutes);

    /**
     * Mount order-related routes under the '/api' path.
     * @name app.use
     * @method
     * @param {string} '/api' - The base path for order routes.
     * @param {Object} ordersRoutes - Order-related routes.
     * @returns {void}
     */
    app.use('/api', ordersRoutes);

    /**
     * Mount offer-related routes under the '/api' path.
     * @name app.use
     * @method
     * @param {string} '/api' - The base path for offer routes.
     * @param {Object} offersRoutes - Offer-related routes.
     * @returns {void}
     */
    app.use('/api', offersRoutes);

    app.use("/api/Stripe", );

    /**
     * Define a route for the root path.
     * @name app.get
     * @method
     * @param {string} '/' - The root path.
     * @param {Function} (req, res) - Callback function to handle the route.
     * @returns {void}
     */
    app.get('/', (req, res) => {
        res.send("Welcome to Full API Rest Playhard E-commerce");
    });

    /**
     * Connect to the MongoDB database using the provided URI.
     * @name mongoose.connect
     * @method
     * @param {string} process.env.MONGODB_URI - The URI for connecting to MongoDB Atlas.
     * @returns {Promise} - A promise that resolves on successful connection or rejects on error.
     */
    mongoose.connect(process.env.MONGODB_URI)
        .then(() => console.log("-> Successfully connected to MongoDB Atlas."))
        .catch((error) => console.error(error));
};

/**
 * Export the configuration function for MongoDB server implementation.
 * @name module.exports
 * @method
 * @type {Function}
 * @param {Object} configureAppImplementingMongoDBServer - Configuration function.
 * @returns {void}
 */
module.exports = configureAppImplementingMongoDBServer;
