const express = require('express');
const productSchema = require('../models/productSchema');
const createRoutes = require('./routeHandler');

const router = express.Router();

createRoutes(router, productSchema, 'products');

module.exports = router;
