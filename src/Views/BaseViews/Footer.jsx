import React from "react";
import "../../css/Footer.css";

const Footer = () => {
  const redirectToFacebook = () => {
    window.location.href =
      "https://www.facebook.com/profile.php?id=61553708216693&mibextid=ZbWKwL";
  };

  const redirectToInstagram = () => {
    window.location.href = "https://www.instagram.com/playhard_store_isc4/";
  };

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
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">Sign Up</a>
            </li>
            <li>
              <a href="#">Catalogue</a>
            </li>
          </ul>
        </div>
        <div className="footer-column">
          <h4 className="footer-title">About Us</h4>
          <ul className="footer-links">
            <li>
              <a href="#">Company information</a>
            </li>
            <li>
              <a href="#">Contact us</a>
            </li>
            <li>
              <a href="#">Reviews</a>
            </li>
          </ul>
        </div>
        <div className="footer-column">
          <h4 className="footer-title">Location</h4>
          <ul className="footer-links">
            <li>
              <a href="#">69 Melchor Perez St. Cochabamba, Bolivia</a>
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
