import { jwtDecode } from "jwt-decode";

/**
 * Returns true if the token is present, false otherwise
 * @returns token
 */
export const isLoggedIn = () => {
    const token = localStorage.getItem('token');
    return !!token; 
  };


  export const isUserAdmin = () => {
    const token = localStorage.getItem("token");
  
    if (token) {
      const decoded = jwtDecode(token);
      if (decoded.isAdmin) {
        return true;
      }
    }
    return false;
  };

/**
 * Returns the user's id if the token is present, -1 otherwise user is not logged in
 * @returns 
 */
  export const getUserID = () => {
    const token = localStorage.getItem("token");
  
    if (token) {
      const decoded = jwtDecode(token);
      return decoded._id;
    }

    return -1;
  };

  /**
 * Returns the user's name if the token is present, null otherwise user is not logged in
 * @returns 
 */
  export const getUsername = () => {
    const token = localStorage.getItem("token");
  
    if (token) {
      const decoded = jwtDecode(token);
      return decoded.name;
    }

    return null;
  };
  

    /**
 * Returns the user's name if the token is present, null otherwise user is not logged in
 * @returns 
 */
    export const getEmail = () => {
      const token = localStorage.getItem("token");
    
      if (token) {
        const decoded = jwtDecode(token);
        return decoded.email;
      }
      
      return null;
    };
    