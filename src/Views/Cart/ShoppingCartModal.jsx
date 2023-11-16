import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import "../../css/CartDropdownStyle.css";
import BuyCartManagement from "../../Utilities/BuyCartManagement";
import ItemCart from "./ItemCart";
import {MdShoppingCart} from "react-icons/md";
import {getElementByID} from "../../Components/ApiRestHandler/requestHandler";

Modal.setAppElement("#root");

const ShoppingCartModal = ({ isOpen, onRequestClose, modalRef, onRequestOpen, cartItemsQuantity, setCartItemsQuantity, setSubTotal, subtotal}) => {
    const currency = "$"
    const [shippingCost, setShippingCost] = useState(0);
    const [total, setTotal] = useState(0);
    const [rectangles, setRectangles] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const maxRectangles = 10;

    const buyCartManagement = new BuyCartManagement();
    const items = buyCartManagement.getProducts();

    useEffect(() => {
        const handleOutsideClick = (e) => {
            if (
                isOpen &&
                modalRef &&
                modalRef.current &&
                e.target instanceof Node &&
                !modalRef.current.contains(e.target) &&
                !e.target.closest('.modal-content')
            ) {
                onRequestClose();
            }
        };

        document.addEventListener("mousedown", handleOutsideClick);

        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, [isOpen, onRequestClose, modalRef]);

    return (
        <div ref={modalRef}>
            {
                !isOpen ? (
                    <div
                        id="shoppingButton"
                        className="relative lg:flex hidden transform scale-100 hover:scale-110 transition-transform duration-300"
                        style={{ cursor: "pointer" }}
                    >
                        <MdShoppingCart onClick={onRequestOpen} size={30} color="#72a3ff" />
                        <span className="bg-red-500 text-white absolute top-0 right-0 w-4 h-4 flex
                            items-center justify-center rounded-full" onClick={onRequestOpen}>{cartItemsQuantity}
                        </span>
                    </div>
                ) : (
                    <div
                        id="shoppingButton"
                        className="relative lg:flex hidden transform scale-100 hover:scale-110 transition-transform duration-300"
                        style={{ cursor: "pointer" }}
                    >
                        <MdShoppingCart onClick={onRequestClose} size={30} color="#72a3ff" />
                        <span className="bg-red-500 text-white absolute top-0 right-0 w-4 h-4 flex
                      items-center justify-center rounded-full" onClick={onRequestClose}>{cartItemsQuantity}
              </span>
                    </div>
                )
            }

            <Modal
                isOpen={isOpen}
                onRequestClose={onRequestClose}
                className="modal-content"
                overlayClassName="modal-overlay"
                shouldCloseOnOverlayClick={false}
            >
                <div>
                    <div className="modal-header">
                        <div className="title-cart">My Cart</div>
                        <button className="close-button" onClick={onRequestClose}>
                            X
                        </button>
                    </div>
                    <div className="scrollable-section">
                        {items.map((item) => (
                            <ItemCart
                                productID={item.id}
                                size={item.size}
                                color={item.color}
                                quantity={item.quantity}
                                setCartItemsQuantity={setCartItemsQuantity}
                                setSubTotal={setSubTotal}
                            />
                        ))}
                    </div>

                    <div className="cart-details">
                        <div className="cart-detail-row">
                            <span>Subtotal</span>
                            <span>{currency + (subtotal).toFixed(2)}</span>
                        </div>
                        <div className="cart-detail-row">
                            <span>Shipping Cost</span>
                            <span>{currency + ((subtotal * 10)/100).toFixed(2)}</span>
                        </div>
                        <hr />
                        <div className="cart-detail-row total">
                            <span>Total</span>
                            <span>{currency + (((subtotal * 10)/100) + subtotal).toFixed(2)}</span>
                        </div>
                    </div>

                    <button className="checkout-button">Checkout</button>
                </div>
            </Modal>
        </div>
    );
};

export default ShoppingCartModal;