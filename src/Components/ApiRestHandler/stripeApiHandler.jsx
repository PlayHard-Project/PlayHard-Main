import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { getElementByID } from "./requestHandler";
import BuyCartManagement from "../../Utilities/BuyCartManagement";
import ProductEntityForStripe from "../../Entities/ProductEntityForStripe";
import '../../css/CartShop.css';
import toast from "react-hot-toast";

// Functional component for the checkout button
export default function GoToCheckout({ disabled }) {
  const [products, setProducts] = useState([]);
  const buyCartManager = new BuyCartManagement();

  // Fetch products and format them when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      const productsArray = await new BuyCartManagement().getProducts();

      const updatedProducts = await Promise.all(
          productsArray.map(async (product) => {
            const productFromAPI = await getElementByID(product.id, "products");
            const productToSendTheServer = new ProductEntityForStripe(
                product.id,
                productFromAPI.name,
                Math.round(productFromAPI.price * 100),
                product.quantity,
                productFromAPI.description,
                productFromAPI.imagePath
            );
            return productToSendTheServer;
          })
      );

      setProducts(updatedProducts);
    };
    fetchData();
  }, []);

  // Function to handle the payment process
  const makePayment = async () => {
    try {
        const stripe = await loadStripe(
          "pk_test_51OCX2QHsWC39RHnvTHY4jNmDT18JHg9Vh1s0aJmuDtMPPzS4mjcOMU5gvO4Yj6mvPpGQ9yNFjEnxPx0ecl2c6QKo00xIEzm1lX"
        );

        products.forEach(item => {
            let inStock = buyCartManager.verifyStock(item.id, item.size, item.color, item.quantity)
            if (!inStock) {
                toast.error(`${item.name} was purchased and now we don't have enough stock.`)
                throw new Error(`Product ID: ${item.id} insufficient stock` )
            }
        })
      const body = { products: products };
      const headers = { "Content-Type": "application/json" };

      const response = await fetch(
          "https://backend-fullapirest-test.onrender.com/stripe-api/intent-payment",
          {
            method: "POST",
            headers: headers,
            body: JSON.stringify(body),
          }
      );

      if (!response.ok) {
        throw new Error(`Server returned status ${response.status}`);
      }

      const session = await response.json();
      const result = await stripe.redirectToCheckout({ sessionId: session.id });

      if (result.error) {
        console.log(result.error);
      }
    } catch (error) {
      console.error("Error making payment:", error);
    }
  };

  // Render the checkout button
  return (
      <button
          className={`checkout-button ${disabled ? "disabled" : ""}`}
          onClick={makePayment}
          disabled={disabled}
      >
        Checkout
      </button>
  );
}