// SettingView.jsx
import React, { useState } from "react";
import { MdToggleOff, MdToggleOn } from "react-icons/md";
import "../../css/SettingView.css";

const SettingView = () => {
  const [isActive, setIsActive] = useState(false);
  const [isActiveMarketing, setIsActiveMarketing] = useState(false);
  const image =
    "https://res.cloudinary.com/playhardimages/image/upload/v1701149379/sjqmzsjnhdsovluojlgw.png";

  const handleToggle = () => {
    setIsActive(!isActive);
  };

  const handleToggleMarketingEmail = () => {
    setIsActiveMarketing(!isActiveMarketing);
  };

  return (
    <div className="container md:flex" style={{height:'930px'}}>
      <div className="container-settings">
        <div className="text-container">
          <div className="setting-title">Settings</div>
          <div className="setting-item">
            <span className="span-style">Sent invoice to email: </span>
            <button
              onClick={handleToggle}
              className={`toggle-button ${isActive ? "active" : "inactive"}`}
            >
              {isActive ? (
                <MdToggleOn className="toggle-icon" />
              ) : (
                <MdToggleOff className="toggle-icon" />
              )}
            </button>
          </div>

          <div className="setting-item">
            <span className="span-style">Receive marketing emails: </span>
            <button
              onClick={handleToggleMarketingEmail}
              className={`toggle-button ${
                isActiveMarketing ? "active" : "inactive"
              }`}
            >
              {isActiveMarketing ? (
                <MdToggleOn className="toggle-icon" />
              ) : (
                <MdToggleOff className="toggle-icon" />
              )}
            </button>
          </div>
        </div>
        <div className="hidden lg:block">
          <img src={image} alt="image" className="centered-image" />
        </div>
      </div>
    </div>
  );
};

export default SettingView;
