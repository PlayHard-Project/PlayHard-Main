/**
 * Configuration function to implement Stripe server functionality in an Express application.
 * @module configureAppImplementingStripeServer
 * @param {Object} app - Express application instance.
 * @returns {void}
 */
const configureAppImplementingStripeServer = (app) => {
   
    const express = require('express');
    const stripe = require('stripe');
    const cors = require('cors');

    /**
     * Initialize the Stripe gateway with the provided secret key.
     * @type {Object}
     */
    const stripeGateway = stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2020-08-27' });

    app.use(express.static('public'));
    app.use(express.json());
    app.use(cors());

    /**
     * Root endpoint that sends a welcome message.
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
     * Endpoint to create a payment session for Stripe Checkout.
     * @name app.post
     * @method
     * @param {string} '/stripe-api/intent-payment' - The path for creating a payment session.
     * @param {Function} async (req, res) - Async callback function to handle the route.
     * @returns {void}
     */
    app.post('/stripe-api/intent-payment', async (req, res) => {
        const { products } = req.body;

        const lineItems = products.map((product) => ({
            price_data: {
                currency: "usd",
                product_data: {
                    name: product.name,
                    description: product.description,
                    images: product.imagePath,
                },
                unit_amount: Math.round((product.price * 10) / 100) + product.price,
            },
            quantity: product.quantity,
        }));

        try {
            const session = await stripeGateway.checkout.sessions.create({
                payment_method_types: ['card'],
                mode: 'payment',
                line_items: lineItems,
                success_url: 'https://play-hard-main.vercel.app/success-payment-status',
                cancel_url: 'https://play-hard-main.vercel.app/fail-payment-status',
                billing_address_collection: 'required'
            });
            res.json({ id: session.id });
        } catch (error) {
            console.error('Error creating payment session:', error);
            res.status(500).json({ error: 'Error creating payment session' });
        }
    });

    /**
     * Endpoint to confirm a payment (placeholder for future implementation).
     * @name app.post
     * @method
     * @param {string} '/stripe-api/confirm-payment' - The path for confirming a payment.
     * @param {Function} async (req, res) - Async callback function to handle the route.
     * @returns {void}
     */
    app.post('/stripe-api/confirm-payment', async (req, res) => {
        try {
            res.send("Payment confirmed");
        } catch (error) {
            console.error('Error confirming payment:', error);
            res.status(500).json({ error: 'Error confirming payment' });
        }
    });

    /**
     * Endpoint to handle a failed payment (placeholder for future implementation).
     * @name app.post
     * @method
     * @param {string} '/stripe-api/failure-payment' - The path for handling a failed payment.
     * @param {Function} (req, res) - Callback function to handle the route.
     * @returns {void}
     */
    app.post('/stripe-api/failure-payment', (req, res) => {
        try {
            res.send("Payment failed");
        } catch (error) {
            console.error('Error handling failed payment:', error);
            res.status(500).json({ error: 'Error handling failed payment' });
        }
    });

    /**
     * Endpoint for testing purposes (placeholder for future implementation).
     * @name app.get
     * @method
     * @param {string} '/stripe-api/intent-payment' - The path for testing intent payment.
     * @param {Function} (req, res) - Callback function to handle the route.
     * @returns {void}
     */
    app.get('/stripe-api/intent-payment', (req, res) => {
        res.send("Intent-payment");
    });

    /**
     * Endpoint for testing purposes (placeholder for future implementation).
     * @name app.get
     * @method
     * @param {string} '/stripe-api/confirm-payment' - The path for testing confirm payment.
     * @param {Function} (req, res) - Callback function to handle the route.
     * @returns {void}
     */
    app.get('/stripe-api/confirm-payment', (req, res) => {
        res.send("Confirm-payment");
    });

    /**
     * Endpoint for testing purposes (placeholder for future implementation).
     * @name app.get
     * @method
     * @param {string} '/stripe-api/failure-payment' - The path for testing failure payment.
     * @param {Function} (req, res) - Callback function to handle the route.
     * @returns {void}
     */
    app.get('/stripe-api/failure-payment', (req, res) => {
        res.send("Failure-payment");
    });

    /**
     * Log a success message upon successful connection to the Stripe server.
     * @name console.log
     * @method
     * @param {string} '-> Successfully connected to Stripe server.' - The success message.
     * @returns {void}
     */
    console.log("-> Successfully connected to Stripe server.");
};

/**
 * Export the configuration function for implementing Stripe server functionality.
 * @name module.exports
 * @method
 * @type {Function}
 * @param {Object} configureAppImplementingStripeServer - Configuration function.
 * @returns {void}
 */
module.exports = configureAppImplementingStripeServer;
