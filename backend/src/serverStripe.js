const express = require('express');
const stripe = require('stripe');

const configureAppImplementingStripeServer = (app) => {
    app.use(express.static('public'));
    app.use(express.json());

    const stripeGateway = stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2020-08-27' });

    app.get('/', (req, res) => {
        res.send("Welcome to Full API Rest Playhard E-commerce");
    });

    app.post('/stripe-api/intent-payment', async (req, res) => {
        try {
            const { amount, currency } = req.body;
            const paymentIntent = await stripeGateway.paymentIntents.create({
                amount,
                currency,
            });

            res.json({ clientSecret: paymentIntent.client_secret });
        } catch (error) {
            console.error('Error creating payment intent:', error);
            res.status(500).json({ error: 'Error creating payment intent' });
        }
    });

    app.post('/stripe-api/confirm-payment', async (req, res) => {
    });

    app.post('/stripe-api/failure-payment', (req, res) => {
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
