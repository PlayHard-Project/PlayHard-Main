require('dotenv').config();

const express = require('express');

const configureAppImplementingStrypeServer = (app) => {
    
    app.use(express.static('public'));
    app.use(express.json());

    app.get('/', (req, res) => {
        res.send("Welcome to Full API Rest Playhard E-commercessss");
    });
    
    console.log("-> Successfully connected to Stripe server.")
};

module.exports = configureAppImplementingStrypeServer;