import React from 'react';
import Footer from './Views/BaseViews/Footer.jsx';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { ProductSection } from "./Views/ProductDescriptionSection/ProductSection.jsx";
import Home from "./Views/Pages/Home.jsx";
import Header from './Views/BaseViews/Header.jsx';
import Shop from './Views/Pages/Shop.jsx';
import About from './Views/Pages/About.jsx';
import Pages from './Views/Pages/Pages.jsx';
import Contact from './Views/Pages/Contact.jsx';


export default function App() {
    return (
        <Router>
            <Header/>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/product/:id" element={<ProductSection />} />
                <Route path="/home" element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/about" element={<About />} />
                <Route path="/pages" element={<Pages />} />
                <Route path="/contact" element={<Contact />} />
            </Routes>
            <Footer />
        </Router>
    );
}
