const express = require('express');
const userSchema = require('../models/userSchema');
const {createRoutes, login} = require('./userHandler')


const router = express.Router();

createRoutes(router, userSchema, 'users')
createRoutes(router, userSchema, 'signup');
router.post('/login', login);

module.exports = router;
