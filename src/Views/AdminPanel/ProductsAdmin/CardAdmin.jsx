import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "../../../css/AdminPanelStyle/MainPage/CardAdmin.css";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";

const CardAdmin = ({ _id, img, title, price }) => {
  const titleRef = useRef();
  const currency = "$";

  useEffect(() => {
    const titleElement = titleRef.current;

    if (title.length > 21) {
      titleElement.style.animationDuration = "3s";
      titleElement.classList.add("overflow-animation");
    } else {
      titleElement.style.animation = "none";
      titleElement.classList.remove("overflow-animation");
    }
  }, [title]);

  return (
    <div className="shopping-card-admin">
      <Link to="#" style={{ cursor: "auto" }}>
        <img src={img} alt={title} className="shopping-card-img-admin" />
      </Link>
      <div>
        <div className="flip-card-inner">
          <div className="shopping-card-flip-front">
            <Link to="#">
              <div
                ref={titleRef}
                className={`shopping-card-title-admin ${
                  title.length > 21 ? "overflow-animation" : ""
                }`}
              >
                {title.toUpperCase()}
              </div>
            </Link>
            <div className="shopping-card-price-admin">
              <div className="price">
                {currency}. {price}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="card-buttons">
        <div className="edit-button">
          <FaEdit color="white" /> Edit
        </div>
        <div className="delete-button" onClick={() => console.log("Sssss")}>
          <RiDeleteBin6Line color="white" /> Delete
        </div>
      </div>
    </div>
  );
};

export default CardAdmin;
