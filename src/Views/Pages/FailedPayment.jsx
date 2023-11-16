import React from "react";
import { Link } from "react-router-dom";
import "../../css/StatusPayment.css";

export default function FailedPayment() {
  return (
    <div className="container">
      <div className="sc-container">
        <div className="text-container">
          <label className="title">Something Went Wrong!</label>
          <p>We apologize for the inconvenience, but an error occurred while processing your order request</p>
          <p>For Any Support Email: <a href="mailto:playhard.jala.support@gmail.com">playhard.jala.support@gmail.com</a></p>
          <Link to={"/home"}>
            <button className="sc-btn">Back to HomePage</button>
          </Link>{" "}
        </div>
        <img
          src="https://res.cloudinary.com/playhardimages/image/upload/v1700065770/wrong-payment-image_mztknp.png"
          alt="failureIcon"
        />
      </div>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@800&display=swap');
      </style>
    </div>
  );
}
