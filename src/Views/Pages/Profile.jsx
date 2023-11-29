import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { isLoggedIn, isUserAdmin, getUserID } from "../../Utilities/auth";
import { Link, useNavigate } from "react-router-dom";
import "../../css/Profile.css";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const decoded = jwtDecode(token);
      const { _id, name, email } = decoded;
      setUserData({ _id, name, email });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/sign-in");
  };

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((part) => part.charAt(0).toUpperCase())
      .join("");
  };

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  return (
    <div className="container general-view">
    <div className="container user-profile-container">
      <h2 className="title-profile">User Profile</h2>
      <div className="user-image">
          {userData ? getInitials(userData.name) : ""}
        </div>
      {userData ? (
        <div className="user-info">
          <p className="user-title">User:</p>
          <div className="username">{userData.name.toUpperCase()}</div>
          <p className="email-title">Email:</p>
          <div className="email">{userData.email.toUpperCase()}</div>
          {/*<p>{getUserID()}</p>*/}
          <div className="user-actions">
          <Link to="/history" >
          <button className="view-history-button">View History</button>  
          </Link>
        
        <button onClick={handleLogout} className="log-out-button">Log Out</button>
        </div>
        </div>
        
      ) : (
        <p>Please Sign-In...</p>
      )}
    </div>
    </div>
  );
};

export default Profile;
