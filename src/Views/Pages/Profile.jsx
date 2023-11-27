import React, { useState, useEffect } from "react";
import {jwtDecode} from "jwt-decode";
import { isLoggedIn } from "../../Utilities/auth"; // Adjust the path based on your project structure

const Profile = () => {
  const [userData, setUserData] = useState(null);
  useEffect(() => {

// Assuming you have the token stored in localStorage
const token = localStorage.getItem('token');
console.log('This is coded');
console.log(token);

if (token) {
  // Decode the token
  const decoded = jwtDecode(token);
  console.log('This is decoded');
  console.log(decoded); // Add this line to see the decoded object in the console

  // Access user information based on your token structure
  const { _id, name, email } = decoded; // or adjust accordingly based on the actual structure

  // Set user data in the state
  setUserData({ _id, name, email });
    }    
  }, []);

  return (
    <div>
      <h2 className='container'>User Profile</h2>
      {userData ? (
        <div>
          <p>ID: {userData._id}</p>
          <p>Name: {userData.name}</p>
          <p>Email: {userData.email}</p>
          {/* Add more fields as needed */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Profile;
