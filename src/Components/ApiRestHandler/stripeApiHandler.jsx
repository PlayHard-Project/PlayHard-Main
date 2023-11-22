import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import BuyCartManagement from "../../Utilities/BuyCartManagement";

// Functional component for the checkout button
export default function GoToCheckout({ disabled }) {
  const [products, setProducts] = useState([]);

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

      const body = { products: products, userId: "123" };
      const headers = { "Content-Type": "application/json" };

      const response = await fetch(
<<<<<<< HEAD
        "http://localhost:9000/stripe-api/intent-payment",
        {
          method: "POST",
          headers: headers,
          body: JSON.stringify(body),
        }
=======
          "https://backend-fullapirest-test.onrender.com/stripe-api/intent-payment",
          {
            method: "POST",
            headers: headers,
            body: JSON.stringify(body),
          }
>>>>>>> develop
      );

      if (!response.ok) {
        throw new Error(`Server returned status ${response.status}`);
      }

      const session = await response.json();
      console.log(session);
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