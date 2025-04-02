import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    if (token) {
      localStorage.setItem('authToken', token);
      navigate('/protected'); // Redirect to dashboard or protected route
    } else {
      navigate('/signin'); // Redirect to sign-in if no token
    }
  }, [navigate]);

  return <h3>Processing login... Client 2</h3>;
};

export default AuthCallback;
