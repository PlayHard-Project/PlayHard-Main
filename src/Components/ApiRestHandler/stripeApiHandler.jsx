import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import BuyCartManagement from "../../Utilities/BuyCartManagement";
import "../../css/CartShop.css";
import { getUserID } from "../../Utilities/auth";
import useLocalStorage from "../../Utilities/useLocalStorage";

export default function GoToCheckout({ disabled, products}) {
  const idUser = getUserID();
  const [isPaymentProcessing, setIsPaymentProcessing] = useState(false);
  const buyCartManager = new BuyCartManagement();
  const [isActive] = useLocalStorage("sendEmailSettings", true);

  const makePayment = async () => {
    try {
      setIsPaymentProcessing(true);

      if (products.length === 0) {
        products = buyCartManager.getProducts();
      }
      
      const verification = await buyCartManager.verifyGeneralStock();
      if (verification) {
        localStorage.setItem("reversible", true);
        buyCartManager.madePurchase();
        const stripe = await loadStripe(
          "pk_test_51OCX2QHsWC39RHnvTHY4jNmDT18JHg9Vh1s0aJmuDtMPPzS4mjcOMU5gvO4Yj6mvPpGQ9yNFjEnxPx0ecl2c6QKo00xIEzm1lX"
        );

        const body = {
          products: products,
          userId: idUser,
          isAvailableEmail: isActive,
        };
        const headers = { "Content-Type": "application/json" };
        const response = await fetch(
          "https://backend-fullapirest.onrender.com/stripe-api/intent-payment",
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
        const result = await stripe.redirectToCheckout({
          sessionId: session.id,
        });

        if (result.error) {
          console.log(result.error);
        }
      }
      setIsPaymentProcessing(false);
    } catch (error) {
      console.error("Error making payment:", error);
      setIsPaymentProcessing(false);
    }
  };

  return (
    <button
      className={`checkout-button ${
        disabled || isPaymentProcessing ? "disabled" : ""
      }`}
      onClick={makePayment}
      disabled={disabled || isPaymentProcessing}
    >
      Checkout
    </button>
  );
}
