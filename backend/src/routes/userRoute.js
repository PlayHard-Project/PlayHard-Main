const express = require('express');
const userSchema = require('../models/userSchema');
const {createRoutes} = require('./userHandler')
const userController = require('../controllers/userController');


const router = express.Router();

createRoutes(router, userSchema, 'users')
createRoutes(router, userSchema, 'signup');
router.post('/login', userController.login);

module.exports = router;
