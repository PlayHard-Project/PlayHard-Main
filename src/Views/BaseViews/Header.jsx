import React, { useEffect, useState, useRef } from "react";
import {
  MdSearch,
  MdPerson,
  MdSettings,
  MdClose,
  MdMenu,
} from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import "../../css/headerStyle.css";
import ShoppingCartModal from "../Cart/ShoppingCartModal";
import ModalAdminOptions from "../HeaderOptions/ModalAdminOptions";
import { SlArrowRight } from "react-icons/sl";
import CategoriesPopup from "../HeaderOptions/CategoriesPopup";
import { SlArrowDown } from "react-icons/sl";
import SearchBar from "../../Utilities/SearchBar/SearchBar";
import { getUsername, isLoggedIn, isUserAdmin } from "../../Utilities/auth";

/**
 * Header component for the website.
 *
 * @param {Object} props - The component properties.
 * @param {number} props.cartItemsQuantity - The quantity of items in the shopping cart.
 * @param {Function} props.setCartItemsQuantity - Function to set the quantity of items in the shopping cart.
 * @param {Function} props.setSubTotal - Function to set the subtotal of the shopping cart.
 * @param {number} props.subTotal - The subtotal of the shopping cart.
 */

const Header = ({
  cartItemsQuantity,
  setCartItemsQuantity,
  setSubTotal,
  subTotal,
}) => {
  const location = useLocation();
  const [showSearchPopup, setShowSearchPopup] = useState(false);
  const [showMenuPopup, setShowMenuPopup] = useState(false);
  const headerIcon =
    "https://res.cloudinary.com/playhard/image/upload/v1699676459/PlayHardLogo.png";
  const [isCartModalOpen, setCartModalOpen] = useState(false);
  const [isOptionsModalOpen, setOptionsModalOpen] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 888 });
  const [showCategoriesPopup, setShowCategoriesPopup] = useState(false);
  const [isAdminModalOpen, setAdminModalOpen] = useState(false);
  const [product, setProduct] = useState();

  /**
   * Function to toggle the menu and categories visibility.
   * @param {string} category - The category to toggle.
   */
  const toggleMenuAndCategories = (category) => {
    toggleMenu();
    toggleCategories();
  };

  /**
   * Function to handle the opening and closing of the admin modal.
   */
  const handleAdminModal = () => {
    if (isAdminModalOpen) {
      setAdminModalOpen(false);
      return;
    }
    setAdminModalOpen((prevOpen) => !prevOpen);
    setShowSearchPopup(false);
    setShowMenuPopup(false);
  };

  /**
   * Function to handle the closing of the admin modal.
   */
  const handleCloseAdminModal = () => {
    setAdminModalOpen(false);
  };

  /**
   * Function to handle the opening and closing of the options modal.
   */
  const handleOptionsModal = () => {
    if (isOptionsModalOpen) {
      setOptionsModalOpen(false);
      return;
    }
    setOptionsModalOpen((prevOpen) => !prevOpen);
    setShowSearchPopup(false);
    setShowMenuPopup(false);
  };

  /**
   * Function to handle the closing of the options modal.
   */
  const handleCloseOptionsModal = () => {
    setOptionsModalOpen(false);
  };

  /**
   * Function to handle the opening and closing of the cart modal.
   */
  const handleOpenCartModal = () => {
    if (isCartModalOpen) {
      setCartModalOpen(false);
      return;
    }
    setCartModalOpen((prevOpen) => !prevOpen);
    setShowSearchPopup(false);
    setShowMenuPopup(false);
  };

  /**
   * Function to handle the closing of the cart modal.
   */
  const handleCloseModal = () => {
    setCartModalOpen(false);
  };

  /**
   * Function to handle the closing of the categories modal.
   */
  const handleCloseCategoriesModal = () => {
    setShowCategoriesPopup(false);
  };

  /**
   * Toggles the visibility of the search popup.
   * Closes other popups and modals.
   */
  const toggleSearchPopup = () => {
    setShowSearchPopup(!showSearchPopup);
    setShowMenuPopup(false);
    handleCloseModal();
  };

  /**
   * Toggles the visibility of the main menu.
   * Closes other popups and modals.
   * Also, closes the categories modal and options modal.
   */
  const toggleMenu = () => {
    setShowMenuPopup(!showMenuPopup);
    setShowSearchPopup(false);
    handleCloseModal();
    handleCloseCategoriesModal();
    handleCloseOptionsModal();
  };

  /**
   * Toggles the visibility of the categories popup.
   * Closes other popups and modals.
   */
  const toggleCategories = () => {
    setShowCategoriesPopup(!setShowCategoriesPopup());
    setShowSearchPopup(false);
    handleCloseModal();
  };

  /**
   * Effect hook to handle closing modals when in mobile view.
   * Closes the cart modal and options modal when the screen size is mobile.
   */
  useEffect(() => {
    if (isMobile) {
      handleAdminPermissions();
      handleCloseModal();
      handleCloseOptionsModal();
    }
  }, [isMobile]);

  const handleAdminPermissions = () => {
  if(isLoggedIn() && isUserAdmin()){
    return [
      { link: "/", title: "Home" },
      { link: "/about", title: "About Us" },
      { link: "/products", title: "Products" },
      { link: "/admin", title: "Admin" },
    ];
  }else if((isLoggedIn() && !isUserAdmin())||(!isLoggedIn())){
    return [
      { link: "/", title: "Home" },
      { link: "/about", title: "About Us" },
      { link: "/products", title: "Products" },
      { link: "/contact", title: "Contact Us" },
    ];
  }
  }

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((part) => part.charAt(0).toUpperCase())
      .join("");
  };

  const paths = handleAdminPermissions();
  const modalRef = useRef();
  const modalOptionsRef = useRef();
  const modalAdminRef = useRef();

  return (
    <header className="text-white header container">
      <div className="flex justify-between items-center">
        <div className="custom-rectangle"> </div>
        <div className="md:flex items-center">
          <Link to="/">
            <img
              src={headerIcon}
              alt="Icon Main"
              className="background-shape"
            />
          </Link>
          <div className="lg:flex space-x-5 hidden text-active pl-5">
            {paths.map((path) => (
              <Link
                key={path.link}
                to={path.link}
                className={`text ${
                  path.link === location.pathname && "text-active"
                }`}
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
                options={[
                  { label: "Clothes", icon: <SlArrowDown strokeWidth={100} /> },
                  { label: "Shoes", icon: " " },
                  { label: "Equipment", icon: " " },
                  { label: "Accessories", icon: " " },
                  { label: "Brands", icon: <SlArrowDown strokeWidth={100} /> },
                  { label: "Offers", icon: " " },
                  { label: "Sports", icon: <SlArrowDown strokeWidth={100} /> },
                ]}
              />
            </div>
          </div>
        </div>
        <div className="lg:flex hidden space-x-4 items-center">
          <SearchBar isRedirect={true} setProduct={setProduct} />
          <Link
            to={isLoggedIn() ? "/profile" : "/sign-in"}
            className="text lg:flex hidden items-center"
          >
            {isLoggedIn() ? (
              <div className="small-profile">
              {getInitials(getUsername())}
            </div>
              
            ) : (
              <MdPerson size={30} color="#72a3ff" className="style-icon" />
            </Link>
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
            <Link to="/settings" className="lg:flex hidden" >
              <MdSettings size={30} color="#72a3ff" className="style-icon" />
            </Link>
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
                <div className="absolute shadow-lg popup right-4">
                  <SearchBar isRedirect={true} setProduct={setProduct}/>
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
                  <div className="relative flex items-center text-link" onClick={toggleCategories}>
                    Categories <SlArrowRight size={10} color="#72a3ff" strokeWidth={200} style={{ marginLeft: '70px' }} />
                  </div>
                  <Link to="/sign-up" className="relative flex items-center text-link" onClick={toggleMenu}>Sign Up</Link>
                  <Link
                      to="/shopcart"
                      className="relative flex items-center text-link"
                      onClick={toggleMenu}
                  >
                    Shop Cart
                  </Link>
                  <Link to="/settings" className="relative flex items-center text-link" onClick={toggleMenu}>Settings</Link>
                </div>
            )}
            {showCategoriesPopup && (
                <CategoriesPopup
                    handleCloseCategoriesModal={handleCloseCategoriesModal}
                    handleSecondModal={handleCloseOptionsModal}
                    toggleMenuAndCategories={toggleMenuAndCategories}
                />
            )}
          </div>
        </div>
      </header>
  );
};

export default Header;
