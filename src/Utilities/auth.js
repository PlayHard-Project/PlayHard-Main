// Returns true if the token is present, false otherwise
export const isLoggedIn = () => {
    const token = localStorage.getItem('token');
    return !!token; 
  };
  