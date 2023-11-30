import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import BuyCartManagement from "../../Utilities/BuyCartManagement";
import ProductEntityForStripe from "../../Entities/ProductEntity";
import '../../css/CartShop.css';
import toast from "react-hot-toast";
import {getElementByID} from "./requestHandler";
import { getUserID } from "../../Utilities/auth";

export default function GoToCheckout({ disabled }) {
  const idUser = getUserID();
  const [products, setProducts] = useState([]);
  const [isPaymentProcessing, setIsPaymentProcessing] = useState(false);
  const buyCartManager = new BuyCartManagement();

  useEffect(() => {
    const fetchData = async () => {
      const productsArray = await new BuyCartManagement().getProducts();
      setProducts(productsArray);
    };
    fetchData();
  }, []);


  const makePayment = async () => {
    try {
        setIsPaymentProcessing(true);
        setProducts(buyCartManager.getProducts);

        const verification = await  buyCartManager.verifyGeneralStock();
        if (verification) {
            const stripe = await loadStripe(
                "pk_test_51OCX2QHsWC39RHnvTHY4jNmDT18JHg9Vh1s0aJmuDtMPPzS4mjcOMU5gvO4Yj6mvPpGQ9yNFjEnxPx0ecl2c6QKo00xIEzm1lX"
            );

            const body = { products: products, userId: idUser };
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
            } else {
                localStorage.setItem("reversible", true);
                if (buyCartManager.madePurchase()) {

                }
            }

            const session = await response.json();
            const result = await stripe.redirectToCheckout({ sessionId: session.id });

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
      className={`checkout-button ${disabled || isPaymentProcessing ? "disabled" : ""}`}
      onClick={makePayment}
      disabled={disabled || isPaymentProcessing}
    >
      Checkout
    </button>
  );
}
