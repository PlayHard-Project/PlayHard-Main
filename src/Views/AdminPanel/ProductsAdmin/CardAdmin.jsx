import React, {useEffect, useRef} from "react";
import { Link } from "react-router-dom";
import "../../../css/AdminPanelStyle/MainPage/CardAdmin.css";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";

/**
 * CardAdmin Component
 * 
 * This component represents a card used in an admin panel, typically for managing products.
 * It displays product information such as an image, title, and price.
 * The title has an overflow animation if its length exceeds a certain limit.
 * The card also provides buttons for editing and deleting the product.
 * 
 * @param {string} _id - The unique identifier for the product.
 * @param {string} img - The URL of the product image.
 * @param {string} title - The title of the product.
 * @param {number} price - The price of the product.
 * @param {string} colorInformation - Additional information about the product color (not used in the component).
 * @param {string} size - Additional information about the product size (not used in the component).
 * @param {function} setCartItemsQuantity - A function to set the quantity of items in the cart (not used in the component).
 * @param {function} setSubTotal - A function to set the subtotal of the cart (not used in the component).
 */
const CardAdmin = ({ _id, img, title, price, colorInformation, size, setCartItemsQuantity, setSubTotal }) => {
  const titleRef = useRef();
  const currency = "$"

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
      <div className="shopping-card-admin">
        <Link key={_id} style={{cursor: 'auto'}}>
          <img src={img} alt={title} className="shopping-card-img-admin" />
        </Link>
        <div>
            <div className="flip-card-inner">
              <div className="shopping-card-flip-front">
                <Link key={_id} >
                  <div ref={titleRef} className={`shopping-card-title-admin ${title.length > 21 ? "overflow-animation" : ""}`}>
                    {title.toUpperCase()}
                  </div>
                </Link>
                <div className="shopping-card-price-admin">
                  <div className="price">{currency}. {price}</div>
                </div>
              </div>
            </div>
        </div>
        <div className="card-buttons">
          <button className="edit-button">
            <Link to={`/admin/add-product/${_id}`}>
              <FaEdit color="white" /> Edit
            </Link>
          </button>
          <div className="delete-button">
            <RiDeleteBin6Line color="white" /> Delete
          </div>         
      </div>
      </div>
    </>
  );
};

export default CardAdmin;
