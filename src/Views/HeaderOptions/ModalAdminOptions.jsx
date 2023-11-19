import React, { useEffect } from 'react';
import '../../css/ModalHeaderOption.css';
import '../../css/headerStyle.css'
import Modal from "react-modal";

const ModalAdminOptions = ({ isOpen, options, onClose,modalRef, sectionText, onRequestOpen, onRequestClose }) => {
    const containerWidth = options.length > 0 ? `${90 / options.length}%` : '100%';


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

        document.addEventListener("mousedown", handleOutsideClick);

        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, [isOpen, onRequestClose, modalRef]);

    return (
        <div ref={modalRef}>
            {
                !isOpen ? (
                    <div
                        id="setionName"
                        className="relative hidden lg:flex text"
                        style={{ cursor: "pointer"}}
                        onClick={onRequestOpen}
                    >{sectionText}
                    </div>
                ) : (
                    <div
                        id="setionName"
                        className="relative hidden lg:flex text"
                        style={{ cursor: "pointer" }}
                    >
                        <div
                            onClick={onRequestClose}
                            className="text text-active"
                        >{sectionText}
                        </div>
                    </div>
                )
            }
            <Modal
                isOpen={isOpen}
                onRequestClose={onRequestClose}
                className="modal-content-options"
                overlayClassName="modal-overlay-options"
                shouldCloseOnOverlayClick={false}
            >
                <div className="modal-container-options container-options" ref={modalRef}>
                    {options.map((option, index) => (
                        <div key={index} style={{ flex: `0 0 ${containerWidth}`, cursor: 'pointer' }}>
                            <div className="option-text">{option}</div>
                        </div>
                    ))}
                </div>
            </Modal>
        </div>
    );
};

export default ModalAdminOptions;