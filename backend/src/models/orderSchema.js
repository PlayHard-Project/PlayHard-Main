const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    isDelivered: {
        type: Boolean,
        required: true
    },
    date: {
        type: Date,
        required: false
    },
    shippingAddress: {
        type: String,
        required: true
    },
    boughtProducts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Product'
        }
    ],
    total: {
        type: Number,
        required: false
    },
});

module.exports = mongoose.model('Order', orderSchema);