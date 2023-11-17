export default class ProductEntityForStripe {
    constructor(id, name, price, quantity, description, imagePath) {
        this.id = id;
        this.quantity = quantity;
        this.name = name;
        this.price = price;
        this.description = description;
        this.imagePath = imagePath;
    }
}