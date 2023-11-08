const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true
    },
    creditCard: {
        creditCardNumber: Number,
        expirationDate: Date,
        cvc: Number,
        type: String
    }
});

module.exports = mongoose.model("User", userSchema);