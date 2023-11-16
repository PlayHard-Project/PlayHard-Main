const express = require('express');
const stripe = require('stripe');
const cors = require('cors');

const configureAppImplementingStripeServer = (app) => {
    app.use(express.static('public'));
    app.use(express.json());
    app.use(cors()); 

    const stripeGateway = stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2020-08-27' });

    app.get('/', (req, res) => {
        res.send("Welcome to Full API Rest Playhard E-commerce");
    });

    app.post('/stripe-api/intent-payment', async (req, res) => {
        const { products } = req.body;
        console.log(products);
    
        const lineItems = products.map((product) => ({
            price_data: {
                currency: "usd",
                product_data: {
                    name: product.name,
                    description: product.description,
                    images: product.imagePath
                },
                unit_amount: product.price * 100,
            },
            quantity: product.quantity,
        }));
    
        try {
            const session = await stripeGateway.checkout.sessions.create({
                payment_method_types: ['card'],
                mode: 'payment',
                line_items: lineItems,
                success_url: 'http://localhost:3001/succes-payment-status',
                cancel_url: 'http://localhost:3001/fail-payment-status',
                billing_address_collection: 'required'
            });
    
            res.json({ id: session.id });
        } catch (error) {
            console.error('Error creating payment session:', error);
            res.status(500).json({ error: 'Error creating payment session' });
        }
    });

    app.post('/stripe-api/confirm-payment', async (req, res) => {
        try {
            res.send("Payment confirmed");
        } catch (error) {
            console.error('Error confirming payment:', error);
            res.status(500).json({ error: 'Error confirming payment' });
        }
    });

    app.post('/stripe-api/failure-payment', (req, res) => {
        try {
            res.send("Payment failed");
        } catch (error) {
            console.error('Error handling failed payment:', error);
            res.status(500).json({ error: 'Error handling failed payment' });
        }
    });

    app.get('/stripe-api/intent-payment', (req, res) => {
        res.send("Intent-payment");
    });

    app.get('/stripe-api/confirm-payment', (req, res) => {
        res.send("Confirm-payment");
    });

    app.get('/stripe-api/failure-payment', (req, res) => {
        res.send("failure-payment");
    });

    console.log("-> Successfully connected to Stripe server.");
};

module.exports = configureAppImplementingStripeServer;
