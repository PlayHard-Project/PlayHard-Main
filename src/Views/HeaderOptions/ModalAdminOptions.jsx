import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../css/ModalHeaderOption.css';
import '../../css/headerStyle.css';
import Modal from 'react-modal';
import SubOptionsClothesModal from "./SubOptionsClothesModal";
import SubOptionsBrandsModal from "./SubOptionsBrandsModal";
import SubOptionsSportsModal from "./SubOptionsSportsModal";
import { useMediaQuery } from "react-responsive";

/**
 * Component for rendering a modal with admin options.
 *
 * @param {Object} props - The component properties.
 * @param {boolean} props.isOpen - Indicates whether the modal is open.
 * @param {Array} props.options - Array of options to be displayed in the modal.
 * @param {Function} props.onClose - Function to close the modal.
 * @param {React.RefObject} props.modalRef - Reference to the modal container.
 * @param {string} props.sectionText - Text to display as the section name.
 * @param {Function} props.onRequestOpen - Function to request opening the modal.
 * @param {Function} props.onRequestClose - Function to request closing the modal.
 */
const ModalAdminOptions = ({ isOpen, options, onClose, modalRef, sectionText, onRequestOpen, onRequestClose }) => {
    const containerWidth = options.length > 0 ? `${90 / options.length}%` : '100%';
    const [selectedOption, setSelectedOption] = useState(null);
    const isMobile = useMediaQuery({ maxWidth: 888 });

    const handleOptionClick = (option) => {
        setSelectedOption((prevOption) => (prevOption === option ? null : option));
    };

    // Close the modal if the viewport is mobile.
    useEffect(() => {
        if (isMobile) {
            handleOptionClick();
        }
    }, [isMobile]);

    // Close the modal when clicking outside of it.
    useEffect(() => {
        const handleOutsideClick = (e) => {
            if (
                isOpen &&
                modalRef &&
                modalRef.current &&
                e.target instanceof Node &&
                !modalRef.current.contains(e.target) &&
                !e.target.closest('.modal-content')
            ) {
                onRequestClose();
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [isOpen, onRequestClose, modalRef]);

    return (
        <div ref={modalRef}>
            {!isOpen ? (
                <div
                    id="setionName"
                    className="relative hidden lg:flex text"
                    style={{ cursor: 'pointer' }}
                    onClick={onRequestOpen}
                >
                    {sectionText}
                </div>
            ) : (
                <div
                    id="setionName"
                    className="relative hidden lg:flex text"
                    style={{ cursor: 'pointer' }}
                >
                    <div
                        onClick={onRequestClose}
                        className="text"
                    >
                        {sectionText}
                    </div>
                </div>
            )}
            <Modal
                isOpen={isOpen}
                onRequestClose={onRequestClose}
                className="modal-content-options"
                overlayClassName="modal-overlay-options"
                shouldCloseOnOverlayClick={false}
            >
                <div className="modal-container-options container-options" ref={modalRef}>
                    {options.map((option, index) => (
                        <div
                            key={index}
                            style={{ flex: `0 0 ${containerWidth}`, cursor: 'pointer', display: 'flex', justifyContent: 'center' }}
                            onClick={() => handleOptionClick(option.label)}
                        >
                            <div>
                                {['Clothes', 'Brands', 'Sports'].includes(option.label) ? (
                                    <div>{option.label}</div>
                                ) : (
                                    <Link to={`/categories/${option.label}`} style={{ fontSize: '16px', fontFamily: 'Montserrat, cursive' }}>
                                        {option.label}
                                    </Link>
                                )}
                            </div>
                            {option.icon && (
                                <span style={{ marginLeft: '20px', marginTop:'4px' }}>{option.icon}</span>
                            )}
                        </div>
                    ))}
                </div>
            </Modal>

            {selectedOption === 'Clothes' && (
                <SubOptionsClothesModal
                    isOpen={selectedOption === 'Clothes'}
                    onRequestClose={() => setSelectedOption(null)}
                    options={['T-Shrits', 'Jerseys', 'Hoodies', 'Jackets', 'Shorts', 'Pants', 'Socks']}
                />
            )}
            {selectedOption === 'Brands' && (
                <SubOptionsBrandsModal
                    isOpen={selectedOption === 'Brands'}
                    onRequestClose={() => setSelectedOption(null)}
                    options={['Adidas', 'Asics', 'Fila', 'Givenchy', 'New Balance', 'Nike', 'Puma', 'Under Armour', 'Vans', 'Champion', 'Wilson']}
                />
            )}
            {selectedOption === 'Sports' && (
                <SubOptionsSportsModal
                    isOpen={selectedOption === 'Sports'}
                    onRequestClose={() => setSelectedOption(null)}
                    options={['Basketball', 'Soccer', 'Yoga', 'Gym', 'Tennis', 'Cycling', 'Swimming', 'Golf']}
                />
            )}
        </div>
    );
};

export default ModalAdminOptions;