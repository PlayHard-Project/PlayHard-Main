const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
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
    boughtProducts: [
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
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
exports.Order = Order;
