import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../css/ModalHeaderOption.css';
import '../../css/headerStyle.css';
import Modal from 'react-modal';
import { useMediaQuery } from 'react-responsive';

/**
 * ModalAdminPanel Component
 *
 * A modal component that displays options related to product management in an admin panel.
 *
 * @component
 *
 * @param {boolean} isOpen - Indicates whether the modal is open or closed. (required)
 * @param {Function} onClose - Function to close the modal. (required)
 * @param {React.RefObject} modalRef - React ref to the modal container.
 * @param {string} sectionText - Text to be displayed in the header section.
 * @param {Function} onRequestOpen - Function to handle the request to open the modal.
 * @param {Function} onRequestClose - Function to handle the request to close the modal.
 */
const ModalAdminPanel = ({ isOpen, onClose, modalRef, sectionText, onRequestOpen, onRequestClose }) => {
    const containerWidth = '33.33%';
    const [selectedOption, setSelectedOption] = useState(null);
    const isMobile = useMediaQuery({ maxWidth: 888 });

    /**
     * Handles the click event for an option and closes the modal.
     * @param {string} path - The path to navigate when an option is clicked.
     */
    const handleOptionClick = (path) => {
        setSelectedOption(null);
        onRequestClose();
    };

    // Close the modal on mobile view
    useEffect(() => {
        if (isMobile) {
            handleOptionClick();
        }
    }, [isMobile]);

    // Close the modal when clicking outside
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
                <div id="setionName" className="relative hidden lg:flex text" style={{ cursor: 'pointer' }}>
                    <div onClick={onRequestClose} className="text">
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
                    <div
                        style={{
                            flex: `0 0 ${containerWidth}`,
                            cursor: 'pointer',
                            display: 'flex',
                            justifyContent: 'center',
                        }}
                        onClick={() => handleOptionClick('/admin/add-product')}
                    >
                        <div>
                            <Link to="/admin/add-product" style={{ fontSize: '16px', fontFamily: 'Montserrat, cursive' }}>
                                Add Product
                            </Link>
                        </div>
                    </div>
                    <div
                        style={{
                            flex: `0 0 ${containerWidth}`,
                            cursor: 'pointer',
                            display: 'flex',
                            justifyContent: 'center',
                        }}
                        onClick={() => handleOptionClick('/admin/edit-product')}
                    >
                        <div>
                            <Link to="/admin/edit-product" style={{ fontSize: '16px', fontFamily: 'Montserrat, cursive' }}>
                                Edit Product
                            </Link>
                        </div>
                    </div>
                    <div
                        style={{
                            flex: `0 0 ${containerWidth}`,
                            cursor: 'pointer',
                            display: 'flex',
                            justifyContent: 'center',
                        }}
                        onClick={() => handleOptionClick('/admin/delete-product')}
                    >
                        <div>
                            <Link to="/admin/delete-product" style={{ fontSize: '16px', fontFamily: 'Montserrat, cursive' }}>
                                Delete Product
                            </Link>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default ModalAdminPanel;