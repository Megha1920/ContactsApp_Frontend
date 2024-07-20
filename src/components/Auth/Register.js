import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { register } from '../../redux/actions/authActions';

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
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
    const [fieldErrors, setFieldErrors] = useState({});
    const [profilePicName, setProfilePicName] = useState('No file chosen');
    const error = useSelector(state => state.auth.error);

    useEffect(() => {
        if (error) {
            const newFieldErrors = {};
            for (const key in error) {
                if (error.hasOwnProperty(key)) {
                    newFieldErrors[key] = error[key].join(', ');
                }
            }
            setFieldErrors(newFieldErrors);
        }
    }, [error]);

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'file' ? files[0] : value
        });

        if (name === 'phone_number') {
            const phoneNumberPattern = /^[0-9]*$/;
            if (value === '') {
                setFieldErrors(prevErrors => ({
                    ...prevErrors,
                    phone_number: 'Phone number is required'
                }));
            } else if (!phoneNumberPattern.test(value)) {
                setFieldErrors(prevErrors => ({
                    ...prevErrors,
                    phone_number: 'Phone number should only contain numbers'
                }));
            } else {
                setFieldErrors(prevErrors => ({
                    ...prevErrors,
                    phone_number: ''
                }));
            }
        }

        if (name === 'email') {
            if (!value.includes('@')) {
                setFieldErrors(prevErrors => ({
                    ...prevErrors,
                    email: 'Email must contain "@"'
                }));
            } else {
                setFieldErrors(prevErrors => ({
                    ...prevErrors,
                    email: ''
                }));
            }
        }

        if (name === 'profile_picture') {
            if (files[0]) {
                setProfilePicName(files[0].name);
            } else {
                setProfilePicName('No file chosen');
            }
        }
    };

    const validateFields = () => {
        const errors = {};
        if (!formData.username) errors.username = 'Username is required';
        if (!formData.email) errors.email = 'Email is required';
        if (!formData.password) errors.password = 'Password is required';
        if (!formData.password2) errors.password2 = 'Confirm Password is required';
        if (!formData.first_name) errors.first_name = 'First Name is required';
        if (!formData.last_name) errors.last_name = 'Last Name is required';
        if (!formData.date_of_birth) errors.date_of_birth = 'Date of Birth is required';
        if (!formData.gender) errors.gender = 'Gender is required';
        if (!formData.phone_number) errors.phone_number = 'Phone number is required';
        else {
            const phoneNumberPattern = /^[0-9]*$/;
            if (!phoneNumberPattern.test(formData.phone_number)) {
                errors.phone_number = 'Phone number should only contain numbers';
            }
        }
        if (!formData.profile_picture) errors.profile_picture = 'Profile picture is required';
        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newFieldErrors = validateFields();
        
        if (Object.keys(newFieldErrors).length > 0) {
            setFieldErrors(newFieldErrors);
            return;
        }

        try {
            await dispatch(register(formData));
            navigate('/login'); // Redirect to login page upon successful registration
        } catch (error) {
            console.error("Registration error:", error);
        }
    };

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
            marginBottom: '5px',
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
            marginTop: '10px',
        },
        buttonHover: {
            backgroundColor: '#004494',
        },
        errorMessage: {
            color: 'red',
            marginBottom: '15px',
        },
        fileInput: {
            display: 'none',
        },
        fileLabel: {
            display: 'inline-block',
            padding: '10px 15px',
            borderRadius: '4px',
            border: '1px solid #ddd',
            backgroundColor: '#f0f0f0',
            cursor: 'pointer',
            marginBottom: '15px',
            marginRight: '10px',
        },
        fileName: {
            display: 'inline-block',
            verticalAlign: 'middle',
            lineHeight: '32px',
        }
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
                {fieldErrors.username && <div style={styles.errorMessage}>{fieldErrors.username}</div>}
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    style={styles.input}
                />
                {fieldErrors.email && <div style={styles.errorMessage}>{fieldErrors.email}</div>}
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    style={styles.input}
                />
                {fieldErrors.password && <div style={styles.errorMessage}>{fieldErrors.password}</div>}
                <input
                    type="password"
                    name="password2"
                    value={formData.password2}
                    onChange={handleChange}
                    placeholder="Confirm Password"
                    style={styles.input}
                />
                {fieldErrors.password2 && <div style={styles.errorMessage}>{fieldErrors.password2}</div>}
                <input
                    type="text"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    placeholder="First Name"
                    style={styles.input}
                />
                {fieldErrors.first_name && <div style={styles.errorMessage}>{fieldErrors.first_name}</div>}
                <input
                    type="text"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                    placeholder="Last Name"
                    style={styles.input}
                />
                {fieldErrors.last_name && <div style={styles.errorMessage}>{fieldErrors.last_name}</div>}
                <input
                    type="date"
                    name="date_of_birth"
                    value={formData.date_of_birth}
                    onChange={handleChange}
                    style={styles.input}
                />
                {fieldErrors.date_of_birth && <div style={styles.errorMessage}>{fieldErrors.date_of_birth}</div>}
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
                {fieldErrors.gender && <div style={styles.errorMessage}>{fieldErrors.gender}</div>}
                <input
                    type="tel"
                    name="phone_number"
                    value={formData.phone_number}
                    onChange={handleChange}
                    placeholder="Phone Number"
                    style={styles.input}
                />
                {fieldErrors.phone_number && <div style={styles.errorMessage}>{fieldErrors.phone_number}</div>}
                <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Address"
                    style={styles.input}
                />
                {fieldErrors.address && <div style={styles.errorMessage}>{fieldErrors.address}</div>}
                <label htmlFor="profile_picture" style={styles.fileLabel}>
                    Choose Profile Picture
                </label>
                <input
                    type="file"
                    name="profile_picture"
                    id="profile_picture"
                    onChange={handleChange}
                    style={styles.fileInput}
                />
                <span style={styles.fileName}>{profilePicName}</span>
                {fieldErrors.profile_picture && <div style={styles.errorMessage}>{fieldErrors.profile_picture}</div>}
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
