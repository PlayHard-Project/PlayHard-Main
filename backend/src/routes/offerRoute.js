const express = require('express');
const offerSchema = require('../models/offerSchema');
const createRoutes = require('./routeHandler');

const router = express.Router();

createRoutes(router, offerSchema, 'offers');

module.exports = router;
