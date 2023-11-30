/**
 * Creates CRUD (Create, Read, Update, Delete) routes for a given model in a MongoDB database.
 * @module createRoutes
 * @param {Object} router - Express router instance.
 * @param {Object} model - Mongoose model representing the data structure in the MongoDB database.
 * @param {string} baseRoute - Base route for the CRUD operations.
 * @returns {void}
 */
function createRoutes(router, model, baseRoute) {
  /**
   * Endpoint to create a new item in the database.
   * @name router.post
   * @method
   * @param {string} `/${baseRoute}` - The path for creating a new item.
   * @param {Function} (req, res) - Callback function to handle the route.
   * @returns {void}
   */
  router.post(`/${baseRoute}`, (req, res) => {
    const newItem = model(req.body);
    newItem
      .save()
      .then((data) => res.json(data))
      .catch((error) => res.json({ message: error }));
  });

  /**
   * Endpoint to retrieve the last inserted item's ID from the database.
   * @name router.get
   * @method
   * @param {string} `/${baseRoute}/last-id` - The path for retrieving the last inserted item's ID.
   * @param {Function} (req, res) - Callback function to handle the route.
   * @returns {void}
   */
  router.get(`/${baseRoute}/last-id`, (req, res) => {
    model
      .findOne()
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
   * Route for performing a search on the model data.
   *
   * @param {string} `/${baseRoute}/search` - The route on which to perform the search.
   * @param {Function} (req, res) - The callback function to handle the route.
   * @returns {void}
   */
  router.get(`/${baseRoute}/search`, (req, res) => {
    const search = req.query.search;
    if (search) {
      const normalizedSearch = search.replace(/[^\w\s]/gi, '').toLowerCase();
      model
          .find()
          .then((data) => {
            const filteredData = data.filter(product =>
                product.name.replace(/[^\w\s]/gi, '').toLowerCase().includes(normalizedSearch)
            );
            res.json(filteredData);
          })
          .catch((err) => res.json({ message: err }));
    } else {
      res.json({ message: 'No search query provided' });
    }
  });

  /**
   * Endpoint to retrieve all items from the database.
   * @name router.get
   * @method
   * @param {string} `/${baseRoute}` - The path for retrieving all items.
   * @param {Function} (req, res) - Callback function to handle the route.
   * @returns {void}
   */
  router.get(`/${baseRoute}`, async (req, res) => {
    let query = {};

    if (req.query.size) {
      query.size = {$in: req.query.size.split(',')};
    }

    if (req.query.target) {
      query.target = {$in: req.query.target.split(',')};
    }

    if (req.query.sport) {
      query.sport = {$in: req.query.sport.split(',')};
    }

    if (req.query.brand) {
      query.brand = {$in: req.query.brand.split(',')};
    }

    if (req.query.categories) {
      query.categories = {$in: req.query.categories.split(',')};
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

    const totalDocuments = await model.countDocuments(query);

    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 20; // Set a default page size
    const totalPages = Math.ceil(totalDocuments / pageSize);

    model
        .find(query)
        .skip((page - 1) * pageSize)
        .limit(pageSize)
        .then((data) => {
          if (data.length === 0) {
            res.status(404).json({message: 'No products found with the specified filters'});
          } else {
            res.json({data, totalPages});
          }
        })
        .catch((err) => res.status(500).json({message: err}));
  });

  /**
   * Endpoint to retrieve a specific item by ID from the database.
   * @name router.get
   * @method
   * @param {string} `/${baseRoute}/:id` - The path for retrieving a specific item by ID.
   * @param {Function} (req, res) - Callback function to handle the route.
   * @returns {void}
   */
  router.get(`/${baseRoute}/:id`, (req, res) => {
    const { id } = req.params;
    model
      .findById(id)
      .then((data) => res.json(data))
      .catch((err) => res.json({ message: err }));
  });

  /**
   * Endpoint to update a specific item by ID in the database.
   * @name router.put
   * @method
   * @param {string} `/${baseRoute}/:id` - The path for updating a specific item by ID.
   * @param {Function} (req, res) - Callback function to handle the route.
   * @returns {void}
   */
  router.put(`/${baseRoute}/:id`, (req, res) => {
    const { id } = req.params;
    const updateData = req.body;
    model
      .updateOne({ _id: id }, { $set: updateData })
      .then((data) => res.json(data))
      .catch((err) => res.json({ message: err }));
  });

  /**
   * Endpoint to delete a specific item by ID from the database.
   * @name router.delete
   * @method
   * @param {string} `/${baseRoute}/:id` - The path for deleting a specific item by ID.
   * @param {Function} (req, res) - Callback function to handle the route.
   * @returns {void}
   */
  router.delete(`/${baseRoute}/:id`, (req, res) => {
    const { id } = req.params;
    model
      .deleteOne({ _id: id })
      .then((data) => res.json(data))
      .catch((err) => res.json({ message: err }));
  });
}

/**
 * Export the createRoutes function.
 * @name module.exports
 * @method
 * @type {Function}
 * @param {Object} createRoutes - The createRoutes function.
 * @returns {void}
 */
module.exports = createRoutes;
