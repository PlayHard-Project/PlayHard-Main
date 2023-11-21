import React from 'react';
import Footer from './Views/BaseViews/Footer.jsx';
import {BrowserRouter as Router, Route, Routes, useLocation} from 'react-router-dom';
import { ProductSection } from "./Views/ProductDescriptionSection/ProductSection.jsx";
import Home from "./Views/Pages/Home.jsx";
import NotImplementedYet from "./Views/Pages/NotImplementedYet.jsx";
import Header from './Views/BaseViews/Header.jsx';
import Shop from './Views/Pages/Shop.jsx';
import About from './Views/Pages/About.jsx';
import Products from './Views/Pages/Products.jsx';
import Contact from './Views/Pages/Contact.jsx';
import BuyCartManagement from "./Utilities/BuyCartManagement";
import FailedPayment from './Views/PaymentStatus/FailedPayment.jsx';
import SuccesfullPayment from './Views/PaymentStatus/PaymentSuccessful.jsx';
import { useState, useEffect } from "react";
import ShoppingCartScreen from "./Views/Cart/ShoppingCartScreen";
import {Toaster} from "react-hot-toast";



export default function App() {

    const [cartItemsQuantity, setCartItemsQuantity] = useState([]);
    const [subTotal, setSubTotal] = useState(0);
    const buyCartManagement = new BuyCartManagement();

    function ScrollToTop() {
        const { pathname } = useLocation();

        useEffect(() => {
            window.scrollTo(0, 0);
        }, [pathname]);

        return null;
    }

    useEffect(() => {
        const savedCartItems = buyCartManagement.getProducts();
        if (savedCartItems) {
            setCartItemsQuantity(savedCartItems.length);
            const subTotalPromise = buyCartManagement.getSubTotal();
            subTotalPromise.then((element) => {
                setSubTotal(element);
            })
        }
    }, []);

    return (
        <Router>
            <ScrollToTop />
            <Toaster position="bottom-center"/>
            <Header cartItemsQuantity={cartItemsQuantity} setCartItemsQuantity={setCartItemsQuantity} setSubTotal={setSubTotal} subTotal={subTotal}/>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/product/:id" element={<ProductSection setCartItemsQuantity={setCartItemsQuantity} setSubTotal={setSubTotal}/>} />
                <Route path="/" element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/about" element={<About />} />
                <Route path="/fail-payment-status" element={<FailedPayment/>}/>
                <Route path="/success-payment-status" element={<SuccesfullPayment/>}/>
                <Route path="/notImplementedYet" element={<NotImplementedYet />} />
                <Route path="/products" element={<Products />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/shopcart" element={<ShoppingCartScreen setCartItemsQuantity={setCartItemsQuantity} setSubTotal={setSubTotal} subTotal={subTotal}/>}/>
            </Routes>
            <Footer />
        </Router>
    );
}
