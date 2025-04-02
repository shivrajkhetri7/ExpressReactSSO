import "../style/dashboard.css"
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Dashboard = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        console.log('token', token)
        if (!token) {
            toast.error('Please log in first!');
            navigate('/signin');
        } else {
            setUserData({ name: 'Client 1' });
        }
    }, [navigate]);
    return (
        <div className='container'>
            <h1>Welcome to the Dashboard</h1>
            <p>{userData ? `Hello, ${userData.name}` : 'Loading...'}</p>
        </div>
    )
}

export default Dashboard