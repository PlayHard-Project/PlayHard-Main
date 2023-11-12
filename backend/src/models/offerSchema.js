const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const offerSchema = new Schema({
  name: {
    type: String,
    required: false,
  },
  imagePath: {
    type: String,
    required: false,
  },
  reactRoute: {
    type: String,
    required: false,
  },
  idProduct: {
    type: String,
    required: false,
    ref: 'Product'
  },
});

module.exports = mongoose.model("Offer", offerSchema);
