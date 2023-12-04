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
const CategoriesPopup = ({ handleCloseCategoriesModal, toggleMenuAndCategories, handleSecondModal, handleCloseMenuModal }) => {
    const [showClothesSubCategories, setShowClothesSubCategories] = useState(false);
    const [showBrandsSubCategories, setShowBrandsSubCategories] = useState(false);
    const [showSportsSubCategories, setShowSportsSubCategories] = useState(false);

    const toggleAllMenus = () => {
        setShowClothesSubCategories(false);
        setShowBrandsSubCategories(false);
        setShowSportsSubCategories(false);
    };    

    const clothesSubCategories = [
        { label: "T-shirt", route: `products/categories=T-shirt` },
        { label: "Jersey", route: `products/categories=Jersey` },
        { label: "Hoodies ", route: `products/categories=Hoodies` },
        { label: "Jackets", route: `products/categories=Jackets` },
        { label: "Shorts", route: `products/categories=Shorts` },
        { label: "Pants", route: `products/categories=Pants` },
        { label: "Socks", route: `products/categories=Socks` },
        { label: "Underwear", route: `products/categories=Underwear` },
    ];

    const brandsSubCategories = [
        { label: "Adidas", route: 'products/brand=654c3e2460c78adccb61fbc4'},
        { label: "Asics", route: 'products/brand=654c3e2460c78adccb61fbd4' },
        { label: "Fila", route: 'products/brand=654c3e2460c78adccb61fbd6' },
        { label: "Givenchy", route: 'products/brand=654c3e2460c78adccb61fbc6' },
        { label: "New Balance", route: 'products/brand=654c3e2460c78adccb61fbc8' },
        { label: "Nike", route: 'products/brand=654c3e2460c78adccb61fbca' },
        { label: "Puma", route: 'products/brand=654c3e2460c78adccb61fbcc' },
        { label: "Under Armour", route: 'products/brand=654c3e2460c78adccb61fbce' },
        { label: "Vans", route: 'products/brand=654c3e2460c78adccb61fbd0' },
        { label: "Champion", route: 'products/brand=654c3e2460c78adccb61fbd2' },
        { label: "Wilson", route: 'products/brand=654c41ca1754c5a319281642' },
    ];

    const sportsSubCategories = [
        { label: "Training", route: 'products/sport=Training' },
        { label: "Skateboarding", route: 'products/sport=Skateboarding' },
        { label: "Soccer", route: 'products/sport=Soccer' },
        { label: "Tennis", route: 'products/sport=Tennis' },
        { label: "Yoga", route: 'products/sport=Yoga' },
        { label: "Golf", route: 'products/sport=Golf' },
        { label: "Baseball", route: 'products/sport=Baseball' },
        { label: "American Football", route: 'products/sport=American Football' },
        { label: "Basketball", route: 'products/sport=Basketball' },
        { label: "Volleyball", route: 'products/sport=Volleyball' },
    ];

    /**
     * Handles the toggle of subcategories visibility for a specific category.
     *
     * @param {string} category - The category for which subcategories are toggled.
     */
    const handleToggleSubCategories = (category) => {
        toggleAllMenus();
        if (category === "Clothes") {
            setShowClothesSubCategories((prev) => !prev);
        } else if (category === "Brands") {
            setShowBrandsSubCategories((prev) => !prev);
        } else if (category === "Sports") {
            setShowSportsSubCategories((prev) => !prev);
        }
    };       

    return (
        <div className="absolute p-2 shadow-lg popup right-4 space-y-1 flex flex-col items-start"  style={{width:'210px', height:'260px'}}>
            <MdArrowBack
                size={20}
                color="#72a3ff"
                className="style-icon"
                onClick={handleCloseCategoriesModal}
            />
            <div
                className="relative flex items-center text-link"
                onClick={() => {
                    handleToggleSubCategories("Clothes");
                }}
            >
                Clothes <SlArrowRight size={10} color="#72a3ff" strokeWidth={200} style={{ marginLeft: '70px' }} />
            </div>
            {showClothesSubCategories && (
                <SubCategoriesOptions
                    handleCloseModal={() => setShowClothesSubCategories(false)}
                    handleSecondModal={handleSecondModal}
                    handleCloseMenuModal={handleCloseMenuModal}
                    handleCategoriesModal={handleCloseCategoriesModal}
                    options={clothesSubCategories}
                    toggleOption={(option) => {
                    }}
                />
            )}
            <Link to="/products/categories=Shoes" className="text-link">
                <div
                    className="relative flex items-center"
                    onClick={() => {
                        handleToggleSubCategories("Shoes");
                        toggleMenuAndCategories();
                        handleCloseCategoriesModal();
                        handleSecondModal();
                    }}
                >
                    Shoes
                </div>
            </Link>
            <Link to="/products/categories=Equipment" className="text-link">
                <div
                    className="relative flex items-center"
                    onClick={() => {
                        handleToggleSubCategories("Equipment");
                        toggleMenuAndCategories();
                        handleCloseCategoriesModal();
                        handleSecondModal();
                    }}
                >
                    Equipment
                </div>
            </Link>
            <Link to="/products/categories=Accessories" className="text-link">
                <div
                    className="relative flex items-center"
                    onClick={() => {
                        handleToggleSubCategories("Accessories");
                        toggleMenuAndCategories();
                        handleCloseCategoriesModal();
                        handleSecondModal();
                    }}
                >
                    Accessories
                </div>
            </Link>
            <div
                className="relative flex items-center text-link"
                onClick={() => {
                    handleToggleSubCategories("Brands");
                }}
            >
                Brands <SlArrowRight size={10} color="#72a3ff" strokeWidth={200} style={{ marginLeft: '74px' }} />
            </div>
            {showBrandsSubCategories && (
                <SubCategoriesOptions
                    handleCloseModal={() => setShowBrandsSubCategories(false)}
                    handleSecondModal={handleSecondModal}
                    handleCloseMenuModal={handleCloseMenuModal}
                    handleCategoriesModal={handleCloseCategoriesModal}
                    options={brandsSubCategories}
                    toggleOption={(option) => {
                    }}
                />
            )}
            <div
                className="relative flex items-center text-link"
                onClick={() => {
                    handleToggleSubCategories("Sports");
                }}
            >
                Sports <SlArrowRight size={10} color="#72a3ff" strokeWidth={200} style={{ marginLeft: '77px' }} />
            </div>
            {showSportsSubCategories && (
                <SubCategoriesOptions
                    handleCloseModal={() => setShowSportsSubCategories(false)}
                    handleSecondModal={handleSecondModal}
                    handleCloseMenuModal={handleCloseMenuModal}
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