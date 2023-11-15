require('dotenv').config();

const express = require('express');
const stripe = require('stripe');

const configureAppImplementingStrypeServer = (app) => {
    
    app.use(express.static('public'));
    app.use(express.json());

    let stripeGateway = stripe(process.env.STRIPE_API_URI);

    app.get('/', (req, res) => {
        res.send("Welcome to Full API Rest Playhard E-commercessss");
    });
    
    app.post('/strype-api/intent-payment');
    app.post('/strype-api/confirm-payment');
    app.post('/strype-api/failure-payment');

    console.log("-> Successfully connected to Stripe server.")
};

module.exports = configureAppImplementingStrypeServer;