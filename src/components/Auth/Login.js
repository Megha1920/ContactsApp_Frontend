import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/actions/authActions';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [fieldErrors, setFieldErrors] = useState({});
    const [isEmailTouched, setIsEmailTouched] = useState(false); // Track if email field is interacted with
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Validate fields for blank entries and proper email format
    const validateFields = () => {
        const errors = {};
        if (!email) errors.email = 'Email cannot be blank';
        else if (!/\S+@\S+\.\S+/.test(email)) errors.email = 'Email must contain @ symbol and be in correct format';
        if (!password) errors.password = 'Password cannot be blank';
        return errors;
    };

    // Handle field change and apply validation
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'email') {
            setEmail(value);
            if (isEmailTouched) { // Apply email validation if email field was touched
                if (!value) {
                    setFieldErrors(prevErrors => ({ ...prevErrors, email: 'Email cannot be blank' }));
                } else if (!/\S+@\S+\.\S+/.test(value)) {
                    setFieldErrors(prevErrors => ({ ...prevErrors, email: 'Email must contain @ symbol and be in correct format' }));
                } else {
                    setFieldErrors(prevErrors => ({ ...prevErrors, email: '' }));
                }
            }
        } else if (name === 'password') {
            setPassword(value);
            if (!value) {
                setFieldErrors(prevErrors => ({ ...prevErrors, password: 'Password cannot be blank' }));
            } else {
                setFieldErrors(prevErrors => ({ ...prevErrors, password: '' }));
            }
        }
    };

    // Handle blur event for email field to check for @ presence
    const handleBlur = (e) => {
        const { name, value } = e.target;
        if (name === 'email') {
            setIsEmailTouched(true); // Mark email field as touched
            if (!value) {
                setFieldErrors(prevErrors => ({ ...prevErrors, email: 'Email cannot be blank' }));
            } else if (!/\S+@\S+\.\S+/.test(value)) {
                setFieldErrors(prevErrors => ({ ...prevErrors, email: 'Email must contain @ symbol ' }));
            } else {
                setFieldErrors(prevErrors => ({ ...prevErrors, email: '' }));
            }
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const errors = validateFields();
        if (Object.keys(errors).length > 0) {
            setFieldErrors(errors);
            return; // Prevent form submission if there are validation errors
        }

        dispatch(login(email, password))
            .then(() => {
                navigate('/contacts'); // Redirect on successful login
            })
            .catch(() => {
                // Display error message if login fails
                setErrorMessage('The given credentials are wrong. Please try again.');
                setFieldErrors({}); // Clear field-specific errors on general login error
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
            marginBottom: '5px',
            padding: '10px',
            borderRadius: '4px',
            border: '1px solid #ddd',
            width: '100%', // Ensure inputs are full width
        },
        button: {
            backgroundColor: '#0056b3',
            color: '#fff',
            cursor: 'pointer',
            border: 'none',
            padding: '10px',
            borderRadius: '4px',
            marginTop: '10px',
        },
        buttonHover: {
            backgroundColor: '#004494',
        },
        error: {
            color: 'red',
            marginBottom: '15px',
            fontSize: '0.875rem',
        },
        signupLink: {
            marginTop: '15px',
            fontSize: '0.875rem',
        },
        link: {
            color: '#0056b3',
            textDecoration: 'none',
            cursor: 'pointer',
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
                        name="email"
                        value={email} 
                        onChange={handleChange} 
                        onBlur={handleBlur} // Validate on blur
                        style={styles.input}
                    />
                    {fieldErrors.email && <div style={styles.error}>{fieldErrors.email}</div>}
                </div>
                <div>
                    <label>Password:</label>
                    <input 
                        type="password" 
                        name="password"
                        value={password} 
                        onChange={handleChange} 
                        style={styles.input}
                    />
                    {fieldErrors.password && <div style={styles.error}>{fieldErrors.password}</div>}
                </div>
                {errorMessage && <div style={styles.error}>{errorMessage}</div>}
                <button 
                    type="submit" 
                    style={styles.button} 
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = styles.button.backgroundColor}
                >
                    Login
                </button>
            </form>
            <div style={styles.signupLink}>
                Don't have an account? <Link to="/register" style={styles.link}>Sign up here.</Link>
            </div>
        </div>
    );
};

export default Login;
