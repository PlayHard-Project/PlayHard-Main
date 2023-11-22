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
   * Endpoint to retrieve all items from the database.
   * @name router.get
   * @method
   * @param {string} `/${baseRoute}` - The path for retrieving all items.
   * @param {Function} (req, res) - Callback function to handle the route.
   * @returns {void}
   */
  router.get(`/${baseRoute}`, (req, res) => {
    model
      .find()
      .then((data) => res.json(data))
      .catch((err) => res.json({ message: err }));
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
