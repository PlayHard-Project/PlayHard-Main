import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "../../../css/AdminPanelStyle/MainPage/CardAdmin.css";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { updateElement } from "../../../Components/ApiRestHandler/requestHandler";
import BuyCartManagement from "../../../Utilities/BuyCartManagement";
import toast from "react-hot-toast";

const CardAdmin = ({
  product,
  refreshProducts,
  setCartItemsQuantity,
  setSubTotal,
  setProducts,
}) => {
  const buyCartManagement = new BuyCartManagement();
  const titleRef = useRef();
  const currency = "$";

  useEffect(() => {
    const titleElement = titleRef.current;

    if (product.name.length > 21) {
      titleElement.style.animationDuration = "3s";
      titleElement.classList.add("overflow-animation");
    } else {
      titleElement.style.animation = "none";
      titleElement.classList.remove("overflow-animation");
    }
  }, [product.name]);

  const deleteProduct = async () => {
    try {
      product.isAvailable = false;
      await updateElement(product, "products/");

      buyCartManagement.deleteProductNoSpecific(product._id);
      setCartItemsQuantity(buyCartManagement.getProducts().length);
      const subtotal = await buyCartManagement.getSubTotal();
      setSubTotal(subtotal);

      await new Promise((resolve) => {
        setProducts((prevProducts) => {
          const updatedProducts = prevProducts.filter(
            (p) => p._id !== product._id
          );
          resolve(updatedProducts);
          return updatedProducts;
        });
      });
      toast.success("Excellent! The product has been successfully removed.");

      refreshProducts();
    } catch (error) {
      toast.error("Oops! The product has not been removed.");
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div className="shopping-card-admin">
      <Link to="#" style={{ cursor: "auto" }}>
        <img
          src={product.imagePath[0]}
          alt={product.name}
          className="shopping-card-img-admin"
        />
      </Link>
      <div>
        <div className="flip-card-inner">
          <div className="shopping-card-flip-front">
            <Link to="#">
              <div
                ref={titleRef}
                className={`shopping-card-title-admin ${
                  product.name.length > 21 ? "overflow-animation" : ""
                }`}
              >
                {product.name.toUpperCase()}
              </div>
            </Link>
            <div className="shopping-card-price-admin">
              <div className="price">
                {currency}. {product.price}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="card-buttons">
        <div className="edit-button">
          <FaEdit color="white" /> Edit
        </div>
        <div className="delete-button" onClick={deleteProduct}>
          <RiDeleteBin6Line color="white" /> Delete
        </div>
      </div>
    </div>
  );
};

export default CardAdmin;
