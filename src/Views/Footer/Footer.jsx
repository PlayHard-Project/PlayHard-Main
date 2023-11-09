import React from 'react';
import './Footer.css';
import facebookLogo from "../../Images/facebook-logo.png"
import instagramLogo from "../../Images/instagram-logo.png"
import xLogo from "../../Images/x-logo.png"

const Footer = () => {
    return (
        <footer className="footer">
                <div className="footer-right">
                    <div className="footer-column">
                        <h4 className="footer-title">Get Started</h4>
                        <ul className="footer-links">
                            <li><a href="#">Home</a></li>
                            <li><a href="#">Sign Up</a></li>
                            <li><a href="#">Catalogue</a></li>
                        </ul>
                    </div>
                    <div className="footer-column">
                        <h4 className="footer-title">About Us</h4>
                        <ul className="footer-links">
                            <li><a href="#">Company information</a></li>
                            <li><a href="#">Contact us</a></li>
                            <li><a href="#">Reviews</a></li>
                        </ul>
                    </div>
                    <div className="footer-column">
                        <h4 className="footer-title">Location</h4>
                        <ul className="footer-links">
                            <li><a href="#">69 Melchor Perez St. Cochabamba, Bolivia</a></li>
                        </ul>
                        <h4 className="footer-column">
                        <h4 className="footer-title">Follow us </h4>
                        </h4>
                        <div className='social-networks'>
                        <img src={facebookLogo} alt="Facebook logo" />
                        <img src={instagramLogo} alt="Instagram logo" />
                        <img src={xLogo} alt="X logo" />
                        </div>
                    
                    </div>
                </div>
                <div className='copyright-mark'>
                    <ul className="footer-copyright">
                        <li><a href="#"> © Copyright Rimel 2023. All right reserved</a></li>
                    </ul>
                </div>
        </footer>
    );
};

export default Footer;