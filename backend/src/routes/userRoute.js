const express = require('express');
const userSchema = require('../models/userSchema');
const createRoutes = require('./routeHandler');
const userController = require('../controllers/userController');

const router = express.Router();

createRoutes(router, userSchema, 'users');

router.post('/login', userController.login);

module.exports = router;
