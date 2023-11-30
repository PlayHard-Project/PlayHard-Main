const express = require("express");
const productSchema = require("../models/productSchema");
const createRoutes = require("./routeHandler");
const Product = require("../models/productSchema");

const router = express.Router();

/**
 * Endpoint to retrieve all unavailable products.
 *
 * @name router.get
 * @method
 * @param {string} `/products/available-products` - Route to retrieve unavailable products.
 * @param {Function} (req, res) - Callback function to handle the route.
 * @returns {void}
 */
router.get("/products/available-products", async (req, res) => {
  try {
    const availableProducts = await Product.find({ isAvailable: true });
    res.json(availableProducts);
  } catch (error) {
    console.error("Error retrieving unavailable products:", error);
    res.status(500).json({ error: "Error retrieving unavailable products" });
  }
});

/**
 * Creates CRUD (Create, Read, Update, Delete) routes for a given model in a MongoDB database.
 *
 * @name createRoutes
 * @function
 * @param {Object} router - Express router instance.
 * @param {Object} model - Mongoose model representing the data structure in the MongoDB database.
 * @param {string} baseRoute - Base route for the CRUD operations.
 * @returns {void}
 */
createRoutes(router, productSchema, "products");

/**
 * Endpoint to retrieve a specific product by ID.
 *
 * @name router.get
 * @method
 * @param {string} `/products/:id([a-fA-F0-9]{24})` - Route to retrieve a specific product by ID.
 * @param {Function} (req, res) - Callback function to handle the route.
 * @returns {void}
 */
router.get("/products/:id([a-fA-F0-9]{24})", async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    console.error("Error retrieving the product:", error);
    res.status(500).json({ error: "Error retrieving the product" });
  }
});

module.exports = router;
