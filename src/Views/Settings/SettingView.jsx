// SettingView.jsx
import React, { useState } from "react";
import { MdToggleOff, MdToggleOn } from "react-icons/md";
import "../../css/SettingView.css";

const SettingView = () => {
  const [isActive, setIsActive] = useState(false);
  const image =
    "https://res.cloudinary.com/playhardimages/image/upload/v1701149379/sjqmzsjnhdsovluojlgw.png";

  const handleToggle = () => {
    setIsActive(!isActive);
  };

  return (
    <div className="container">
      <div className="container-settings">
        <div className="text-container">
          <div className="setting-title">Settings</div>
          <div className="setting-item">
            <span>Sent invoice to email: </span>
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
        </div>
        <img src={image} alt="image" className="centered-image" />
      </div>
    </div>
  );
};

export default SettingView;
