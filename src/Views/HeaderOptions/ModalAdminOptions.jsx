import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../css/ModalHeaderOption.css';
import '../../css/headerStyle.css';
import Modal from 'react-modal';
import SubOptionsClothesModal from "./SubOptionsClothesModal";
import SubOptionsBrandsModal from "./SubOptionsBrandsModal";
import SubOptionsSportsModal from "./SubOptionsSportsModal";
import { useMediaQuery } from "react-responsive";

const ModalAdminOptions = ({ isOpen, options, onClose, modalRef, sectionText, onRequestOpen, onRequestClose }) => {
    const containerWidth = options.length > 0 ? `${80 / options.length}%` : '100%';
    const [selectedOption, setSelectedOption] = useState(null);
    const [subOptionsBrandsModalOpen, setSubOptionsBrandsModalOpen] = useState(false);
    const [subOptionsClothesModalOpen, setSubOptionsClothesModalOpen] = useState(false);
    const [subOptionsSportsModalOpen, setSubOptionsSportsModalOpen] = useState(false);


    const isMobile = useMediaQuery({ maxWidth: 888 });

    const handleOptionClick = (option) => {
        setSelectedOption((prevOption) => (prevOption === option ? null : option));
    };

    useEffect(() => {
        if (isMobile) {
            handleOptionClick();
        }
    }, [isMobile]);

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

    useEffect(() => {
        if (!isOpen) {
            setSubOptionsBrandsModalOpen(false);
            setSubOptionsClothesModalOpen(false);
            setSubOptionsSportsModalOpen(false)
        }
    }, [isOpen]);

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
                        onClick={() => {
                            onRequestClose();
                            setSubOptionsBrandsModalOpen(false);
                            setSubOptionsClothesModalOpen(false);
                            setSubOptionsSportsModalOpen(false)
                        }}
                        className="text text-active"
                    >
                        {sectionText}
                    </div>
                </div>
            )}
            <Modal
                isOpen={isOpen}
                onRequestClose={() => {
                    onRequestClose();
                    setSubOptionsBrandsModalOpen(false);
                    setSubOptionsClothesModalOpen(false);
                    setSubOptionsSportsModalOpen(false)
                }}
                className="modal-content-options"
                overlayClassName="modal-overlay-options"
                shouldCloseOnOverlayClick={false}
            >
                <div className="modal-container-options container-options" ref={modalRef}>
                    {options.map((option, index) => (
                        <div
                            key={index}
                            style={{ flex: `0 0 ${containerWidth}`, cursor: 'pointer', display: 'flex', justifyContent: 'center' }}
                            onClick={() => {
                                handleOptionClick(option.label);
                                if (option.label === 'Brands') { setSubOptionsBrandsModalOpen(true);}
                                if(option.label === 'Clothes'){ setSubOptionsClothesModalOpen(true);}
                                if(option.label === 'Sports'){setSubOptionsSportsModalOpen(true);}
                            }}
                        >
                            <div>
                                {['Clothes', 'Brands', 'Sports'].includes(option.label) ? (
                                    <div>{option.label}</div>
                                ) : (
                                    <Link to={`/products/categories=${option.label}`} style={{ fontSize: '16px', fontFamily: 'Montserrat, cursive' }}>
                                        {option.label}
                                    </Link>
                                )}
                            </div>
                            {option.icon && (
                                <span style={{ marginLeft: '20px', marginTop: '4px' }}>{option.icon}</span>
                            )}
                        </div>
                    ))}
                </div>
            </Modal>

            {selectedOption === 'Clothes' && (
                <SubOptionsClothesModal
                    isOpen={selectedOption === 'Clothes' && subOptionsClothesModalOpen}
                    onRequestClose={() => {setSelectedOption(null); setSubOptionsClothesModalOpen(false)}}
                    options={['T-shirt', 'Jersey', 'Hoodies', 'Jackets', 'Shorts', 'Pants', 'Socks', 'Shoes', 'Underwear']}
                />
            )}
            {selectedOption === 'Brands' && (
                <SubOptionsBrandsModal
                    isOpen={selectedOption === 'Brands' && subOptionsBrandsModalOpen}
                    onRequestClose={() => {
                        setSelectedOption(null);
                        setSubOptionsBrandsModalOpen(false);
                    }}
                    options={[['Adidas', '654c3e2460c78adccb61fbc4'], ['Asics', '654c3e2460c78adccb61fbd4'],
                        ['Fila', '654c3e2460c78adccb61fbd6'], ['Givenchy', '654c3e2460c78adccb61fbc6'],
                        ['New Balance', '654c3e2460c78adccb61fbc8'], ['Nike', '654c3e2460c78adccb61fbca'],
                        ['Puma', '654c3e2460c78adccb61fbcc'], ['Under Armour', '654c3e2460c78adccb61fbce'],
                        ['Vans', '654c3e2460c78adccb61fbd0'], ['Champion', '654c3e2460c78adccb61fbd2'],
                        ['Wilson', '654c41ca1754c5a319281642']]}
                />
            )}
            {selectedOption === 'Sports' && (
                <SubOptionsSportsModal
                    isOpen={selectedOption === 'Sports' && subOptionsSportsModalOpen}
                    onRequestClose={() => {setSelectedOption(null); setSubOptionsSportsModalOpen(false)}}
                    options={['Training', 'Skateboarding', 'Soccer', 'Tennis',
                        'Yoga',
                        'Golf',
                        'Baseball',
                        'American Football',
                        'Basketball',
                        'Volleyball']}
                />
            )}
        </div>
    );
};

export default ModalAdminOptions;