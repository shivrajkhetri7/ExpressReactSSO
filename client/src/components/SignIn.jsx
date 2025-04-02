import '../style/signin.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { toast } from 'react-toastify';

const SignIn = () => {
    const navigate = useNavigate();
    const [userDetails, setUserDetails] = useState({});
    const [error, setError] = useState('');
    const [redirectTo, setRedirectTo] = useState('');

    // Extract the redirect URL from query params (Fix: use "redirect_uri" instead of "redirect")
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const redirectParam = params.get("redirect_uri");
        if (redirectParam) {
            setRedirectTo(redirectParam);
        }
    }, []);

    const handleChange = (event) => {
        setUserDetails({ ...userDetails, [event?.target?.name]: event?.target?.value });
    };

    const loginPayloadValidation = async (user) => {
        if (!user?.username) throw new Error("Username is required");
        if (!user?.password) throw new Error("Password is required");
        return true;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await loginPayloadValidation(userDetails);

            const headers = { 'Content-Type': "application/json" };
            const response = await axios.post('https://expressreactsso.onrender.com/signin', userDetails, { headers });

            if (response?.status === 200) {
                localStorage.setItem('authToken', response?.data.token);
                toast.success('Signed in successfully');

                if (redirectTo) {
                    // ✅ Redirect back to Client 2 with the token
                    window.location.href = `${redirectTo}?token=${response?.data.token}`;
                } else {
                    navigate('/dashboard'); // Stay on Client 1 if no redirect
                }
            }
        } catch (error) {
            toast.error(error.message || 'Something went wrong');
            setError(error.message);
        }
    };

    return (
        <div className='sign-in'>
            <div className='container_singin'>
                <form onSubmit={handleSubmit}>
                    <p className='title'>Sign In</p>
                    <input
                        type='email'
                        name='username'
                        placeholder='Email'
                        value={userDetails?.username || ''}
                        onChange={handleChange}
                        autoComplete='off'
                    />
                    <input
                        type='password'
                        name='password'
                        placeholder='Password'
                        value={userDetails?.password || ''}
                        onChange={handleChange}
                        autoComplete='off'
                    />
                    <button type='submit' className='btn'>Sign In</button>
                </form>
            </div>
        </div>
    );
};

export default SignIn;
