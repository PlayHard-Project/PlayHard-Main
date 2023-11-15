import React, { useState, useEffect, useRef } from "react";
import Modal from "react-modal";
import "../../css/CartDropdownStyle.css";

Modal.setAppElement("#root");

const ShoppingCartModal = ({ isOpen, onRequestClose, excludedButtonRef }) => {
    const [rectangles, setRectangles] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const maxRectangles = 10;
    const modalRef = useRef();

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
            console.log(e.target);
            console.log( excludedButtonRef.current)
            if (
                modalRef.current &&
                !modalRef.current.contains(e.target) &&
                !modalRef.current.contains(excludedButtonRef.current)
            ) {
                onRequestClose();
            }
        };

        document.addEventListener("mousedown", handleOutsideClick);

        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, [onRequestClose, excludedButtonRef]);

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