import React from "react";
import "../../css/Footer.css";
import { Link } from "react-router-dom";

/**
 * Footer Component
 * 
 * This component represents the footer section of the website, containing links, company information,
 * location details, and social media icons.
 */
const Footer = () => {
  /**
   * Redirects the user to the Facebook page.
   */
  const redirectToFacebook = () => {
    window.location.href =
      "https://www.facebook.com/profile.php?id=61553708216693&mibextid=ZbWKwL";
  };

  /**
   * Redirects the user to the Instagram page.
   */
  const redirectToInstagram = () => {
    window.location.href = "https://www.instagram.com/playhard_store_isc4/";
  };

  /**
   * Redirects the user to the X page.
   */
  const redirectToX = () => {
    window.location.href =
      "https://x.com/JalaPlayhard?t=5I1od4ItcbSm6jxte-DWdQ&s=09";
  };

  return (
    <footer className="footer container">
      <div className="footer-right">
        <div className="footer-column">
          <h4 className="footer-title">Get Started</h4>
          <ul className="footer-links">
            <div>
              <Link to="/" style={{color: 'white', textDecoration: 'none', borderBottom: '2px solid transparent', transition: 'border-color 0.3s'}} onMouseOver={(e) => e.target.style.borderBottom = '2px solid white'} onMouseOut={(e) => e.target.style.borderBottom = '2px solid transparent'}>
                Home
              </Link>
            </div>
            <div>
              <Link to="/sign-up" style={{color: 'white', textDecoration: 'none', borderBottom: '2px solid transparent', transition: 'border-color 0.3s'}} onMouseOver={(e) => e.target.style.borderBottom = '2px solid white'} onMouseOut={(e) => e.target.style.borderBottom = '2px solid transparent'}>
                Sign Up
              </Link>
            </div>
            <div>
              <Link to="/products" style={{color: 'white', textDecoration: 'none', borderBottom: '2px solid transparent', transition: 'border-color 0.3s'}} onMouseOver={(e) => e.target.style.borderBottom = '2px solid white'} onMouseOut={(e) => e.target.style.borderBottom = '2px solid transparent'}>
                Catalogue
             </Link>
            </div>
          </ul>
        </div>
        <div className="footer-column">
          <h4 className="footer-title">About Us</h4>
          <ul className="footer-links">
            <li>
              <a href="#">Company information</a>
            </li>
            <div>
              <Link to="/contact" style={{color: 'white', textDecoration: 'none', borderBottom: '2px solid transparent', transition: 'border-color 0.3s'}} onMouseOver={(e) => e.target.style.borderBottom = '2px solid white'} onMouseOut={(e) => e.target.style.borderBottom = '2px solid transparent'}>
                Contact Us
             </Link>
            </div>
          </ul>
        </div>
        <div className="footer-column">
          <h4 className="footer-title">Location</h4>
          <ul className="footer-links">
            <li>
              <a href="https://maps.app.goo.gl/YTQ4P8mfNTJneXpG9" target="_blank">69 Melchor Perez St. Cochabamba, Bolivia</a>
            </li>
          </ul>
          <h4 className="footer-column">
            <h4 className="footer-title">Follow Us </h4>
          </h4>
          <div className="social-networks">
            <img
              className="social-icon"
              src="https://res.cloudinary.com/playhardimages/image/upload/v1699734518/SocialNetworks/facebook-logo.png"
              alt="Facebook logo"
              onClick={redirectToFacebook}
            />
            <img
              className="social-icon"
              src="https://res.cloudinary.com/playhardimages/image/upload/v1699734567/SocialNetworks/instagram-logo.png"
              alt="Instagram logo"
              onClick={redirectToInstagram}
            />
            <img
              className="social-icon"
              src="https://res.cloudinary.com/playhardimages/image/upload/v1699734567/SocialNetworks/x-logo.png"
              alt="X logo"
              onClick={redirectToX}
            />
          </div>
        </div>
      </div>
      <div className="copyright-mark">
        <ul className="footer-copyright">
          <li>
            <a href="#"> © Copyright Rimel 2023. All right reserved</a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;