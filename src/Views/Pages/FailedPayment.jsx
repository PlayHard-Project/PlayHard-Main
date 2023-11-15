import React from "react";
import { Link } from "react-router-dom";
import "../../css/StatusPayment.css";

export default function FailedPayment() {
  return (
    <div className="sc-container">
      <label className="title">Payment Failure</label>
      <p>Something Went Wrong!</p>
      <img
        src="https://res.cloudinary.com/playhardimages/image/upload/v1700065770/wrong-payment-image_mztknp.png"
        alt="failureIcon"
      />
      <label>Thank you for your payment!  Your order has been processed, and you will receive an email confirmation shortly.</label>
      <style>
        @import
        url('https://fonts.googleapis.com/css2?family=Poppins:wght@800&display=swap');
      </style>
    </div>
  );
}
