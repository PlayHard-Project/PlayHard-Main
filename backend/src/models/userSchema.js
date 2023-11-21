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
        creditCardNumber: {
            type: Number,
            required: true
        },
        expirationDate: {

            type: Date,
            required: true
        },
        cvc: {
            type: Number,
            required: true
        },
        cardType: {
            type: String,
            required: true
        }
    }

});

module.exports = mongoose.model("User", userSchema);