const express = require('express');
const orderSchema = require('../models/orderSchema');
const createRoutes = require('./routeHandler');

const router = express.Router();

createRoutes(router, orderSchema, 'orders');

module.exports = router;
