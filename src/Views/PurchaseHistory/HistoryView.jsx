import React, { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PurchaseComponent from "./PurchaseComponent";
import { FaRegTrashAlt, FaCalendarAlt } from "react-icons/fa"
import { getUserID, getUsername, getEmail } from "../../Utilities/auth";

import "../../css/PurchaseHistory.css";

const ShoppingHistory = () => {
  const [orders, setOrders] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [key, setKey] = useState(0);
  const [isLoading, setIsLoading] = useState(false); 
  const idUser = getUserID();

  const handleFilterClick = async () => {
    try {
      setIsLoading(true);

      let apiUrl = `https://backend-fullapirest.onrender.com/api/orders/user/${idUser}`;

      if (selectedDate) {
        const dateWithoutTime = new Date(selectedDate);
        dateWithoutTime.setUTCHours(0, 0, 0, 0);
        apiUrl += `?date=${dateWithoutTime.toISOString()}`;
      }

      const response = await axios.get(apiUrl);
      setOrders(response.data);
      setKey((prevKey) => prevKey + 1);
    } catch (error) {
      console.error("Error al obtener las órdenes:", error);
    } finally {
      setIsLoading(false);
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
        <div className="header-text">
          <h1>Shopping History</h1>
          <h2>
            Username:<span>{getUsername()}</span>
          </h2>
          <h2>
            Email:<span>{getEmail()}</span>
          </h2>
        </div>
        <div className="datepicker-container">
          <DatePicker
            className="custom-datepicker"
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            dateFormat="yyyy-MM-dd"
            placeholderText="Select a date"
            wrapperClassName="datepicker-wrapper"
          />
          <button
            className="clear-filter-button"
            onClick={handleClearDate}
            disabled={!selectedDate}
          >
            {selectedDate ? <FaRegTrashAlt /> : <FaCalendarAlt />}
          </button>
        </div>
      </section>
      <div className="content-container">
        {orders.length === 0 && !isLoading && (
          <div className="no-history-message-container">
            <label className="title-no-p"> NO PURCHASES FOUND</label>
            <img
              className="no-history-icon"
              src="https://res.cloudinary.com/playhardimages/image/upload/v1701056416/m42rcrshbzghceiqkyut.png"
              alt="no-found-purchase.png"
            />
            <p className="no-history-text">
              Oops! There is no purchase made on that date.
            </p>
          </div>
        )}
        {orders.map((order, index) => (
          <PurchaseComponent
            key={`${order._id}-${index}`}
            indexOrder={index}
            idOrder={order._id}
          />
        ))}
      </div>
    </div>
  );
};

export default ShoppingHistory;
