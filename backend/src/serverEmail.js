const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

function sendMail(emailPassed) {
    const myEmail = process.env.MY_EMAIL;
    const myPassword = process.env.MY_PASSWORD;
    
    return new Promise((resolve, reject) => {
        let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: myEmail,
                pass: myPassword,
            }
        });

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
                    <h1>Hola Mundo</h1>
                </body>
                </html>
            `,
        };

        transporter.sendMail(mailConfigs, function (error, info) {
            if(error) {
                console.log(error);
                return reject(new Error('An error has occurred'));
            } return resolve(new Error('Email sent successfully'));
        });
    });
}
const configureAppImplementingStripeServer = (app) => {
    app.use(express.static('public'));
    app.use(express.json());
    app.use(cors()); 

    const emailPassed = "jefersoncoronel700@gmail.com";

    app.get("/sendEmail", (req, res) => {
        sendMail(emailPassed)
        .then((response) => res.send(response.message))
        .catch((error) => res.status(500).send(error.message));
    });

    console.log("-> Successfully connected to Email server.");
};

module.exports = configureAppImplementingStripeServer;
