import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addContact, updateContact } from '../../redux/actions/contactActions';
import { useNavigate } from 'react-router-dom';

const ContactForm = ({ contact }) => {
    const [formData, setFormData] = useState(contact || {
        first_name: '',
        last_name: '',
        address: '',
        company: '',
        phone_numbers: ''
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});

    useEffect(() => {
        setFormData(contact || {
            first_name: '',
            last_name: '',
            address: '',
            company: '',
            phone_numbers: ''
        });
    }, [contact]);

    const validateForm = () => {
        const newErrors = {};
        if (!formData.first_name) newErrors.first_name = 'First name is required';
        if (!formData.last_name) newErrors.last_name = 'Last name is required';
        if (!formData.address) newErrors.address = 'Address is required';
        if (!formData.company) newErrors.company = 'Company is required';
        if (!formData.phone_numbers || formData.phone_numbers.length === 0) newErrors.phone_numbers = 'Phone numbers are required';
        return newErrors;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = validateForm();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        
        // Convert phone_numbers from a string of comma-separated numbers to an array of objects
        const formattedPhoneNumbers = formData.phone_numbers.split(',').map(number => ({ number: number.trim() }));
        
        // Create formatted data object
        const formattedFormData = {
            ...formData,
            phone_numbers: formattedPhoneNumbers
        };

        console.log('Formatted Data:', formattedFormData); // Debugging line
        
        if (contact) {
            dispatch(updateContact(contact.id, formattedFormData));
        } else {
            dispatch(addContact(formattedFormData));
        }
        navigate('/contacts');
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
        form: {
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            maxWidth: '500px',
            padding: '20px',
            border: '1px solid #ccc',
            borderRadius: '8px',
            backgroundColor: '#f9f9f9',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        },
        input: {
            marginBottom: '15px',
            padding: '10px',
            borderRadius: '4px',
            border: '1px solid #ddd',
        },
        error: {
            color: 'red',
            marginBottom: '15px',
        },
        button: {
            backgroundColor: '#007bff',
            color: '#fff',
            cursor: 'pointer',
            border: 'none',
            padding: '10px',
            borderRadius: '4px',
            transition: 'background-color 0.3s ease',
        },
        buttonHover: {
            backgroundColor: '#0056b3',
        },
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.header}>{contact ? 'Edit Contact' : 'Add Contact'}</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
                <div>
                    <label>First Name:</label>
                    <input type="text" name="first_name" value={formData.first_name} onChange={handleChange} style={styles.input} required />
                    {errors.first_name && <div style={styles.error}>{errors.first_name}</div>}
                </div>
                <div>
                    <label>Last Name:</label>
                    <input type="text" name="last_name" value={formData.last_name} onChange={handleChange} style={styles.input} required />
                    {errors.last_name && <div style={styles.error}>{errors.last_name}</div>}
                </div>
                <div>
                    <label>Address:</label>
                    <input type="text" name="address" value={formData.address} onChange={handleChange} style={styles.input} required />
                    {errors.address && <div style={styles.error}>{errors.address}</div>}
                </div>
                <div>
                    <label>Company:</label>
                    <input type="text" name="company" value={formData.company} onChange={handleChange} style={styles.input} required />
                    {errors.company && <div style={styles.error}>{errors.company}</div>}
                </div>
                <div>
                    <label>Phone Numbers (comma separated):</label>
                    <input type="text" name="phone_numbers" value={formData.phone_numbers} onChange={handleChange} style={styles.input} required />
                    {errors.phone_numbers && <div style={styles.error}>{errors.phone_numbers}</div>}
                </div>
                <button type="submit" style={styles.button} onMouseOver={(e) => e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor} onMouseOut={(e) => e.currentTarget.style.backgroundColor = styles.button.backgroundColor}>Save</button>
            </form>
        </div>
    );
};

export default ContactForm;
