// src/components/Register/Register.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import { register } from '../../redux/actions/authActions';

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Initialize navigate
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        password2: '',
        first_name: '',
        last_name: '',
        date_of_birth: '',
        gender: '',
        phone_number: '',
        address: '',
        profile_picture: null,
    });

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'file' ? files[0] : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await dispatch(register(formData));
            navigate('/login'); // Redirect to login page upon successful registration
        } catch (error) {
            console.error("Registration error:", error);
        }
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
            maxWidth: '500px',
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
        select: {
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
    };

    return (
        <div style={styles.container}>
            <h2>Register</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
                <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Username"
                    style={styles.input}
                />
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    style={styles.input}
                />
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    style={styles.input}
                />
                <input
                    type="password"
                    name="password2"
                    value={formData.password2}
                    onChange={handleChange}
                    placeholder="Confirm Password"
                    style={styles.input}
                />
                <input
                    type="text"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    placeholder="First Name"
                    style={styles.input}
                />
                <input
                    type="text"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                    placeholder="Last Name"
                    style={styles.input}
                />
                <input
                    type="date"
                    name="date_of_birth"
                    value={formData.date_of_birth}
                    onChange={handleChange}
                    style={styles.input}
                />
                <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    style={styles.select}
                >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                </select>
                <input
                    type="tel"
                    name="phone_number"
                    value={formData.phone_number}
                    onChange={handleChange}
                    placeholder="Phone Number"
                    style={styles.input}
                />
                <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Address"
                    style={styles.input}
                />
                <input
                    type="file"
                    name="profile_picture"
                    onChange={handleChange}
                    style={styles.input}
                />
                <button 
                    type="submit" 
                    style={styles.button} 
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = styles.button.backgroundColor}
                >
                    Register
                </button>
            </form>
        </div>
    );
};

export default Register;
