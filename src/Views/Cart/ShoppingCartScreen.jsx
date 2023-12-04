import React, { useState, useEffect } from "react";
import "../../css/CartShop.css";
import BuyCartManagement from "../../Utilities/BuyCartManagement";
import GoToCheckout  from "../../Components/ApiRestHandler/stripeApiHandler";
import ItemCart from "./ItemCart";
import { useNavigate } from "react-router-dom";

const ShoppingCartScreen = ({ setCartItemsQuantity, setSubTotal, subTotal }) => {
    const currency = "$";

    const buyCartManagement = new BuyCartManagement();
    const items = buyCartManagement.getProducts();
    const isCartEmpty = setCartItemsQuantity === 0;
    const navigate = useNavigate();

    useEffect(() => {
        const handleWindowSizeChange = () => {
            if (window.innerWidth <= 888) {
                navigate("/");
            }
        };

        window.addEventListener("resize", handleWindowSizeChange);

        return () => {
            window.removeEventListener("resize", handleWindowSizeChange);
        };
    }, [navigate]);
    

    return (
        <div className="CartShopContainer container mb-16">
            <div className="modal-header">
                <div className="w-full text-center" style={{fontSize:'20px', fontFamily: "Montserrat"}}>My Cart</div>
            </div>
            <div className="scrollable-section">
                {items.length === 0 ? (
                    <p className="w-full mt-14 font-extrabold text-center" style={{padding:"25%"}} >The cart is empty</p>
                ) : (
                    <>
                        {items.map((item, index) => (
                            <ItemCart
                                key={index}
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
                    <span>{currency + 10}</span>
                </div>
                <hr />
                <div className="cart-detail-row total">
                    <span>Total</span>
                    <span>{currency + (10+ subTotal).toFixed(2)}</span>
                </div>
            </div>

            <GoToCheckout disabled={isCartEmpty} products={items}/>
        </div>
    );
};

export default ShoppingCartScreen;