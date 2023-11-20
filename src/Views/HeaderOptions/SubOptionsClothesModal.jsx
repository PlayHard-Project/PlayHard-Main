// SubOptionsClothesModal.jsx
import React from 'react';
import Modal from 'react-modal';
import "../../css/subOptionClothesModal.css"

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
                    <a key={index} href={`/categories/${option}`} className="suboption-link">
                        {option}
                    </a>
                ))}
            </div>
        </Modal>
    );
};

export default SubOptionsClothesModal;