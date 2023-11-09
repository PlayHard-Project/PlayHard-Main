const express = require('express');
const userSchema = require('../models/userSchema');
const createRoutes = require('./routeHandler');

const router = express.Router();

createRoutes(router, userSchema, 'users');

module.exports = router;
