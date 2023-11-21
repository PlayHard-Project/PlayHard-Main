const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

/**
 * Sends an email using the configured email credentials.
 * @param {string} emailPassed - The recipient's email address.
 * @returns {Promise} - A promise that resolves with a success message or rejects with an error.
 * @throws {Error} - Throws an error if an issue occurs during the email sending process.
 */
function sendMail(emailPassed) {
  const myEmail = process.env.MY_EMAIL;
  const myPassword = process.env.MY_PASSWORD;

  return new Promise((resolve, reject) => {
    /**
     * Create a transporter for sending emails using nodemailer.
     * @type {Object}
     */
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: myEmail,
        pass: myPassword,
      },
    });

    /**
     * Configuration for the email to be sent.
     * @type {Object}
     */
    const mailConfigs = {
      from: myEmail,
      to: emailPassed,
      subject: "Testing Koding 101 Email",
      html: `
              <!DOCTYPE html>
              <html lang="en">
              <head>
                  <meta charset="UTF-8">
                  <meta name="viewport" content="width=device-width, initial-scale=1.0">
                  <title>Document</title>
              </head>
              <body>
                  <h1>Hello World</h1>
              </body>
              </html>
          `,
    };

    /**
     * Send the email using the transporter.
     * @param {Error} error - An error object if the email sending fails.
     * @param {Object} info - Information about the sent email.
     */
    transporter.sendMail(mailConfigs, function (error, info) {
      if (error) {
        console.log(error);
        return reject(new Error("An error has occurred"));
      }
      return resolve(new Error("Email sent successfully"));
    });
  });
}

/**
 * Configures an Express application implementing a email integration.
 * @param {Object} app - Express application instance.
 * @returns {void}
 */
const configureAppImplementingEmailApi = (app) => {
  app.use(express.static("public"));
  app.use(express.json());
  app.use(cors());

  const emailPassed = "hermes.map.app@gmail.com";

  /**
   * Endpoint to trigger the sending of a test email.
   * @name GET/sendEmail
   * @function
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   * @returns {void}
   */
  app.get("/sendEmail", (req, res) => {
    sendMail(emailPassed)
      .then((response) => res.send(response.message))
      .catch((error) => res.status(500).send(error.message));
  });

  console.log("-> Successfully connected to Email server.");
};

/**
 * Module for configuring an application implementing a email sending.
 * @module configureAppImplementingEmailApi
 */
module.exports = configureAppImplementingEmailApi;
