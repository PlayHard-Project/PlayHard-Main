import { jwtDecode } from "jwt-decode";

// Returns true if the token is present, false otherwise
export const isLoggedIn = () => {
    const token = localStorage.getItem('token');
    return !!token; 
  };


  export const isUserAdmin = () => {
    const token = localStorage.getItem("token");
  
    if (token) {
      // Decode the token
      const decoded = jwtDecode(token);
      // Check if the user is an admin
      if (decoded.isAdmin) {
        return true;
      }
    }
    return false;
  };
  