import React, { useState } from "react";
import "../../css/categoryHeaderSection.css";
import Dropdown from "../HomePageSections/Dropdown";

const CategoryButton = ({ label, onClick }) => {
    const [isDropdownVisible, setDropdownVisible] = useState(false);

    const handleMouseEnter = () => {
        setDropdownVisible(true);
    };

    const handleMouseLeave = () => {
        setDropdownVisible(false);
    };

    return (
        <div
            className="CategoryButtonContainer"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <button className="CategoryButton" onClick={onClick}>
                <span>{label}</span>
            </button>
            {isDropdownVisible && <Dropdown />}
        </div>
    );
};

const CategoriesHeaderSection = () => {
    const handleDropdownClick = () => {
        // Implementa la lógica que necesitas para el click aquí
    };

    return (
        <div className="CategoriesHeaderContainer">
            &nbsp;
            <CategoryButton label="CLOTHES" onClick={handleDropdownClick} />
            <button>SHOES</button>
            <button>EQUIPMENT</button>
            <button>ACCESSORIES</button>
            <CategoryButton label="BRANDS" />
            <button>OFFERS</button>
            <CategoryButton label="SPORTS" />
        </div>
    );
};

export default CategoriesHeaderSection;