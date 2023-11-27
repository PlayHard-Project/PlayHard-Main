import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { isLoggedIn, isUserAdmin } from "../../Utilities/auth";
import { useNavigate } from "react-router-dom";

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

  return (
    <div>
      <h2 className="container">User Profile</h2>
      {userData ? (
        <div>
          <p>ID: {userData._id}</p>
          <p>Name: {userData.name}</p>
          <p>Email: {userData.email}</p>
          <p>isAdmin: {isUserAdmin() ? "Yes" : "No"}</p>
          <button onClick={handleLogout}
          style={{ backgroundColor: 'red', color: 'white' }}
          >Logout</button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Profile;
