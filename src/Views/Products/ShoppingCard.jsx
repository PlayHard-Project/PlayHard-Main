import React, {useEffect, useRef, useState} from "react";
import { Link } from "react-router-dom";
import "../../css/ShoppingCard.css";
import BuyCartManagement from "../../Utilities/BuyCartManagement";

const Card = ({ _id, img, title, price, colorInformation, size, setCartItemsQuantity, setSubTotal }) => {
  const titleRef = useRef();
  const currency = "$"
  const [colorIndex, setColorIndex] = useState(-1);
  const [sizeIndex, setSizeIndex] = useState(-1);
  const buyCartManagement = new BuyCartManagement();
  const [isFlipped, setIsFlipped] = useState(false);
  const [selectedColorButton, setSelectedColorButton] = useState(null);
  const [selectedSizeButton, setSelectedSizeButton] = useState(null);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleColorButtonClick = (buttonNumber) => {
    setSelectedColorButton(buttonNumber === selectedColorButton ? null : buttonNumber);
  };

  const handleSizeButtonClick = (buttonNumber) => {
    setSelectedSizeButton(buttonNumber === selectedSizeButton ? null : buttonNumber);
  };

  const addProductFromCart = ( _id, size, color ) => {
    buyCartManagement.addProduct(_id, 1, size, color);
    setCartItemsQuantity(buyCartManagement.getProducts().length);
    const subTotalPromise = buyCartManagement.getSubTotal();
    subTotalPromise.then((element) => {
      setSubTotal(element);
    });
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

  return (
    <>
      <div className="shopping-card">
        <Link key={_id} to={`/product/${_id}`} >
          <img src={img} alt={title} className="shopping-card-img" />
        </Link>
        <div className={`flip-card ${
            isFlipped ? "flipped" : ""
        }`}>
            <div className="flip-card-inner">
              <div className="shopping-card-flip-front">
                <Link key={_id} to={`/product/${_id}`} >
                  <div ref={titleRef} className={`shopping-card-title ${title.length > 21 ? "overflow-animation" : ""}`}>
                    {title.toUpperCase()}
                  </div>
                </Link>
                <div className="shopping-card-price">
                  <div className="price">{currency}. {price}</div>
                  <img alt="shopping cart icon" onClick={handleFlip} src={"https://res.cloudinary.com/playhardimages/image/upload/v1700025053/cart-icon_b2wqdz.png"} className="shopping-bag"></img>
                </div>
              </div>
              <div className="shopping-card-flip-back">
                <div className="card-content">
                  <div>
                    <section className="card-colors">
                      {colorInformation.map((item, index) => (
                          <div style={{ backgroundColor: item.hex }} className={`color-button ${index === selectedColorButton ? 'selected' : ''}`} onClick={() => {
                            if (index !== colorIndex) {
                              setColorIndex(index);
                              handleColorButtonClick(index);
                              if (sizeIndex !== -1) {
                                setIsFlipped(!isFlipped);
                                addProductFromCart(_id, sizeIndex, index);
                                setSizeIndex(-1);
                                setColorIndex(-1);
                                setSelectedColorButton(null);
                                setSelectedSizeButton(null);
                              }
                            }
                          }}>+
                          </div>
                      ))}
                    </section>
                    <section className="card-size">
                      {size.map((item, index) => (
                          <div className={`size-button ${index === selectedSizeButton ? 'selected' : ''}`} onClick={() => {
                            if (index !== sizeIndex) {
                              setSizeIndex(index);
                              handleSizeButtonClick(index);
                              if (colorIndex !== -1) {
                                setIsFlipped(!isFlipped)
                                addProductFromCart(_id, index, colorIndex);
                                setSizeIndex(-1);
                                setColorIndex(-1);
                                setSelectedSizeButton(null);
                                setSelectedColorButton(null);
                              }
                            }
                          }}>
                            {item}
                          </div>
                      ))}
                    </section>
                  </div>
                </div>
              </div>
            </div>
        </div>
      </div>
    </>
  );
};

export default Card;
