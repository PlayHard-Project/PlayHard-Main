const express = require('express');
const userSchema = require('../models/userSchema');
const createRoutes = require('./routeHandler');
// const {registerUser} = require('./userHandler')

const router = express.Router();

createRoutes(router, userSchema, 'users');

//router.post('/register', registerUser)

module.exports = router;
