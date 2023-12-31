// CategoriesPopup.jsx
import React, { useState } from "react";
import { MdArrowBack } from "react-icons/md";
import PropTypes from "prop-types";
import { SlArrowRight } from "react-icons/sl";
import SubCategoriesOptions from "./SubCategoriesOptions";
import { Link } from "react-router-dom";

/**
 * Component for rendering a popup with categories and subcategories.
 *
 * @param {Object} props - The component properties.
 * @param {Function} props.handleCloseCategoriesModal - Function to close the categories modal.
 * @param {Function} props.toggleMenuAndCategories - Function to toggle between menu and categories.
 */
const CategoriesPopup = ({ handleCloseCategoriesModal, toggleMenuAndCategories, handleSecondModal }) => {
    const [showClothesSubCategories, setShowClothesSubCategories] = useState(false);
    const [showBrandsSubCategories, setShowBrandsSubCategories] = useState(false);
    const [showSportsSubCategories, setShowSportsSubCategories] = useState(false);

    const toggleAllMenus = () => {
        setShowClothesSubCategories(false);
        setShowBrandsSubCategories(false);
        setShowSportsSubCategories(false);
    };

    const clothesSubCategories = [
        { label: "T-Shirts" },
        { label: "Jerseys" },
        { label: "Hoodies" },
        { label: "Jackets" },
        { label: "Shorts" },
        { label: "Pants" },
        { label: "Socks" },
    ];

    const brandsSubCategories = [
        { label: "Adidas" },
        { label: "Asics" },
        { label: "Fila" },
        { label: "Givenchy" },
        { label: "New Balance" },
        { label: "Nike" },
        { label: "Puma" },
        { label: "Under Armour" },
        { label: "Vans" },
        { label: "Champion" },
        { label: "Wilson" },
    ];

    const sportsSubCategories = [
        { label: "Basketball" },
        { label: "Soccer" },
        { label: "Yoga" },
        { label: "Gym" },
        { label: "Tennis" },
        { label: "Cycling" },
        { label: "Swimming" },
        { label: "Golf" },
    ];

    /**
     * Handles the toggle of subcategories visibility for a specific category.
     *
     * @param {string} category - The category for which subcategories are toggled.
     */
    const handleToggleSubCategories = (category) => {
        toggleAllMenus();
        if (category === "Clothes") setShowClothesSubCategories(!showClothesSubCategories);
        else if (category === "Brands") setShowBrandsSubCategories(!showBrandsSubCategories);
        else if (category === "Sports") setShowSportsSubCategories(!showSportsSubCategories);
    };

    return (
        <div className="absolute p-2 shadow-lg popup right-4 space-y-1 flex flex-col items-start">
            <MdArrowBack
                size={20}
                color="#72a3ff"
                className="style-icon"
                onClick={handleCloseCategoriesModal}
            />
            <div
                className="relative flex items-center text-link"
                onClick={() => {
                    toggleMenuAndCategories("Clothes");
                    handleToggleSubCategories("Clothes");
                }}
            >
                Clothes <SlArrowRight size={10} color="#72a3ff" strokeWidth={200} style={{ marginLeft: '70px' }} />
            </div>
            {showClothesSubCategories && (
                <SubCategoriesOptions
                    handleCloseModal={() => setShowClothesSubCategories(false)}
                    handleSecondModal={handleSecondModal}
                    handleCategoriesModal={handleCloseCategoriesModal}
                    options={clothesSubCategories}
                    toggleOption={(option) => {
                    }}
                />
            )}
            <Link to="/categories/Shoes" className="text-link">
                <div
                    className="relative flex items-center"
                    onClick={() => toggleMenuAndCategories("Shoes")}
                >
                    Shoes
                </div>
            </Link>
            <Link to="/categories/Equipment" className="text-link">
                <div
                    className="relative flex items-center"
                    onClick={() => toggleMenuAndCategories("Equipment")}
                >
                    Equipment
                </div>
            </Link>
            <Link to="/categories/Accessories" className="text-link">
                <div
                    className="relative flex items-center"
                    onClick={() => toggleMenuAndCategories("Accessories")}
                >
                    Accessories
                </div>
            </Link>
            <div
                className="relative flex items-center text-link"
                onClick={() => {
                    toggleMenuAndCategories("Brands");
                    handleToggleSubCategories("Brands");
                }}
            >
                Brands <SlArrowRight size={10} color="#72a3ff" strokeWidth={200} style={{ marginLeft: '74px' }} />
            </div>
            {showBrandsSubCategories && (
                <SubCategoriesOptions
                    handleCloseModal={() => setShowBrandsSubCategories(false)}
                    handleSecondModal={handleSecondModal}
                    handleCategoriesModal={handleCloseCategoriesModal}
                    options={brandsSubCategories}
                    toggleOption={(option) => {
                    }}
                />
            )}

            <Link to="/categories/Offers" className="text-link">
                <div
                    className="relative flex items-center"
                    onClick={() => toggleMenuAndCategories("Offers")}
                >
                    Offers
                </div>
            </Link>
            <div
                className="relative flex items-center text-link"
                onClick={() => {
                    toggleMenuAndCategories("Sports");
                    handleToggleSubCategories("Sports");
                }}
            >
                Sports <SlArrowRight size={10} color="#72a3ff" strokeWidth={200} style={{ marginLeft: '77px' }} />
            </div>
            {showSportsSubCategories && (
                <SubCategoriesOptions
                    handleCloseModal={() => setShowSportsSubCategories(false)}
                    handleSecondModal={handleSecondModal}
                    handleCategoriesModal={handleCloseCategoriesModal}
                    options={sportsSubCategories}
                    toggleOption={(option) => {
                    }}
                />
            )}
        </div>
    );
};

// PropTypes for component validation
CategoriesPopup.propTypes = {
    handleCloseCategoriesModal: PropTypes.func.isRequired,
    toggleMenuAndCategories: PropTypes.func.isRequired,
};

export default CategoriesPopup;