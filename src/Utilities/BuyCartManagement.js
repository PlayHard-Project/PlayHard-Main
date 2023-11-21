
import ProductEntity from '../Entities/ProductEntity'
import {getElementByID} from "../Components/ApiRestHandler/requestHandler";

export default class BuyCartManagement {
    getProducts() {
        const products = localStorage.getItem('buyCart');
        return products ? JSON.parse(products).map(product => new ProductEntity(product.id, product.quantity, product.size, product.color)) : [];
    }

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

    clearCard() {
        localStorage.clear();
    }

    deleteProduct(id, size, color) {
        let products = this.getProducts();
        products = products.filter(product => !(product.id === id && product.size === size && product.color === color));
        localStorage.setItem('buyCart', JSON.stringify(products));
    }

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

    incrementQuantity(id, size, color) {
        const products = this.getProducts();
        const existingProduct = products.find(product => product.id === id && product.size === size && product.color === color);

        if (existingProduct) {
            existingProduct.quantity += 1;
            localStorage.setItem('buyCart', JSON.stringify(products));
        }
    }

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
                throw error; // You may want to handle the error accordingly
            });
    }
}