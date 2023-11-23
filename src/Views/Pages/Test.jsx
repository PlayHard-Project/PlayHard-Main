import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

const Test = () => {
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Retrieve the Bearer token from the 'token' cookie
        const token = Cookies.get('token');

        if (!token) {
          console.error('No token found in cookies');
          return;
        }

        // Fetch the profile data using the Bearer token
        const response = await fetch('http://localhost:9000/api/profile', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          console.error('Failed to fetch profile data:', response.statusText);
          return;
        }

        const data = await response.json();
        setProfileData(data);

      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchData();
  }, []); // Run once on component mount

  // Use profileData in your component
  console.log(profileData);

  return (
    <div className='container'>
      Hello {profileData}
    </div>
  );
};

export default Test;
