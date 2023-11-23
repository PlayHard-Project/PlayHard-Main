const sendMail = require('./sendEmail'); 
const express = require('express');

const configureAppImplementingStripeServer = (app) => {
    app.use(express.static("public"));
    app.use(express.json());
  
    app.post('/send-email', async (req, res) => {
        const { to, subject, html } = req.body;
      
        try {
          await sendMail(to, subject, html);
          res.status(200).send('Correo electrónico enviado con éxito');
        } catch (error) {
          res.status(500).send('Error al enviar el correo electrónico');
        }
      });      
  };
  
  /**
   * Module for configuring an application implementing a Stripe server.
   * @module configureAppImplementingStripeServer
   */
  module.exports = configureAppImplementingStripeServer;
  