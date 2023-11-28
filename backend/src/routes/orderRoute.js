const express = require("express");
const { Order } = require("../models/orderSchema");
const router = express.Router();

/**
 * Endpoint to create a new order in the database.
 * Increments the global order count and assigns it to the new order.
 *
 * @name router.post
 * @method
 * @param {string} `/orders` - The path for creating a new order.
 * @param {Function} (req, res) - Callback function to handle the route.
 * @returns {void}
 */
router.post('/orders', async (req, res) => {
  try {
    const lastOrder = await Order.findOne().sort({ orderCount: -1 });
    const orderCount = lastOrder ? lastOrder.orderCount + 1 : 1;
    const newItem = new Order({
      ...req.body,
      orderCount,
    });

    const data = await newItem.save();
    res.json(data);
  } catch (error) {
    res.json({ message: error });
  }
});

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
    query.date = dateWithoutTime;
  }

  try {
    const orders = await Order.find(query);
    res.json(orders);
  } catch (err) {
    console.error("Error fetching orders:", err);
    res.status(500).json({ message: err.message });
  }
});

/**
 * Endpoint to retrieve the last inserted order's ID from the database.
 * @name router.get
 * @method
 * @param {string} `/orders/last-id` - The path for retrieving the last inserted order's ID.
 * @param {Function} (req, res) - Callback function to handle the route.
 * @returns {void}
 */
router.get("/orders/last-id", (req, res) => {
  Order.findOne()
    .sort({ _id: -1 })
    .then((data) => {
      if (data) {
        res.json({ lastId: data._id });
      } else {
        res.json({ lastId: null });
      }
    })
    .catch((err) => res.json({ message: err }));
});

/**
 * Endpoint to retrieve all orders from the database.
 * @name router.get
 * @method
 * @param {string} `/orders` - The path for retrieving all orders.
 * @param {Function} (req, res) - Callback function to handle the route.
 * @returns {void}
 */
router.get("/orders", (req, res) => {
  Order.find()
    .then((data) => res.json(data))
    .catch((err) => res.json({ message: err }));
});

/**
 * Endpoint to retrieve a specific order by ID from the database.
 * @name router.get
 * @method
 * @param {string} `/orders/:id` - The path for retrieving a specific order by ID.
 * @param {Function} (req, res) - Callback function to handle the route.
 * @returns {void}
 */
router.get("/orders/:id", (req, res) => {
  const { id } = req.params;
  Order.findById(id)
    .then((data) => res.json(data))
    .catch((err) => res.json({ message: err }));
});

/**
 * Endpoint to update a specific order by ID in the database.
 * @name router.put
 * @method
 * @param {string} `/orders/:id` - The path for updating a specific order by ID.
 * @param {Function} (req, res) - Callback function to handle the route.
 * @returns {void}
 */
router.put("/orders/:id", (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  Order.updateOne({ _id: id }, { $set: updateData })
    .then((data) => res.json(data))
    .catch((err) => res.json({ message: err }));
});

/**
 * Endpoint to delete a specific order by ID from the database.
 * @name router.delete
 * @method
 * @param {string} `/orders/:id` - The path for deleting a specific order by ID.
 * @param {Function} (req, res) - Callback function to handle the route.
 * @returns {void}
 */
router.delete("/orders/:id", (req, res) => {
  const { id } = req.params;
  Order.deleteOne({ _id: id })
    .then((data) => res.json(data))
    .catch((err) => res.json({ message: err }));
});

module.exports = router;
