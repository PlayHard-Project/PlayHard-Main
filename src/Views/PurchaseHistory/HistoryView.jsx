import React, { useState, useEffect } from "react";
import axios from "axios";
import PurchaseComponent from "./PurchaseComponent";
import '../../css/PurchaseHistory.css'

export default function ShoppingHistory() {
  const [orders, setOrders] = useState([]);
  const idUser = "123";

  useEffect(() => {
    axios
      .get(`http://localhost:9000/api/orders/user/${idUser}`)
      .then((response) => {
        setOrders(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener las órdenes:", error);
      });
  }, [idUser]);

  return (
    <div className="container">
      <section className="header-1">
        <h1>Shopping History</h1>
        <h2>User ID:<span>{idUser}</span></h2>
      </section>
      {orders.map((order) => (
        <PurchaseComponent key={order._id} idOrder={order._id} />
      ))}
    </div>
  );
}
