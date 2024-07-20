import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
    const navigate = useNavigate();

    const handleLogin = () => navigate('/login');
    const handleRegister = () => navigate('/register');

    return (
        <div style={styles.container}>
            <h1 style={styles.header}>Welcome to ContactApp</h1>
            <p style={styles.paragraph}>This is a platform where you can manage your contacts.</p>
            <div style={styles.buttonContainer}>
                <button onClick={handleLogin} style={styles.button}>Login</button>
                <button onClick={handleRegister} style={styles.button}>Register</button>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#f0f2f5',
        fontFamily: 'Arial, sans-serif',
    },
    header: {
        fontSize: '2.5em',
        color: '#333',
        marginBottom: '20px',
    },
    paragraph: {
        fontSize: '1.2em',
        color: '#555',
        textAlign: 'center',
        marginBottom: '40px',
        maxWidth: '600px',
    },
    buttonContainer: {
        display: 'flex',
        gap: '20px',
    },
    button: {
        padding: '10px 20px',
        fontSize: '1em',
        color: '#fff',
        backgroundColor: '#007bff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    },
    buttonHover: {
        backgroundColor: '#0056b3',
    },
};

export default LandingPage;
