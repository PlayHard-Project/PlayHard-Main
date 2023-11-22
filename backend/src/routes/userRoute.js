const express = require('express');
const userSchema = require('../models/userSchema');
const {createRoutes} = require('./userHandler')

const router = express.Router();

createRoutes(router, userSchema, 'users')
createRoutes(router, userSchema, 'signup');


module.exports = router;
