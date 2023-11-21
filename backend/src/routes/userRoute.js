const express = require('express');
const userSchema = require('../models/userSchema');
//const createRoutes = require('./routeHandler');
const {createRoutes} = require('./userHandler')

const router = express.Router();

createRoutes(router, userSchema, 'users')
createRoutes(router, userSchema, 'registerUser');

//router.post('/register', registerUser)

module.exports = router;
