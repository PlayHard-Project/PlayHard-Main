import React, { useState } from "react";
import "../css/headerStyle.css";
import { Link } from "react-router-dom";

const Header = () => {
    const [showSearchPopup, setShowSearchPopup] = useState(false);
    const [showMenuPopup, setShowMenuPopup] = useState(false);
    const headerIcon = "https://i.postimg.cc/6qytfd9p/header-icon.png";
    const cartIcon = "https://i.postimg.cc/bYKhs8LX/cart-icon.png";
    const menuIcon = "https://i.postimg.cc/1RgSm4Gc/menu-icon.png";
    const personIcon = "https://i.postimg.cc/vZywtzp3/person-icon.png";
    const searchIcon = "https://i.postimg.cc/0jKcLTJD/search-icon.png";
    const settingsIcon = "https://i.postimg.cc/SNCp95tn/settings-icon.png";
    const closeIcon = "https://i.postimg.cc/gr9Ndgv5/close-icon.png";

    const toggleSearchPopup = () => {
        setShowSearchPopup(!showSearchPopup);
        setShowMenuPopup(false);
    };

    const toggleMenu = () => {
        setShowMenuPopup(!showMenuPopup);
        setShowSearchPopup(false);
    };

    return (
        <header className=" text-white header">
            <div className="flex justify-between items-center">
                <div className="md:flex items-center ">
                    <img src={headerIcon} alt="Icon Main" className="background-shape" />
                    <div className="lg:flex space-x-4 hidden">
                        <Link to="/home">
                            {" "}
                            <div className="text">Home</div>{" "}
                        </Link>
                        <Link to="/shop">
                            {" "}
                            <div className="text">Shop</div>{" "}
                        </Link>
                        <Link to="/about">
                            {" "}
                            <div className="text">About</div>{" "}
                        </Link>
                        <Link to="/pages">
                            {" "}
                            <div className="text">Pages</div>{" "}
                        </Link>
                        <Link to="/contact">
                            {" "}
                            <div className="text">Contact</div>{" "}
                        </Link>
                    </div>
                </div>
                <div className="lg:flex hidden space-x-4 items-center mr-14">
                    <div className="flex items-center search-container">
                        <input type="text" className="search-input" placeholder="Search" />
                        <button>
                            <img
                                src={searchIcon}
                                alt="Close Icon"
                                className="w-6 h-6 rounded-full"
                            />
                        </button>
                    </div>
                    <button className="text lg:flex hidden items-center">
                        <img
                            src={personIcon}
                            alt="Person Icon"
                            className="w-7 rounded-full"
                        />
                        <label>Login/Register</label>
                    </button>
                    <button className="relative lg:flex hidden">
                        <img src={cartIcon} alt="Cart Icon" className="style-icon" />
                        <span
                            className="bg-red-500 text-white absolute top-0 right-0 w-4 h-4 flex
                        items-center justify-center rounded-full" >{" "}0{" "} </span>
                    </button>
                    <button className="lg:flex hidden">
                        <img
                            src={settingsIcon}
                            alt="Settings Icon"
                            className="style-icon"
                        />
                    </button>
                </div>
                <div className="lg:hidden space-x-4 relative mr-10">
                    <div className="flex items-center space-x-4">
                        <div onClick={toggleSearchPopup}>
                            <img src={searchIcon} alt="Search Icon" className="style-icon" />
                        </div>
                        <button onClick={toggleMenu}>
                            <img
                                src={menuIcon}
                                alt="Menu Icon"
                                className="style-icon text-white"
                            />
                        </button>
                    </div>
                    {showSearchPopup && (
                        <div className="absolute shadow-lg popup right-4 search-container-little">
                            <input
                                type="text"
                                className="search-input-little"
                                placeholder="Search"
                            />
                            <button onClick={toggleSearchPopup}>
                                <img
                                    src={closeIcon}
                                    alt="Close Icon"
                                    className="w-7 h-6 rounded-full"
                                />
                            </button>
                        </div>
                    )}
                    {showMenuPopup && (
                        <div className="absolute p-2 shadow-lg popup right-4 space-y-1">
                            <Link to="/home">
                                {" "}
                                <div className="text-link">Home</div>{" "}
                            </Link>
                            <Link to="/shop">
                                {" "}
                                <div className="text-link">Shop</div>{" "}
                            </Link>
                            <Link to="/about">
                                {" "}
                                <div className="text-link">About</div>{" "}
                            </Link>
                            <Link to="/pages">
                                {" "}
                                <div className="text-link">Pages</div>{" "}
                            </Link>
                            <Link to="/contact">
                                {" "}
                                <div className="text-link">Contact</div>{" "}
                            </Link>
                            <div className="relative flex items-center text-link">
                                Login / Register
                            </div>
                            <div className="relative flex items-center text-link">
                                Shop Cart
                            </div>
                            <div className="relative flex items-center text-link">
                                Settings
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;