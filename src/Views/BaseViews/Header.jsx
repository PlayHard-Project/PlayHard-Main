import React, { useEffect, useState, useRef } from "react";
import { MdSearch, MdPerson, MdSettings, MdClose, MdMenu } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import "../../css/headerStyle.css";
import ShoppingCartModal from "../Cart/ShoppingCartModal";
import ModalAdminOptions from "../HeaderOptions/ModalAdminOptions";
import SubOptionsModal from "../HeaderOptions/SubOptionsClothesModal";

const Header = ({cartItemsQuantity, setCartItemsQuantity, setSubTotal, subTotal}) => {
  const location = useLocation();
  const [showSearchPopup, setShowSearchPopup] = useState(false);
  const [showMenuPopup, setShowMenuPopup] = useState(false);
  const headerIcon = "https://res.cloudinary.com/playhard/image/upload/v1699676459/PlayHardLogo.png";
  const [isCartModalOpen, setCartModalOpen] = useState(false);
  const [isOptionsModalOpen, setOptionsModalOpen] = useState(false);
  const [isSubOptionsModalOpen, setSubOptionsModalOpen] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 888 });

  const handleSubOptionsModal = () => {
    setSubOptionsModalOpen((prevOpen) => !prevOpen);
    setShowSearchPopup(false);
    setShowMenuPopup(false);
  };
  const handleOptionsModal = () => {
    if(isOptionsModalOpen){
      setOptionsModalOpen(false)
      return;
    }
    setOptionsModalOpen((prevOpen) => !prevOpen);
    setShowSearchPopup(false);
    setShowMenuPopup(false);
  };

  const handleCloseOptionsModal = () => {
    setOptionsModalOpen(false);
  };
  const handleOpenCartModal = () => {
    if(isCartModalOpen){
      setCartModalOpen(false)
      return;
    }
    setCartModalOpen((prevOpen) => !prevOpen);
    setShowSearchPopup(false);
    setShowMenuPopup(false);
  };

  const handleCloseModal = () => {
    setCartModalOpen(false);
  };

  const toggleSearchPopup = () => {
    setShowSearchPopup(!showSearchPopup);
    setShowMenuPopup(false);
    handleCloseModal();
  };

  const toggleMenu = () => {
    setShowMenuPopup(!showMenuPopup);
    setShowSearchPopup(false);
    handleCloseModal();
  };

  useEffect(() => {
    if (isMobile) {
      handleCloseModal();
      handleCloseOptionsModal();
    }
  }, [isMobile]);

  const paths = [
    { link: "/", title: "Home" },
    { link: "/about", title: "About" },
    { link: "/products", title: "Products" },
    { link: "/contact", title: "Contact" },
  ];

  const modalRef = useRef();
  const modalOptionsRef = useRef();

  return (
      <header className="text-white header container">
        <div className="flex justify-between items-center">
          <div className="custom-rectangle"> </div>
          <div className="md:flex items-center">
            <Link to="/">
              <img src={headerIcon} alt="Icon Main" className="background-shape" />
            </Link>
            <div className="lg:flex space-x-4 hidden text-active">
              {paths.map((path) => (
                  <Link
                      key={path.link}
                      to={path.link}
                      className={`text ${path.link === location.pathname && 'text-active'}`}
                  >
                    {path.title}
                  </Link>
              ))}
              <div ref={modalOptionsRef}>
                <ModalAdminOptions
                    sectionText={"Categories"}
                    onRequestOpen={handleOptionsModal}
                    isOpen={isOptionsModalOpen}
                    onRequestClose={handleCloseOptionsModal}
                    modalRef={modalOptionsRef}
                    options={["Clothes", "Shoes", "Equipment","Accessories","Brands","Offers","Sports"]}
                />
              </div>
            </div>
          </div>
          <div className="lg:flex hidden space-x-4 items-center">
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
            </button>
            <div ref={modalRef}>
              <ShoppingCartModal
                  onRequestOpen={handleOpenCartModal}
                  isOpen={isCartModalOpen}
                  onRequestClose={handleCloseModal}
                  modalRef={modalRef}
                  cartItemsQuantity={cartItemsQuantity}
                  setCartItemsQuantity={setCartItemsQuantity}
                  setSubTotal={setSubTotal}
                  subTotal={subTotal}
              />
            </div>
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
                          className={`text-link ${path.link === location.pathname && "text-link-active"}`}
                          onClick={toggleMenu}
                      >
                        {path.title}
                      </Link>
                  ))}
                  <div className="relative flex items-center text-link">
                    Login / Register
                  </div>
                  <Link
                      to="/shopcart"
                      className="relative flex items-center text-link"
                      onClick={toggleMenu}
                  >
                    Shop Cart
                  </Link>
                  <div className="relative flex items-center text-link">Settings</div>
                </div>
            )}
          </div>
        </div>
      </header>
  );
};

export default Header;