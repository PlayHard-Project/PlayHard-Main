// SubCategoriesOptions.jsx
import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";

/**
 * Component for rendering subcategories options.
 *
 * @param {Object} props - The component properties.
 * @param {Function} props.handleCloseModal - Function to close the subcategories modal.
 * @param {Array} props.options - Array of subcategories options.
 * @param {Function} props.toggleOption - Function to toggle a subcategory option.
 */
const SubCategoriesOptions = ({ handleCloseModal, options, toggleOption, handleSecondModal, handleCategoriesModal, handleCloseMenuModal }) => {
    return (
        <div className="absolute p-2 shadow-lg popup space-y-1 flex flex-col items-start" style={{ marginTop: '-11px', marginLeft: '-10px', width:'210px', minHeight:'260px' }}>
            <MdArrowBack
                size={20}
                color="#72a3ff"
                className="style-icon"
                onClick={() => {
                    handleCloseModal();
                    handleSecondModal();
                }}
            />
            {options.map((option, index) => (
                <Link to={`${option.route}`} key={index} className="text-link">
                    <label
                        className="relative flex items-center text-link"
                        onClick={() => {
                            toggleOption(option);
                            handleCloseModal();
                            handleCategoriesModal();
                            handleSecondModal();
                            handleCloseMenuModal();
                        }}
                    >
                        {option.label}
                    </label>
                </Link>
            ))}
        </div>
    );
};

// PropTypes for component validation
SubCategoriesOptions.propTypes = {
    handleCloseModal: PropTypes.func.isRequired,
    options: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            showArrow: PropTypes.bool,
            arrowMargin: PropTypes.string,
        })
    ).isRequired,
    toggleOption: PropTypes.func.isRequired,
};

export default SubCategoriesOptions;