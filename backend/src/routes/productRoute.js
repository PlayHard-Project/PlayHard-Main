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
    let query = {
      isAvailable: true,
    };

    if (req.query.size) {
      query.size = { $in: req.query.size.split(",") };
    }

    if (req.query.target) {
      query.target = { $in: req.query.target.split(",") };
    }

    if (req.query.sport) {
      query.sport = { $in: req.query.sport.split(",") };
    }

    if (req.query.brand) {
      query.brand = { $in: req.query.brand.split(",") };
    }

    if (req.query.categories) {
      query.categories = { $in: req.query.categories.split(",") };
    }

    if (req.query.minPrice || req.query.maxPrice) {
      query.price = {};
      if (req.query.minPrice) {
        query.price.$gte = Number(req.query.minPrice);
      }
      if (req.query.maxPrice) {
        query.price.$lte = Number(req.query.maxPrice);
      }
    }

    const totalDocuments = await Product.countDocuments(query);

    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 20; // Set a default page size
    const totalPages = Math.ceil(totalDocuments / pageSize);

    Product
        .find(query)
        .skip((page - 1) * pageSize)
        .limit(pageSize)
        .then((data) => {
          if (data.length === 0) {
            res.status(404).json({message: 'No products found with the specified filters'});
          } else {
            res.json({data, totalPages});
          }
        }).catch((err) => res.status(500).json({message: err}));
  } catch (error) {
    console.error("Error retrieving available products:", error);
    res.status(500).json({ error: "Error retrieving available products" });
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
