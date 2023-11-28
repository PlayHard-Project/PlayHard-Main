const mongoose = require("mongoose");
const { DateTime } = require("intl");
const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    orderCount: {
      type: Number,
      default: 0,
    },
    userId: {
      type: String,
      ref: "User",
      required: true,
    },
    customerId: {
      type: String,
    },
    paymentIntentId: {
      type: String,
    },
    products: [
      {
        id: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        size: {
          type: String,
          required: true,
        },
        color: {
          type: String,
          required: true,
        },
      },
    ],
    subtotal: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: false,
    },
    delivery_status: {
      type: String,
      default: "pending",
    },
    payment_status: {
      type: String,
      required: true,
    },
    shippingAddress: {
      avenue1: {
        type: String,
        required: true,
      },
      avenue2: {
        type: String,
        default: "s/n",
      },
      city: {
        type: String,
        required: true,
      },
      country: {
        type: String,
        required: true,
      },
    },
    userInformation: {
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
    },
    date: {
      type: Date,
      default: function () {
        const currentDate = new Date();
        currentDate.setUTCHours(0, 0, 0, 0);
        return currentDate;
      },
      required: true,
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
exports.Order = Order;
