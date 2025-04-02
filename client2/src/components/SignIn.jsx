import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import { login } from '../utils/api';

const SignIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { loginWithRedirect, isAuthenticated, user } = useAuth0();

  useEffect(() => {
      if (isAuthenticated) {
          // Store the Auth0 token in localStorage (optional, depending on your API)
          user?.sub && localStorage.setItem('authToken', user.sub);
          navigate('/protected');
      }
  }, [isAuthenticated, user, navigate]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await login(username, password);

      // Store the JWT token in localStorage
      localStorage.setItem('authToken', response?.data.token);
      navigate('/protected');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h2>Sign In</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {/* <button type='submit' className='btn'>Sign In</button> */}
        <button className='btn' onClick={() => navigate('/')}>Sing Up</button>
        <button className='btn' onClick={() => loginWithRedirect()} >Sing in With TopSchool</button>
      </form>
    </div>
  );
};

export default SignIn;
