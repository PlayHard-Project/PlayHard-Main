import React, { useEffect } from "react";
import Modal from "react-modal";
import "../../css/CartDropdownStyle.css";
import BuyCartManagement from "../../Utilities/BuyCartManagement";
import GoToCheckout  from "../../Components/ApiRestHandler/stripeApiHandler";
import ItemCart from "./ItemCart";
import {MdShoppingCart} from "react-icons/md";

Modal.setAppElement("#root");

const ShoppingCartModal = ({ isOpen, onRequestClose, modalRef, onRequestOpen, cartItemsQuantity, setCartItemsQuantity, setSubTotal, subTotal}) => {
    const currency = "$"

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
                        <div className="bg-red-500 text-white absolute top-0 right-0 w-4 h-4 flex
                            items-center justify-center" id="cartRedIcon" onClick={onRequestOpen}>{cartItemsQuantity}
                        </div>
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
                    </div>
                    <div className="scrollable-section">
                        {items.length === 0 ? (
                            <p className="mr-4 mt-14 font-extrabold justify-center align-middle">The cart is empty</p>
                        ) : (
                            <>
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
                            </>
                        )}
                    </div>

                    <div className="cart-details">
                        <div className="cart-detail-row">
                            <span>Subtotal</span>
                            <span>{currency + (subTotal).toFixed(2)}</span>
                        </div>
                        <div className="cart-detail-row">
                            <span>Shipping Cost</span>
                            <span>{currency + ((subTotal * 10)/100).toFixed(2)}</span>
                        </div>
                        <hr />
                        <div className="cart-detail-row total">
                            <span>Total</span>
                            <span>{currency + (((subTotal * 10)/100) + subTotal).toFixed(2)}</span>
                        </div>
                    </div>
                    <GoToCheckout />
                </div>
            </Modal>
        </div>
    );
};

export default ShoppingCartModal;