import "../style/signup.css"
import axios from 'axios';
import React, { useState } from 'react';
import bcrypt from 'bcryptjs';
import { toast } from "react-toastify";
import { useNavigate } from 'react-router';
import AuthImage from '../assets/Illustration.svg'


const SignUp = () => {
    const navigate = useNavigate();
    const [userDetails, setUserDetails] = useState({
        firstName: '',
        lastName: '',
        email: '',
        dob: '',
        contact: '',
        password: '',
        confirmPassword: '',
    });

    const [error, setError] = useState('');

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUserDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        try {
            event.preventDefault();

            if (userDetails.password !== userDetails.confirmPassword) {
                setError('Passwords do not match');
                return;
            }

            const hashedPassword = await bcrypt.hash(userDetails.password, 10);
            const userPayload = {
                ...userDetails,
                password: hashedPassword,
            };

            const response = await axios.post('https://expressreactsso.onrender.com/signup', userPayload, {
                headers: {
                    "Content-Type": "application/json"
                }
            })

            if (response?.status === 200 && response?.data) {
                localStorage.setItem("token", response?.data.token);
                toast.success('sing up successfully!')
                navigate('/signin');
                setUserDetails({});
            }
        } catch (error) {
            toast.error('something went wrong!')
            console.error(error)
        }

    };

    return (
        <div className='signup'>
            <div className="inner-container">
                <section className="design">
                    <img src={AuthImage} alt="Auth Image"></img>
                </section>
                <form onSubmit={handleSubmit}>
                    <p className='title'>Sing Up</p>
                    <input
                        autoComplete="off"
                        required
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        value={userDetails.firstName}
                        onChange={handleChange}
                    />
                    <input
                        required
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        value={userDetails.lastName}
                        onChange={handleChange}
                        autoComplete="off"
                    />
                    <input
                        required
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={userDetails.email}
                        onChange={handleChange}
                        autoComplete="off"
                    />
                    <input
                        required
                        type="date"
                        name="dob"
                        placeholder="Date of Birth"
                        value={userDetails.dob}
                        onChange={handleChange}
                        autoComplete="off"
                    />
                    <input
                        required
                        type="text"
                        name="contact"
                        placeholder="Contact Details"
                        value={userDetails.contact}
                        onChange={handleChange}
                        autoComplete="off"
                    />
                    <input
                        required
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={userDetails.password}
                        onChange={handleChange}
                        autoComplete="off"
                    />
                    <input
                        required
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={userDetails.confirmPassword}
                        onChange={handleChange}
                        autoComplete="off"
                    />

                    <button type="submit" className="btn">Sing Up</button>
                    <button onClick={()=>navigate('/signin')} className="btn"> Sing In</button>
                    <button onClick={()=>navigate('/signin')} className="btn"> Sing In</button>
                </form>
            </div>
        </div>
    );
};

export default SignUp;
