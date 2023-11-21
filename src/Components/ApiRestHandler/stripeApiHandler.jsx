import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import BuyCartManagement from "../../Utilities/BuyCartManagement";

export default function GoToCheckout() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const productsArray = await new BuyCartManagement().getProducts();
      setProducts(productsArray);
    };
    fetchData();
  }, []);

  const makePayment = async () => {
    try {
      const stripe = await loadStripe(
        "pk_test_51OCX2QHsWC39RHnvTHY4jNmDT18JHg9Vh1s0aJmuDtMPPzS4mjcOMU5gvO4Yj6mvPpGQ9yNFjEnxPx0ecl2c6QKo00xIEzm1lX"
      );

      const body = { products: products, userId: "123" };
      const headers = { "Content-Type": "application/json" };

      const response = await fetch(
        "http://localhost:9000/stripe-api/intent-payment",
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
      console.log(session);
      const result = await stripe.redirectToCheckout({ sessionId: session.id });

      if (result.error) {
        console.log(result.error);
      }
    } catch (error) {
      console.error("Error making payment:", error);
    }
  };

  return <button className="checkout-button" onClick={makePayment}>Checkout</button>;
}
