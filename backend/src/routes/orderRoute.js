const express = require('express');
const { Order } = require("../models/orderSchema");
const createRoutes = require('./routeHandler');

const router = express.Router();

createRoutes(router, Order, 'orders');

module.exports = router;
