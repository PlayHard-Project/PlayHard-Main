const express =  require('express');
/**1. exportamos el esquema de datos de productos*/
const productSchema = require('../models/productSchema');

/**Creamos un enrutador que exportaremos a partir de este archivo para usar en el servidor*/
const router = express.Router();

/**1. Ruta de crear producto */
router.post('/products', (req, res) => {
    const productToAdd = productSchema(req.body);
    productToAdd
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({message: error}));
});

// Get All Users
router.get('/products', (req, res) => {
    productSchema
        .find()
        .then((data) => res.json(data))
        .catch((err) => res.json({message: err}));
});

// Get A User
router.get('/products/:id', (req, res) => {
    const { id } = req.params;
    productSchema
        .findById(id)
        .then((data) => res.json(data))
        .catch((err) => res.json({message: err}));
});

// Update A User
router.put('/products/:id', (req, res) => {
    const { id } = req.params;
    const { name, category, price, currency, description, manufacturer, image} = req.body;
    productSchema
        .updateOne({ _id: id }, { $set: {name, category, price, currency, description, manufacturer, image} })
        .then((data) => res.json(data))
        .catch((err) => res.json({message: err}));
});

// Delet A User
router.delete('/products/:name', (req, res) => {
    const { name } = req.params;
    productSchema
        .deleteOne( {name: name})
        .then((data) => res.json(data))
        .catch((err) => res.json({message: err}));
});


module.exports = router;