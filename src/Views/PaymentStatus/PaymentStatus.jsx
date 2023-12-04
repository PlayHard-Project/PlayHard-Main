import React from "react";
import { Link } from "react-router-dom";
import "../../css/StatusPayment.css";

const PaymentStatus = ({ title, description, imageSrc, altText, isSuccess }) => {
  const buttonColor = isSuccess ? "green" : "red";

  return (
    <div className="container xl:h-screen xl:flex xl:justify-center xl:items-center">
      <div className="sc-container">
        <div className="text-container_payment">
          <label className="title">{title}</label>
          <p>{description}</p>
          <p>
            For Any Support Email:{" "}
            <a className="link" href="mailto:playhard.jala.support@gmail.com">
              playhard.jala.support@gmail.com
            </a>
          </p>
          <Link to={"/"}>
            <button
              className="sc-btn"
              style={{ background: buttonColor }}
            >
              Back to HomePage
            </button>
          </Link>{" "}
        </div>
        <img src={imageSrc} alt={altText} />
      </div>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@800&display=swap');
      </style>
    </div>
  );
};

export default PaymentStatus;
