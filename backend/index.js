const express = require('express');
const configureAppImplementingMongoDBServer = require('./src/serverBDMongo');
const configureAppImplementingStripeServer = require('./src/serverStripe');

/**
 * Express application instance.
 * @type {Object}
 */
const app = express();

/**
 * Configure the Express application to implement MongoDB server functionality.
 * @function
 * @param {Object} app - Express application instance.
 * @returns {void}
 */
configureAppImplementingMongoDBServer(app);

/**
 * Configure the Express application to implement Stripe server functionality.
 * @function
 * @param {Object} app - Express application instance.
 * @returns {void}
 */
configureAppImplementingStripeServer(app);

/**
 * Start the Express application and listen on the specified port.
 * @method
 * @name app.listen
 * @param {number} app.get('port') - Port on which the server listens.
 * @param {Function} () - Callback function executed once the server is running.
 * @returns {void}
 */
app.listen(app.get('port'), () => {
    console.log(`Server is running on port ${app.get('port')}`);
});
