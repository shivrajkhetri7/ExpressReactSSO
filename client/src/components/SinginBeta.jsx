import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router';

const SignInBeta = () => {
  const { loginWithRedirect, isAuthenticated, user } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      // Store the Auth0 token in localStorage (optional, depending on your API)
      user?.sub && localStorage.setItem('authToken', user.sub);
      navigate('/protected');
    }
  }, [isAuthenticated, user, navigate]);

  return (
    <div>
      <h2>Sign In</h2>
      <button onClick={() => loginWithRedirect()}>Log in with Auth0</button>
    </div>
  );
};

export default SignInBeta;
