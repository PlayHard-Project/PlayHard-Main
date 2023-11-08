const express = require('express');
const brandSchema = require('../models/brandSchema');
const createRoutes = require('./routeHandler');

const router = express.Router();

createRoutes(router, brandSchema, 'brands');

module.exports = router;
