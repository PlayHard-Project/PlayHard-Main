
import ProductEntity from '../Entities/ProductEntity'
import {getElementByID} from "../Components/ApiRestHandler/requestHandler";

/**
 * This class is in charge of management of the cart items stored in the localStorage.
 */
export default class BuyCartManagement {
    /**
     * This method obtains all products stored in the localStorage.
     * @returns {*|*[]} products - array of objects that contain the information of each product in the cart.
     */
    getProducts() {
        const products = localStorage.getItem('buyCart');
        return products ? JSON.parse(products).map(product => new ProductEntity(product.id, product.quantity, product.size, product.color)) : [];
    }

    /**
     * This method is used to add items/products to the cart.
     * Has the validation to increase the ordered quantity of a product if it is already existing on the cart.
     *
     * @param {string} id - Product identifier, related with database ID.
     * @param {number} quantity - How many products with this size and color do you want the user?
     * @param {number} size - Index of the size selected.
     * @param {number} color - Index of the color selected.
     */
    addProduct(id, quantity, size, color) {
        const products = this.getProducts();
        let existingProduct = products.find(product => product.id === id && product.size === size && product.color === color);

        if (existingProduct) {
            existingProduct.quantity += quantity;
        } else {
            existingProduct = new ProductEntity(id, quantity, size, color);
            products.push(existingProduct);
        }

        localStorage.setItem('buyCart', JSON.stringify(products));
    }

    /**
     * This method clear all information on the localStorage. All products deleted from the cart.
     */
    clearCart() {
        localStorage.clear();
    }

    /**
     * This method delete a product in specific.
     *
     * @param {string} id - Product identifier, related with database ID.
     * @param {number} size - Index of the size selected.
     * @param {number} color - Index of the color selected.
     */
    deleteProduct(id, size, color) {
        let products = this.getProducts();
        products = products.filter(product => !(product.id === id && product.size === size && product.color === color));
        localStorage.setItem('buyCart', JSON.stringify(products));
    }

    /**
     * This method decrease the quantity ordered of a product in specific.
     * Decrement one by one.
     *
     * @param {string} id - Product identifier, related with database ID.
     * @param {number} size - Index of the size selected.
     * @param {number} color - Index of the color selected.
     */
    decreaseQuantity(id, size, color) {
        const products = this.getProducts();
        const existingProduct = products.find(product => product.id === id && product.size === size && product.color === color);

        if (existingProduct) {
            existingProduct.quantity -= 1;

            if (existingProduct.quantity <= 0) {
                this.deleteProduct(id, size, color);
            } else {
                localStorage.setItem('buyCart', JSON.stringify(products));
            }
        }
    }

    /**
     * This method increment the quantity ordered of a product in specific.
     * Increment one by one.
     *
     * @param {string} id - Product identifier, related with database ID.
     * @param {number} size - Index of the size selected.
     * @param {number} color - Index of the color selected.
     */
    incrementQuantity(id, size, color) {
        const products = this.getProducts();
        const existingProduct = products.find(product => product.id === id && product.size === size && product.color === color);

        if (existingProduct) {
            existingProduct.quantity += 1;
            localStorage.setItem('buyCart', JSON.stringify(products));
        }
    }

    /**
     * This method access to each product and the quantity ordered to calculate the subtotal of all products.
     *
     * @returns {Promise<number>} Subtotal - (Quantity1 * Price1)...+...
     */
    getSubTotal() {
        const products = this.getProducts();
        let subTotal = 0;
        let promises = [];

        products.forEach(product => {
            const elementPromise = getElementByID(product.id, "/products");
            promises.push(elementPromise);

            elementPromise.then((item) => {
                subTotal += item.price * product.quantity;
            });
        });

        return Promise.all(promises)
            .then(() => subTotal)
            .catch(error => {
                console.error("Error fetching product details:", error);
                throw error;
            });
    }

    /**
     * This method is used to obtain the quantity ordered of a product.
     *
     * @param {string} id - Product identifier, related with database ID.
     * @param {number} size - Index of the size selected.
     * @param {number} color - Index of the color selected.
     * @returns {number|*} quantityOrdered - The quantity that the user ordered on the cart from the product received.
     */
    getQuantityOrdered(id, size, color) {
        const product = this.getProducts();
        let existentProduct = product.find(productLocalStorage => productLocalStorage.id === id && productLocalStorage.size === size && productLocalStorage.color === color);
        if (existentProduct) {
            return existentProduct.quantity;
        } else {
            return 0;
        }
    }

    async verifyStock(id, size, color, quantityRequired) {
        console.log(id);
        const product = await getElementByID(id, "products");
        const inStock = product.inStock;
        console.log(size)
        console.log(color)
        console.log(inStock[0][0]);
        return false;
        //return quantityRequired <= product.inStock[size][color];
    }
}