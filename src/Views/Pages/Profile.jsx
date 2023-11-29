import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { isLoggedIn, isUserAdmin } from "../../Utilities/auth";
import { useNavigate } from "react-router-dom";
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
    <div className="container user-profile-container">
      <h2 className="title">User Profile</h2>
      <div
          className="user-image"
          style={{
            backgroundColor: getRandomColor(),
          }}
        >
          {userData ? getInitials(userData.name) : ""}
        </div>
      {userData ? (
        <div className="user-info">
          <p>User:</p>
          <div className="username">{userData.name.toUpperCase()}</div>
          <p>Email:</p>
          <div className="email">{userData.email.toUpperCase()}</div>
          {/*<p>ID: {userData._id}</p>*/}
          {/*<p>isAdmin: {isUserAdmin() ? "Yes" : "No"}</p>*/}
          <div className="user-actions">
        <button onClick={handleLogout} className="action-button1">View History</button>
        <button onClick={handleLogout} className="action-button2">Log Out</button>
        </div>
        </div>
        
      ) : (
        <p>Please Sign-In...</p>
      )}
    </div>
  );
};

export default Profile;
