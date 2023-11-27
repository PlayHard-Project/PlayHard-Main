// ShoppingHistory.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PurchaseComponent from "./PurchaseComponent";
import "../../css/PurchaseHistory.css";

const ShoppingHistory = () => {
  const [orders, setOrders] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [key, setKey] = useState(0);
  const idUser = "123";
  const noHistoryMessage = "No hay historial de compra.";

  const handleFilterClick = async () => {
    try {
      const apiUrl = selectedDate
        ? `http://localhost:9000/api/orders/user/${idUser}?date=${selectedDate.toISOString()}`
        : `http://localhost:9000/api/orders/user/${idUser}`;

      const response = await axios.get(apiUrl);
      setOrders(response.data);
      setKey((prevKey) => prevKey + 1);
    } catch (error) {
      console.error("Error al obtener las órdenes:", error);
    }
  };

  const handleClearDate = () => {
    setSelectedDate(null);
  };

  useEffect(() => {
    handleFilterClick();
  }, [idUser, selectedDate]);

  return (
    <div className="container">
      <section className="header-1">
        <h1>Shopping History</h1>
        <h2>
          User ID:<span>{idUser}</span>
        </h2>
      </section>
      <div className="datepicker-container">
        <DatePicker
          className="custom-datepicker"
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          dateFormat="yyyy-MM-dd"
          placeholderText="Select a date"
          // Añade el estilo para el DatePicker
          wrapperClassName="datepicker-wrapper"
        />
        {selectedDate && (
          <button
            className="clear-filter-button"
            onClick={handleClearDate}
            disabled={false}
          >
            Limpiar Fecha
          </button>
        )}
      </div>
      {orders.length === 0 ? (
        <p>{noHistoryMessage}</p>
      ) : (
        orders.map((order) => (
          <PurchaseComponent
            key={`${order._id + order.paymentIntentId}-${key}`}
            idOrder={order._id}
          />
        ))
      )}
    </div>
  );
};

export default ShoppingHistory;
