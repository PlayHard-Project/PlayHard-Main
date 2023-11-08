const express = require('express');
const userSchema = require('../models/userSchema');

const router = express.Router();

// Create User
router.post('/users', (req, res) => {
    const userC = userSchema(req.body);
    userC
        .save()
        .then((data) => res.json(data))
        .catch((err) => res.json({message: err}));
});

// Get All Users
router.get('/users', (req, res) => {
    userSchema
        .find()
        .then((data) => res.json(data))
        .catch((err) => res.json({message: err}));
});

// Get A User
router.get('/users/:id', (req, res) => {
    const { id } = req.params;
    userSchema
        .findById(id)
        .then((data) => res.json(data))
        .catch((err) => res.json({message: err}));
});

// Update A User
router.put('/users/:id', (req, res) => {
    const { id } = req.params;
    const { name, age, email } = req.body;
    userSchema
        .updateOne({ _id: id }, { $set: {name, age, email} })
        .then((data) => res.json(data))
        .catch((err) => res.json({message: err}));
});

// Delet A User
router.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    userSchema
        .deleteOne( {_id: id})
        .then((data) => res.json(data))
        .catch((err) => res.json({message: err}));
});

module.exports = router;