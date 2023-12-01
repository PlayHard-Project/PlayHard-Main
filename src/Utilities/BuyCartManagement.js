import ProductEntity from "../Entities/ProductEntity";
import {
  getElementByID,
  updateElement,
} from "../Components/ApiRestHandler/requestHandler";
import toast from "react-hot-toast";

/**
 * This class is in charge of management of the cart items stored in the localStorage.
 */
export default class BuyCartManagement {
  /**
   * This method obtains all products stored in the localStorage.
   * @returns {*|*[]} products - array of objects that contain the information of each product in the cart.
   */
  getProducts() {
    const products = localStorage.getItem("buyCart");
    return products
      ? JSON.parse(products).map(
          (product) =>
            new ProductEntity(
              product.id,
              product.quantity,
              product.size,
              product.color,
              product.price
            )
        )
      : [];
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
  addProduct(id, quantity, size, color, price) {
    const products = this.getProducts();
    let existingProduct = products.find(
      (product) =>
        product.id === id &&
        product.size === size &&
        product.color === color &&
        product.price === price
    );

    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      existingProduct = new ProductEntity(id, quantity, size, color, price);
      products.push(existingProduct);
    }

    localStorage.setItem("buyCart", JSON.stringify(products));
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
  deleteProduct(id, size, color, price) {
    let products = this.getProducts();
    products = products.filter(
      (product) =>
        !(
          product.id === id &&
          product.size === size &&
          product.color === color &&
          product.price === price
        )
    );
    localStorage.setItem("buyCart", JSON.stringify(products));
  }

  /**
   * This method delete a product.
   *
   * @param {string} id - Product identifier, related with database ID.
   */
  deleteProductNoSpecific(id) {
    let products = this.getProducts();
    products = products.filter((product) => !(product.id === id));
    localStorage.setItem("buyCart", JSON.stringify(products));
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
    const existingProduct = products.find(
      (product) =>
        product.id === id && product.size === size && product.color === color
    );

    existingProduct.quantity -= 1;
    localStorage.setItem("buyCart", JSON.stringify(products));
  }

  /**
   * This method increment the quantity ordered of a product in specific.
   * Increment one by one.
   *
   * @param {string} id - Product identifier, related with database ID.
   * @param {number} size - Index of the size selected.
   * @param {number} color - Index of the color selected.
   */
  incrementQuantity(id, size, color, price) {
    const products = this.getProducts();
    const existingProduct = products.find(
      (product) =>
        product.id === id &&
        product.size === size &&
        product.color === color &&
        product.price === price
    );

    existingProduct.quantity += 1;
    localStorage.setItem("buyCart", JSON.stringify(products));
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

    products.forEach((product) => {
      const elementPromise = getElementByID(product.id, "products");
      promises.push(elementPromise);

      elementPromise.then((item) => {
        subTotal += item.price * product.quantity;
      });
    });

    return Promise.all(promises)
      .then(() => subTotal)
      .catch((error) => {
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
    let existentProduct = product.find(
      (productLocalStorage) =>
        productLocalStorage.id === id &&
        productLocalStorage.size === size &&
        productLocalStorage.color === color
    );
    if (existentProduct) {
      return existentProduct.quantity;
    } else {
      return 0;
    }
  }

  async verifyStock(id, size, color, quantityRequired) {
    const product = await getElementByID(id, "products");
    const inStock = product.inStock[size][color];
    if (quantityRequired === inStock) {
      return true;
    } else return quantityRequired < inStock;
  }

  async verifyGeneralStock() {
    const promisesCheck = await Promise.all(
      this.getProducts().map(async (product) => {
        const productFromDB = await getElementByID(product.id, "products");
        const inStock =
          productFromDB.inStock[product.size][product.color] >=
          product.quantity;
        if (!inStock) toast.error(`${productFromDB.name} out stock.`);
        return inStock;
      })
    );

    return !promisesCheck.includes(false);
  }

  madePurchase() {
    this.getProducts().map(async (product) => {
      const productFromDB = await getElementByID(product.id, "products");
      productFromDB.inStock[product.size][product.color] -= product.quantity;
      await updateElement(productFromDB, "products/");
    });
  }

  async revertPurchase() {
    this.getProducts().map(async (product) => {
      const productFromDB = await getElementByID(product.id, "products");
      productFromDB.inStock[product.size][product.color] += product.quantity;
      await updateElement(productFromDB, "products/");
    });
  }
}
