import React, { useState, useEffect, useRef } from "react";
import Modal from "react-modal";
import "../../css/CartDropdownStyle.css";
import {MdShoppingCart} from "react-icons/md";

Modal.setAppElement("#root");

const ShoppingCartModal = ({ isOpen, onRequestClose, modalRef, onRequestOpen, cartItemsQuantity }) => {
    const [rectangles, setRectangles] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const maxRectangles = 10;

    useEffect(() => {
        const addRectangle = () => {
            setRectangles((prevRectangles) => {
                if (prevRectangles.length < maxRectangles) {
                    return [
                        ...prevRectangles,
                        <div key={prevRectangles.length} className="blue-rectangle"></div>,
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
            </Modal>
        </div>
    );
};

export default ShoppingCartModal;