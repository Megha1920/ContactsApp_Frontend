import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
    const navigate = useNavigate();

    const handleLogin = () => navigate('/login');
    const handleRegister = () => navigate('/register');

    return (
        <div>
            <h1>Welcome to ContactApp</h1>
            <p>This is a platform where you can manage your contacts.</p>
            <button onClick={handleLogin}>Login</button>
            <button onClick={handleRegister}>Register</button>
        </div>
    );
};

export default LandingPage;
