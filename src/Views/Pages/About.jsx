import React, { useState } from "react";
import "../../css/aboutUs.css";
import { Link } from "react-router-dom";
import Contact from "../Pages/Contact";

const About = () => {
  const [isContactVisible, setIsContactVisible] = useState(false);

  const headerIcon =
    "https://res.cloudinary.com/playhardimages/image/upload/v1700613652/pstnpenxhiugial3cije.png";
  const missionIcon =
    "https://res.cloudinary.com/playhardimages/image/upload/v1701059968/About/wzn7izmihz6knjxqots2.png";
  const visionIcon =
    "https://res.cloudinary.com/playhardimages/image/upload/v1701059968/About/qbxsopby3msylgumtlxl.png";
  const planIcon =
    "https://res.cloudinary.com/playhardimages/image/upload/v1701059967/About/akbeymgvnpfgaixkoxdj.png";

  return (
    <div className="about-container">
      <div className="container">
        <div className="container-logo">
          <img
            src={headerIcon}
            alt="Icon Main"
            style={{ margin: "auto", display: "block", width: "30%" }}
          />
          <h1 className="about-title">About Us</h1>
        </div>
        <div className="about-text">
          Welcome to PlayHard, your destination for sports fashion and
          accessories that inspire you to push your limits and stand out in
          style with every move. At the heart of our philosophy is the belief
          that sport is not just an activity, but a way of life, and we want you
          to reflect this with every piece of clothing you choose.
        </div>
        <div className="about-content">
          <div className="column">
            <div className="icon">
              <img src={missionIcon} alt="Icon Mission" />
            </div>
            <h2 className="about-subtitle">Mission</h2>
            <p className="about-subtext">
              At PlayHard, we are committed to providing our customers with the
              highest quality products that fuse functionality and sports
              fashion. We strive to be more than a store; We aspire to be your
              training partner, your daily motivation and your source of
              confidence in the world of sports.
            </p>
          </div>

          <div className="column">
            <div className="icon">
              <img src={visionIcon} alt="Icon Mission" />
            </div>
            <h2 className="about-subtitle">Vision</h2>
            <p className="about-subtext">
              At PlayHard, our vision is to empower individuals to embrace an
              active and stylish lifestyle effortlessly. We aspire to be more
              than a destination for sports apparel and accessories — we aim to
              be the catalyst that inspires people to unlock their full
              potential through the fusion of performance and fashion. In this
              vision, we see a community united by a passion for movement, where
              every purchase is a step towards self-expression and
              self-improvement. Together, we envision a world where the thrill
              of the game meets the elegance of design, and where everyone can
              look, feel, and perform at their absolute best.
            </p>
          </div>

          <div className="column">
            <div className="icon">
              <img src={planIcon} alt="Icon Mission" />
            </div>
            <h2 className="about-subtitle">Plan</h2>
            <p className="about-subtext">
              PlayHard prioritizes creating a strong brand presence through
              social media, content marketing, and influencer collaborations.
              Focused on storytelling, we showcase the quality and versatility
              of our sports apparel. Targeted advertising campaigns, data
              analytics, and personalized promotions are key elements to engage
              our audience and build lasting relationships. Our sales strategy
              emphasizes a seamless online shopping experience, competitive
              pricing, and strategic partnerships to enhance visibility and
              customer acquisition.
            </p>
          </div>
        </div>
        <div className="why-choose-us">
          <h2 className="why-choose-title">Why Choose Us</h2>
          <ul className="why-choose-list">
            <li className="why-choose-list-item">
              Unparalleled quality: Products designed to resist and stand out.
            </li>
            <li className="why-choose-list-item">
              Style and functionality: We fuse performance with fashion.
            </li>
            <li className="why-choose-list-item">
              Passionate Community: Join a community dedicated to movement and
              fashion.
            </li>
            <li className="why-choose-list-item">
              Unique shopping experience: Easy navigation, competitive pricing,
              and personalized promotions.
            </li>
          </ul>
        </div>
        <div className="contact-section">
          <h2 className="contact-title">Contact Us</h2>
          <p className="contact-text">Do you have a question or comment? We are here to help you!</p>
          <button className="contact-button" onClick={() => setIsContactVisible(!isContactVisible)}>
            Contact Us
          </button>
          <div className={`contact-map-container ${isContactVisible ? "visible" : "hidden"}`}>
            {isContactVisible && <Contact />}
            <div className="map-container">
              {/* Mapa de Google */}
              <iframe
                title="Google Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d960.8459716780966!2d-66.17527006430572!3d-17.36641240795634!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x93e3744366e94b57%3A0xd8cae80417605d8e!2sJalasoft!5e0!3m2!1ses!2sbo!4v1701029866667!5m2!1ses!2sbo"
                width="480"
                height="438"
                style={{ border: "0", marginTop:"100px"}}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
