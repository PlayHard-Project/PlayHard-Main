const express = require("express");
const { Order } = require("../models/orderSchema");
const createRoutes = require("./routeHandler");

const router = express.Router();

createRoutes(router, Order, "orders");

/**
 * Endpoint to retrieve all orders for a specific user ID.
 * @name router.get
 * @method
 * @param {string} `/${baseRoute}/user/:userId` - The path for retrieving all orders for a specific user.
 * @param {Function} (req, res) - Callback function to handle the route.
 * @returns {void}
 */
router.get(`/${baseRoute}/user/:userId`, (req, res) => {
  const { userId } = req.params;
  Order
    .find({ userId })
    .then((data) => res.json(data))
    .catch((err) => res.json({ message: err }));
});

module.exports = router;
