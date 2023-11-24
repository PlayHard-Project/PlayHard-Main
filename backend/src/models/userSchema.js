/**
 * @file Defines the mongoose schema and model for the 'User' collection.
 * @module models/user
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * @typedef {Object} User
 * @property {string} name - The name of the user.
 * @property {string} email - The email address of the user.
 * @property {string} password - The password of the user.
 * @property {boolean} isAdmin - A flag indicating whether the user is an admin.
 */

/**
 * Represents the mongoose schema for the 'User' collection.
 * @type {mongoose.Schema<User>}
 */
const userSchema = new Schema({

    /**
     * The name of the user.
     * @type {string}
     * @required
     */
    name: {
        type: String,
        required: true
    },

    /**
     * The email address of the user.
     * @type {string}
     * @required
     * @unique
     */
    email: {
        type: String,
        required: true,
        unique: true
    },

    /**
     * The password of the user.
     * @type {string}
     * @required
     */
    password: {
        type: String,
        required: true
    },

    /**
     * A flag indicating whether the user is an admin.
     * @type {boolean}
     * @required
     */
    isAdmin: {
        type: Boolean,
        required: true
    },
});

module.exports = mongoose.model("User", userSchema);