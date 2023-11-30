import React, { useState } from "react";
import { MdToggleOff, MdToggleOn } from "react-icons/md";
import "../../css/SettingView.css";
import useLocalStorage from "../../Utilities/useLocalStorage";

const SettingView = () => {
  const [isActiveMarketing, setIsActiveMarketing] = useState(false);
  const [storedValue, setStoredValue] = useLocalStorage(
    "sendEmailSettings",
    false
  );
  const [isActiveInvoice, setIsActiveInvoice] = useState(storedValue);
  const image =
    "https://res.cloudinary.com/playhardimages/image/upload/v1701149379/sjqmzsjnhdsovluojlgw.png";

  const handleToggleSendInvoiceEmail = () => {
    setIsActiveInvoice(!isActiveInvoice);
  };

  const handleToggleSendMarketingEmail = () => {
    setIsActiveMarketing(!isActiveMarketing);
  };

  return (
    <div className="container md:flex" style={{ height: "930px" }}>
      <div className="container-settings">
        <div className="text-container">
          <div className="setting-title">Settings</div>
          <div className="setting-item">
            <span className="span-style">Sent invoice to email: </span>
            <button
              onClick={handleToggleSendInvoiceEmail}
              className={`toggle-button ${
                isActiveInvoice ? "active" : "inactive"
              }`}
            >
              {isActiveInvoice ? (
                <MdToggleOn
                  className="toggle-icon"
                  onClick={() => setStoredValue(false)}
                />
              ) : (
                <MdToggleOff
                  className="toggle-icon"
                  onClick={() => setStoredValue(true)}
                />
              )}
            </button>
          </div>

          <div className="setting-item">
            <span className="span-style">Receive marketing emails: </span>
            <button
              onClick={handleToggleSendMarketingEmail}
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
          <img src={image} alt="cover.png" className="centered-image" />
        </div>
      </div>
    </div>
  );
};

export default SettingView;
