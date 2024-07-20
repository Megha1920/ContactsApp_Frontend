import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/actions/authActions';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const error = useSelector(state => state.auth.error);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(login(email, password)).then(() => {
            navigate('/contacts');
        });
    };

    // Inline styles
    const styles = {
        container: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: '50px',
        },
        form: {
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            maxWidth: '400px',
            padding: '20px',
            border: '1px solid #ccc',
            borderRadius: '8px',
            backgroundColor: '#f9f9f9',
        },
        input: {
            marginBottom: '15px',
            padding: '10px',
            borderRadius: '4px',
            border: '1px solid #ddd',
        },
        button: {
            backgroundColor: '#0056b3',
            color: '#fff',
            cursor: 'pointer',
            border: 'none',
            padding: '10px',
            borderRadius: '4px',
        },
        buttonHover: {
            backgroundColor: '#004494',
        },
        error: {
            color: 'red',
            marginBottom: '15px',
        }
    };

    return (
        <div style={styles.container}>
            <h2>Login</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
                <div>
                    <label>Email:</label>
                    <input 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                        style={styles.input}
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                        style={styles.input}
                    />
                </div>
                {error && <div style={styles.error}>{error.detail}</div>}
                <button 
                    type="submit" 
                    style={styles.button} 
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = styles.button.backgroundColor}
                >
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;
