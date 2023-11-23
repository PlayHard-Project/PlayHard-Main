import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PurchaseComponent from './PurchaseComponent';

export default function ShoppingHistory() {
  const [orders, setOrders] = useState([]);
  const idUser = "1233";

  useEffect(() => {
    axios.get(`https://backend-fullapirest.onrender.com/orders/user/${idUser}`)
      .then(response => {
        setOrders(response.data);
      })
      .catch(error => {
        console.error('Error al obtener las órdenes:', error);
      });
  }, [idUser]);

  return (
    <div>
      <section>
        <h1>Shopping History</h1>
        <h2>User Name: {/* Add user name here */}</h2>
        <h2>User ID: {idUser}</h2>
      </section>
      {orders.map(order => (
        <PurchaseComponent key={order._id} idOrder={order._id} />
      ))}
    </div>
  );
}
