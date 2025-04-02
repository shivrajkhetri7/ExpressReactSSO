import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useNavigate } from 'react-router';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import ProtectedPage from './components/ProtectedPage';
import AuthCallback from './components/AuthCallback';

const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    console.log("ENV",)
    const token = localStorage.getItem('authToken');
    if (token) {
      navigate('/protected');
    }
  }, [navigate]);

  return (
    <div className="app">
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/auth/callback" element={<AuthCallback />}/>
        <Route path="/protected" element={<ProtectedPage />} />
      </Routes>
    </div>
  );
};

export default App;
