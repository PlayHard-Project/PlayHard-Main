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
router.get("/orders/user/:userId", async (req, res) => {
  const { userId } = req.params;
  const { date } = req.query;

  let query = { userId };

  if (date) {
    const dateWithoutTime = new Date(date);
    dateWithoutTime.setUTCHours(0, 0, 0, 0);

    query.createdAt = dateWithoutTime;
  }

  try {
    const orders = await Order.find(query)
    .sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
