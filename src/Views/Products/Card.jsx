import React, { useEffect, useRef } from "react";
import "./Card.css";

const Card = ({ img, title, price }) => {
  const titleRef = useRef();

  useEffect(() => {
    const titleElement = titleRef.current;
    const titleLength = title.length;

    if (titleLength > 21) {
      const animationDuration = titleLength * 0.3 + "s"; // Adjust the multiplier as needed
      const animationDistance = titleLength * 0.5 + "rem"; // Adjust the multiplier as needed

      titleElement.style.animationDuration = animationDuration;
      titleElement.style.transform = `translateX(calc(-100% + ${animationDistance}))`;
      titleElement.classList.add("overflow-animation");
    } else {
      titleElement.style.animation = "none";
      titleElement.classList.remove("overflow-animation");
    }

    console.log("Title Length:", title.length);
  }, [title]);

  return (
    <>
      <div className="card">
        <img src={img} alt={title} className="card-img" />
        <div ref={titleRef} className={`card-title ${title.length > 21 ? "overflow-animation" : ""}`}>
          {title.toUpperCase()}
        </div>
        <div>
          <section className="card-price">
            <div className="price">Bs. {price}</div>
            <img src={"https://res.cloudinary.com/playhardimages/image/upload/v1700025053/cart-icon_b2wqdz.png"} className="bag"></img>
          </section>
        </div>
      </div>
    </>
  );
};

export default Card;
