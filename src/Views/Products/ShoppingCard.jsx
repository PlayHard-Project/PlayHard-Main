import React, { useEffect, useRef } from "react";
import "./ShoppingCard.css";

const Card = ({ img, title, price }) => {
  const titleRef = useRef();
  useEffect(() => {
    const titleElement = titleRef.current;
    const titleLength = title.length;

    if (titleLength > 21) {
      titleElement.style.animationDuration = 3 + "s";
      titleElement.classList.add("overflow-animation");
    } else {
      titleElement.style.animation = "none";
      titleElement.classList.remove("overflow-animation");
    }
  }, []);

  return (
    <>
      <div className="shopping-card">
        <img src={img} alt={title} className="shopping-card-img" />
        <div ref={titleRef} className={`shopping-card-title ${title.length > 21 ? "overflow-animation" : ""}`}>
          {title.toUpperCase()}
        </div>
        <div>
          <section className="shopping-card-price">
            <div className="price">Bs. {price}</div>
            <img src={"https://res.cloudinary.com/playhardimages/image/upload/v1700025053/cart-icon_b2wqdz.png"} className="bag"></img>
          </section>
        </div>
      </div>
    </>
  );
};

export default Card;
