// SubOptionsClothesModal.jsx
import React from 'react';
import Modal from 'react-modal';
import "../../css/subOptionClothesModal.css"
import {Link} from "react-router-dom";

/**
 * Component for rendering suboptions modal for the Clothes category.
 *
 * @param {Object} props - The component properties.
 * @param {boolean} props.isOpen - Indicates whether the modal is open.
 * @param {Function} props.onRequestClose - Function to request closing the modal.
 * @param {Array} props.options - Array of suboptions for the Clothes category.
 */
const SubOptionsClothesModal = ({ isOpen, onRequestClose, options }) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            className="modal-content-suboptions"
            overlayClassName="modal-overlay-suboptions"
            shouldCloseOnOverlayClick={false}
        >
            <div className="modal-container-suboptions container-suboptions">
                {options.map((option, index) => (
                    <Link to={`/products/categories=${option}`} key={index} className="suboption-link">
                        <label key={index}>
                            {option}
                        </label>
                    </Link>
                ))}
            </div>
        </Modal>
    );
};

export default SubOptionsClothesModal;