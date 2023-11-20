// SubOptionsClothesModal.jsx
import React from 'react';
import Modal from 'react-modal';
import "../../css/subOptionSportModal.css"

const SubOptionsSportsModal = ({ isOpen, onRequestClose, options }) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            className="modal-content-suboptions-sport"
            overlayClassName="modal-overlay-suboptions-sports"
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

export default SubOptionsSportsModal;