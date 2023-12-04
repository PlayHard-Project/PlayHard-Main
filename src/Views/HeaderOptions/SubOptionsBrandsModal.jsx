// SubOptionsBrandsModal.jsx
import React from 'react';
import Modal from 'react-modal';
import "../../css/subOptionBrandsModal.css"
import {Link} from "react-router-dom";

/**
 * Component for rendering suboptions modal for the Brands category.
 *
 * @param {Object} props - The component properties.
 * @param {boolean} props.isOpen - Indicates whether the modal is open.
 * @param {Function} props.onRequestClose - Function to request closing the modal.
 * @param {Array} props.options - Array of suboptions for the Brands category.
 */
const SubOptionsBrandsModal = ({ isOpen, onRequestClose, options }) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            className="modal-content-suboptions-brands"
            overlayClassName="modal-overlay-suboptions-brands"
            shouldCloseOnOverlayClick={false}
        >
            <div className="modal-container-suboptions container-suboptions">
                {options.map((option, index) => (
                    <Link to={`/products/brand=${option[1]}`} key={index} className="suboption-link">
                        <label>
                            {option[0]}
                        </label>
                    </Link>
                ))}
            </div>
        </Modal>
    );
};

export default SubOptionsBrandsModal;