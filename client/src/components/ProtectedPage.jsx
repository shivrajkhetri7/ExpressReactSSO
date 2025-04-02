import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

const ProtectedPage = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');

    if (!token) {
      navigate('/signin');
    } else {
      fetch('http://localhost:8000/protected', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json', // Always a good idea to set content-type for POST requests
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
          }
          return response.json();
        })
        .then((data) => {
          console.log("Protected data:", data);
          setUser({ firstName: data.user.firstName, lastName: data.user.lastName });
        })
        .catch((error) => {
          console.error('Error fetching user data:', error);
          navigate('/signin');
        });
    }
  }, [navigate]);

  return (
    <div>
      {user ? (
        <div>
          <h1>Protected Page</h1>
          <p>Welcome, {user?.firstName} {user?.lastName}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ProtectedPage;
