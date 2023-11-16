import React from "react";
import { Link } from "react-router-dom";
import "../../css/StatusPayment.css";

export default function FailedPayment() {
  return (
    <div className="container">
      <div className="sc-container">
        <div className="text-container">
          <label className="title">Payment Successful!</label>
          <p>Thank you for your payment! We're pleased to confirm that your transaction was successful. You will receive an email confirmation shortly.</p>
          <p>For Any Support Email: <a href="mailto:playhard.jala.support@gmail.com">playhard.jala.support@gmail.com</a></p>
          <Link to={"/home"}>
            <button className="sc-btn">Back to HomePage</button>
          </Link>{" "}
        </div>
        <img
          src="https://res.cloudinary.com/playhardimages/image/upload/v1700065902/good-payment-image_zwp0tv.png"
          alt="failureIcon"
        />
      </div>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@800&display=swap');
      </style>
    </div>
  );
}
