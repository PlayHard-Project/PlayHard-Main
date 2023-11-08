function createRoutes(router, model, baseRoute) {
    
  router.post(`/${baseRoute}`, (req, res) => {
    const newItem = model(req.body);
    newItem
      .save()
      .then((data) => res.json(data))
      .catch((error) => res.json({ message: error }));
  });

  router.get(`/${baseRoute}`, (req, res) => {
    model
      .find()
      .then((data) => res.json(data))
      .catch((err) => res.json({ message: err }));
  });

  router.get(`/${baseRoute}/:id`, (req, res) => {
    const { id } = req.params;
    model
      .findById(id)
      .then((data) => res.json(data))
      .catch((err) => res.json({ message: err }));
  });

  router.put(`/${baseRoute}/:id`, (req, res) => {
    const { id } = req.params;
    const updateData = req.body;
    model
      .updateOne({ _id: id }, { $set: updateData })
      .then((data) => res.json(data))
      .catch((err) => res.json({ message: err }));
  });

  router.delete(`/${baseRoute}/:id`, (req, res) => {
    const { id } = req.params;
    model
      .deleteOne({ _id: id })
      .then((data) => res.json(data))
      .catch((err) => res.json({ message: err }));
  });
}

module.exports = createRoutes;
