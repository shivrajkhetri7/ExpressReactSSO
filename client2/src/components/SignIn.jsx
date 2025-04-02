import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import { login } from '../utils/api';

const CLIENT_1_LOGIN_URL = "https://express-react-sso.vercel.app/signin"; 
const CLIENT_1_CALLBACK_URL = "https://express-react-sso-jpnh.vercel.app/auth/callback"; 

const SignIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { loginWithRedirect, isAuthenticated, user } = useAuth0();

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (authToken) {
      navigate("/protected");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await login(username, password);
      localStorage.setItem('authToken', response?.data.token);
      navigate('/protected');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSSOLogin = () => {
    localStorage.setItem("returnTo", window.location.href);
    window.location.href = `${CLIENT_1_LOGIN_URL}?redirect_uri=${encodeURIComponent(CLIENT_1_CALLBACK_URL)}`;
  };

  return (
    <div>
      <h2>Sign In Client 2</h2>
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
        <button type="submit" className="btn">Sign In</button>
        <button className="btn" onClick={() => navigate('/')}>Sign Up</button>
        <button className="btn" onClick={handleSSOLogin}>Sign in With Client 1</button>
      </form>
    </div>
  );
};

export default SignIn;
