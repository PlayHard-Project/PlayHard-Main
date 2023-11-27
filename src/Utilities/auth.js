// auth.js

export const isLoggedIn = () => {
    const token = localStorage.getItem('token');
    return !!token; // Returns true if the token is present, false otherwise
  };
  