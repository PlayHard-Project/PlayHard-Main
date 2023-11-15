import React, { useState } from "react";
import { MdSearch, MdPerson, MdShoppingCart, MdSettings, MdClose, MdMenu} from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import "../../css/headerStyle.css";

const Header = () => {
  const location = useLocation();
  const [showSearchPopup, setShowSearchPopup] = useState(false);
  const [showMenuPopup, setShowMenuPopup] = useState(false);
  const headerIcon = "https://res.cloudinary.com/playhard/image/upload/v1699676459/PlayHardLogo.png";

  const toggleSearchPopup = () => {
    setShowSearchPopup(!showSearchPopup);
    setShowMenuPopup(false);
  };

  const toggleMenu = () => {
    setShowMenuPopup(!showMenuPopup);
    setShowSearchPopup(false);
  };

  const paths = [
    {
      link: "/home",
      title: "Home",
    },
    {
      link: "/shop",
      title: "Shop",
    },
    {
      link: "/about",
      title: "About",
    },
    {
      link: "/products",
      title: "Products",
    },
    {
      link: "/contact",
      title: "Contact",
    },
  ];

  return (
      <header className=" text-white header">
        <div className="flex justify-between items-center">
          <div className="md:flex items-center ">
            <img src={headerIcon} alt="Icon Main" className="background-shape" />
            <div className="lg:flex space-x-4 hidden">
              {paths.map((path) => (
                  <Link
                      key={path.link}
                      to={path.link}
                      className={`text ${path.link === location.pathname && "text-active"}`}
                  >
                    {path.title}
                  </Link>
              ))}
            </div>
          </div>
          <div className="lg:flex hidden space-x-4 items-center mr-3">
            <div className="flex items-center search-container">
              <input
                  type="text"
                  className="search-input"
                  placeholder="Search"
                  maxLength={60}
              />
              <button>
                <MdSearch size={24} color="#72a3ff" />
              </button>
            </div>
            <button className="text lg:flex hidden items-center">
              <MdPerson size={30} color="#72a3ff" className="style-icon" />
              <label>Login/Register</label>
            </button>
            <button className="relative lg:flex hidden">
              <MdShoppingCart size={30} color="#72a3ff" className="style-icon" />
              <span className="bg-red-500 text-white absolute top-0 right-0 w-4 h-4 flex
                      items-center justify-center rounded-full">0
            </span>
            </button>
            <button className="lg:flex hidden">
              <MdSettings size={30} color="#72a3ff" className="style-icon" />
            </button>
          </div>
          <div className="lg:hidden space-x-4 relative mr-3">
            <div className="flex items-center space-x-4">
              <div onClick={toggleSearchPopup}>
                <MdSearch size={24} color="#72a3ff" />
              </div>
              <button onClick={toggleMenu}>
                <MdMenu size={30} color="#72a3ff" className="style-icon" />
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
                      <MdClose size={24} color="#72a3ff" />
                  </button>
                </div>
            )}
            {showMenuPopup && (
                <div className="absolute p-2 shadow-lg popup right-4 space-y-1 flex flex-col items-start">
                  {paths.map((path) => (
                      <Link
                          key={path.link}
                          to={path.link}
                          className={`text-link ${
                              path.link === location.pathname && "text-link-active"
                          }`}
                          onClick={() => {
                            toggleMenu();
                          }}
                      >
                        {path.title}
                      </Link>
                  ))}
                  <div className="relative flex items-center text-link">
                    Login / Register
                  </div>
                  <div className="relative flex items-center text-link">Shop Cart</div>
                  <div className="relative flex items-center text-link">Settings</div>
                </div>
            )}
          </div>
        </div>
      </header>
  );
};

export default Header;