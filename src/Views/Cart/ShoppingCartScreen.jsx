import React, { useState, useEffect } from "react";
import "../../css/CartShop.css";

const ShoppingCartScreen = ({ cartItemsQuantity }) => {
  const [rectangles, setRectangles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const maxRectangles = 10;

  useEffect(() => {
    const addRectangle = () => {
      setRectangles((prevRectangles) => {
        if (prevRectangles.length < maxRectangles) {
          return [
            ...prevRectangles,
            <div key={prevRectangles.length} className="blue-rectangle-screen"></div>,
          ];
        }
        return prevRectangles;
      });
    };

    const intervalId = setInterval(() => {
      setIsLoading(true);
      addRectangle();
      setTimeout(() => {
        setIsLoading(false);
      }, 5000);
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (
      <div className="CartShopContainer container mb-16">
        <div className="modal-header">
          <div className="title-cart-screen">My Cart</div>
        </div>
        <div className="scrollable-section">
          {rectangles.length === 0 ? (
              <p className="mr-4 mt-14 font-extrabold justify-center align-middle">The cart is empty</p>
          ) : (
              <>
                {rectangles}
                {isLoading && <div className="loader"></div>}
              </>
          )}
        </div>

        <div className="cart-details">
          <div className="cart-detail-row">
            <span>Subtotal</span>
            <span>$1111</span>
          </div>
          <div className="cart-detail-row">
            <span>Shipping Cost</span>
            <span>$1</span>
          </div>
          <hr />
          <div className="cart-detail-row total">
            <span>Total</span>
            <span>$1112</span>
          </div>
        </div>
        <button className="checkout-button">Checkout</button>
      </div>
  );
};

export default ShoppingCartScreen;