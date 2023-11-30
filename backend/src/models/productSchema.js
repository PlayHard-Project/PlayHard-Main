const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    brand: { //ID to refer to another collection of brands
        type: Schema.Types.ObjectId,
        ref: 'Brand',
        required: false
    },
    categories: [
        {type: String,
        required: true}
    ],
    target: [ //Tags to add the kind of people that the product is focused. (Man, women, kids, teenager, etc)
        {type: String,
        required: true}
    ],
    sport: [ //Tags to add sports that may do with this product.
        {type: String,
        required: true}
    ],
    size: [ //List of sizes
        {type: String,
        required: true}
    ],
    colorInformation: [ //List of colors with the reference image of the product in this color.
        {
            color: {
                type: String,
                required: true
            },
            hex: {
                type: String,
                required: true
            },
            imagePath: {
                type: String,
                required: true
            }
        }
    ],
    imagePath: [ //List of imagePaths, these images should detail the products or give different angles of the product.
        {type: String,
        required: true}
    ],
    inStock: [[ //Matrix with relation of SizeList x ColorList to manage the quantity of products on stock
        {type: Number,
        required: true}
    ]]
});

module.exports = mongoose.model('Product', productSchema);