import React, {useEffect, useRef, useState} from "react";
import { Link } from "react-router-dom";
import "../../css/ShoppingCard.css";
import {getElementByID} from "../../Components/ApiRestHandler/requestHandler";
import BuyCartManagement from "../../Utilities/BuyCartManagement";

const Card = ({ _id, img, title, price, setCartItemsQuantity }) => {
  const titleRef = useRef();
  const currency = "$"
  const [product, setProduct] = useState(null);
  const [colorIndex, setColorIndex] = useState(0);
  const [sizeIndex, setSizeIndex] = useState(0);
  const buyCartManagement = new BuyCartManagement();

  const selectDefaultProduct = (event) => {
    buyCartManagement.addProduct(_id, 1, 0, 0)
    setCartItemsQuantity(buyCartManagement.getProducts().length)
  }

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

  useEffect(() => {
    getElementByID(_id, "/products")
        .then((data) => {
          setProduct(data);
        })
        .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <div className="shopping-card">
      <Link key={_id} to={`/product/${_id}`} >
        <img src={img} alt={title} className="shopping-card-img" />
          <div ref={titleRef} className={`shopping-card-title ${title.length > 21 ? "overflow-animation" : ""}`}>
            {title.toUpperCase()}
          </div>
      </Link>
        <div>
          <section className="shopping-card-price">
            <div className="price">{currency}. {price}</div>
            <img onClick={selectDefaultProduct} src={"https://res.cloudinary.com/playhardimages/image/upload/v1700025053/cart-icon_b2wqdz.png"} className="bag"></img>
          </section>
        </div>
      </div>
    </>
  );
};

export default Card;
