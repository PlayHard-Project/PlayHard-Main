/**
 * @file Defines the routes for user-related operations using Express.
 * @module routes/userRoutes
 */
const express = require('express');
const userSchema = require('../models/userSchema');
const {createRoutes} = require('./userHandler')
const {signIn} = require('./signInHandler')


/**
 * Express Router to handle user-related routes.
 * @type {express.Router}
 */
const router = express.Router();

/**
 * Creates and configures routes for basic user operations.
 * @function
 * @param {express.Router} router - The Express Router instance to configure.
 * @param {import('../models/userSchema').User} userSchema - The Mongoose schema for the 'User' collection.
 * @param {string} routeName - The name of the route.
 */
createRoutes(router, userSchema, 'users');
/**
 * Creates and configures routes for user signup.
 * @function
 * @param {express.Router} router - The Express Router instance to configure.
 * @param {import('../models/userSchema').User} userSchema - The Mongoose schema for the 'User' collection.
 * @param {string} routeName - The name of the route.
 */
createRoutes(router, userSchema, 'signup');

/**
 * Creates the login route in the current router and assign the controller
 * @param {/string} route - The login route
 * @param {controller} controller - The controller for this route
 */
router.post('/sign-in', signIn);

/**
 * Exports the configured Express Router for user-related routes.
 * @type {express.Router}
 */
module.exports = router;
