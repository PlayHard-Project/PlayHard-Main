import React, { useState, useEffect } from "react";
import { getElementByID } from "../../Components/ApiRestHandler/requestHandler";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { GridLoader } from "react-spinners";
import CartComponent from "./CartComponent";
import "../../css/PurchaseComponent.css";

export default function PurchaseComponent({ idOrder, indexOrder }) {
  const [order, setOrder] = useState(null);
  const [date, setDate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [scrollContainerVisible, setScrollContainerVisible] = useState(false);

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
          <div className="header-section">
            <div>
              <div className="text-container1">
                <h2 className="header-title-sub">Order Nº:</h2>
                <label>{indexOrder + 1}</label>
              </div>
              <div className="text-container1">
                <h2 className="header-title-sub">Date:</h2>
                <label>{date}</label>
              </div>
            </div>
            <button
              onClick={() => setScrollContainerVisible(!scrollContainerVisible)}
            >
              <IoIosArrowDropdownCircle />
            </button>
          </div>
          <div
            className={`scroll-container ${
              scrollContainerVisible ? "expanded" : ""
            }`}
          >
            {order.products.map((productFromOrder) => (
              <CartComponent
                key={order.paymentIntentId + productFromOrder.color}
                productFromOrder={productFromOrder}
                color={productFromOrder.color}
              />
            ))}
          </div>
          <div className="text-container-total">
            <h2 className="header-title-sub">Total cost of all purchases:</h2>
            <label>{"$ " + order.total}</label>
          </div>
        </section>
      )}
    </div>
  );
}
