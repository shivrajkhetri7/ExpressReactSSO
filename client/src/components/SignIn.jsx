import '../style/signin.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import { toast } from 'react-toastify';


const SignIn = () => {
    const navigate = useNavigate();
    const [userDetails, setUserDetails] = useState({});
    const [error, setError] = useState('');

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

            const headers = {
                'Content-Type': "application/json",
            };

            const response = await axios.post('http://localhost:8000/signin', userDetails, { headers });
            if (response?.status === 200) {
                localStorage.setItem('authToken', response?.data.token)
                toast.success('sing in successfully')
                navigate('/dashboard')
            }
        } catch (error) {
            toast.error(error.message || error?.error || 'something went wrong')
            console.error("Error during sign in:", error);
            setError(error.message);
        }
    };

    return (
        <div className='sign-in'>
            <div className='container_singin'>
                <form onSubmit={handleSubmit}>
                    <p className='title'>Sing IN</p>
                    <input
                        type='email'
                        name='username'
                        placeholder='Email'
                        value={userDetails?.username}
                        onChange={handleChange}
                        autoComplete='off'
                    />
                    <input
                        type='password'
                        name='password'
                        placeholder='Password'
                        value={userDetails?.password}
                        onChange={handleChange}
                        autoComplete='off'
                    />
                    <button type='submit' className='btn'>Sign In</button>
                    <button className='btn' onClick={() => navigate('/')}>Sing Up</button>
                </form>
            </div>
        </div>
    );
};

export default SignIn;
