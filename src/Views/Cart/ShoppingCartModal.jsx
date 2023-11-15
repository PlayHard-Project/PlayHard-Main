import React, { useState, useEffect, useRef } from "react";
import Modal from "react-modal";
import "../../css/CartDropdownStyle.css";
import BuyCartManagement from "../../Utilities/BuyCartManagement";
import ItemCart from "./ItemCart";

Modal.setAppElement("#root");

const ShoppingCartModal = ({ isOpen, onRequestClose }) => {
    const [rectangles, setRectangles] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const maxRectangles = 10;
    const modalRef = useRef();
    const buyCartManagement = new BuyCartManagement();
    const items = buyCartManagement.getProducts();


    useEffect(() => {
        if (items) {
            for (let i = 0, size = items.length; i < size; i++) {
                setRectangles((item) => {
                    return [...item,
                        <ItemCart productID={items[i].id} size={items[i].size} color={items[i].color} quantity={items[i].quantity}></ItemCart>]
                })
            }
        }
    }, []);

    useEffect(() => {
        const handleOutsideClick = (e) => {
            if (modalRef.current && !modalRef.current.contains(e.target)) {
                onRequestClose();
            }
        };

        document.addEventListener("mousedown", handleOutsideClick);

        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, [onRequestClose]);

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            className="modal-content"
            overlayClassName="modal-overlay"
            shouldCloseOnOverlayClick={false}
        >
            <div ref={modalRef}>
                <div className="modal-header">
                    <div className="title-cart">My Cart</div>
                    <button className="close-button" onClick={onRequestClose}>
                        X
                    </button>
                </div>
                <div className="scrollable-section">
                    {rectangles.length === 0 ? (
                        <p className="mr-4 mt-14 font-extrabold">The cart is empty</p>
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
        </Modal>
    );
};

export default ShoppingCartModal;