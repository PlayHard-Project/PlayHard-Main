import { Link } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { getElementByID } from "../../Components/ApiRestHandler/requestHandler";
import { useEffect, useState } from "react";
import BuyCartManagement from "../../Utilities/BuyCartManagement";
import ProductEntityForStripe from "../../Entities/ProductEntityForStripe";

{
  /* BORRAR ESTE COMPONENTE, SOLO ESTA PARA EL TESTEO*/
}
export function ProductButtonsD() {
  const manager = new BuyCartManagement();
  const productsArray = manager.getProducts();

  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
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
          console.log(productToSendTheServer);
          return productToSendTheServer;
        })
      );

      setProducts(updatedProducts);
      console.log(updatedProducts + " CDFGERGRGTR");
    };

    fetchData();
  }, []);

  const makePayment = async () => {
    const stripe = await loadStripe(
      "pk_test_51OCX2QHsWC39RHnvTHY4jNmDT18JHg9Vh1s0aJmuDtMPPzS4mjcOMU5gvO4Yj6mvPpGQ9yNFjEnxPx0ecl2c6QKo00xIEzm1lX"
    );

    const body = {
      products: products,
    };

    const headers = {
      "Content-Type": "application/json",
    };

    try {
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

      console.log("Session ID:", session.id);

      const result = stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        console.log(result.error);
      }
    } catch (error) {
      console.error("Error making payment:", error);
    }
  };

  return (
    <div
      className={
        "flex flex-col gap-6 items-center text-center justify-center max-w-7xl"
      }
    >
      <Link to={"/PaymentStatus1"}>
        <button className={"bg-blue-500 p-5"}>Ir al estado de pago Fail</button>
      </Link>
      <Link to={"/PaymentStatus2"}>
        <button className={"bg-blue-500 p-5"}>
          Ir al estado de pago Successful
        </button>
      </Link>
      <button onClick={makePayment}>Checkout</button>
    </div>
  );
}
