import React, { useState, useEffect } from "react";
import { getElementByID } from "../../Components/ApiRestHandler/requestHandler";
import CartComponent from "./CartComponent";
import "../../css/PurchaseComponent.css";
import { GridLoader } from "react-spinners";

export default function PurchaseComponent({ idOrder }) {
  const [order, setOrder] = useState(null);
  const [date, setDate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchOrder = async () => {
      setLoading(true);
      try {
        const orderC = await getElementByID(idOrder, "/orders");

        const inputDate = orderC.date;
        const dateObject = new Date(inputDate);
        dateObject.setDate(dateObject.getDate() + 1);
        const options = { year: "numeric", month: "short", day: "numeric" };
        const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
          dateObject
        );

        setOrder(orderC);
        setDate(formattedDate);
      } catch (e) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [idOrder]);

  return (
    <div className="purchase-component">
      {loading ? (
        <div
          className={
            "flex flex-col justify-center p-3 gap-16 lg:flex-row lg:items-center container"
          }
        >
          <GridLoader color="#023fc5" />
        </div>
      ) : error || !order ? (
        <span>Error loading order.</span>
      ) : (
        <section className="purchase-section">
          <div className="text-container1">
            <div className="header-container">
              <h2 className="header-1">Payment ID:</h2>
            </div>
            <div className="result-container">
              <label className="result-1">{order._id}</label>
            </div>
          </div>
          <div className="text-container1">
            <h2 className="header-1">Date:</h2>
            <label className="result-1">{date}</label>
          </div>
          <div className="scroll-container">
            {order.products.map((productFromOrder) => (
              <CartComponent
                key={order.paymentIntentId + productFromOrder.color}
                productFromOrder={productFromOrder}
                color={productFromOrder.color}
              />
            ))}
          </div>
          <div className="text-container1">
            <h2 className="header-1">Total cost of all purchases:</h2>
            <label className="result-1">{"$ " + order.total}</label>
          </div>
        </section>
      )}
    </div>
  );
}
