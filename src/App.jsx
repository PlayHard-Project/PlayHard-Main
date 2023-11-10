<<<<<<< HEAD
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Views/Header.jsx';
import Home from './Views/Home';
import Shop from './Views/Shop';
import About from './Views/About';
import Pages from './Views/Pages';
import Contact from './Views/Contact';

function App() {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/about" element={<About />} />
                <Route path="/pages" element={<Pages />} />
                <Route path="/contact" element={<Contact />} />
            </Routes>
        </Router>
    );
}

export default App;
=======
import React, { useState } from 'react';
import Footer from './Views/Footer/Footer';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { ProductSection } from "./Pages/ProductSection";
import Home from "./Pages/Home/Home";


export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/product/:id" element={<ProductSection />} />
            </Routes>
            <Footer />
        </Router>
    );
}
>>>>>>> develop
