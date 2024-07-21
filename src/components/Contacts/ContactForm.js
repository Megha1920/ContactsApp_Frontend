import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addContact, updateContact } from '../../redux/actions/contactActions';
import { useNavigate } from 'react-router-dom';

const ContactForm = ({ contact }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        id: contact ? contact.id : '',
        first_name: contact ? contact.first_name : '',
        last_name: contact ? contact.last_name : '',
        address: contact ? contact.address : '',
        company: contact ? contact.company : '',
        phone_numbers: contact ? contact.phone_numbers.map(phone => phone.number).join(', ') : ''
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'phone_numbers') {
            // Validate phone numbers
            if (/[^0-9,]/.test(value)) {
                setErrors(prevErrors => ({ ...prevErrors, phone_numbers: 'Phone numbers must be numeric and comma-separated.' }));
            } else if (value.replace(/,/g, '').length < 10 && value.trim() !== '') {
                setErrors(prevErrors => ({ ...prevErrors, phone_numbers: 'Phone numbers must be at least 10 digits long.' }));
            } else {
                setErrors(prevErrors => ({ ...prevErrors, phone_numbers: '' }));
            }
        }
        setFormData({ ...formData, [name]: value });
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.first_name) newErrors.first_name = 'First name is required';
        if (!formData.last_name) newErrors.last_name = 'Last name is required';
        if (!formData.address) newErrors.address = 'Address is required';
        if (!formData.company) newErrors.company = 'Company is required';
        if (!formData.phone_numbers) newErrors.phone_numbers = 'Phone numbers are required';
        else {
            // Validate phone numbers
            const phoneNumbers = formData.phone_numbers.split(',').map(number => number.trim());
            const invalidNumbers = phoneNumbers.filter(number => !/^\d{10,}$/.test(number));
            if (invalidNumbers.length > 0) newErrors.phone_numbers = 'Phone numbers must be at least 10 digits long and numeric.';
        }
        return newErrors;
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
        const formattedFormData = {
            ...formData,
            phone_numbers: formattedPhoneNumbers
        };

        if (contact) {
            dispatch(updateContact(contact.id, formattedFormData));
        } else {
            dispatch(addContact(formattedFormData));
        }
        navigate('/contacts');
    };

    const styles = {
        form: {
            display: 'flex',
            flexDirection: 'column',
            width: '300px',
            margin: 'auto',
            backgroundColor: '#fff',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        },
        input: {
            marginBottom: '15px',
            padding: '10px',
            borderRadius: '4px',
            border: '1px solid #ddd',
            fontSize: '16px',
            width: '100%',
        },
        button: {
            backgroundColor: '#007bff',
            color: '#fff',
            cursor: 'pointer',
            border: 'none',
            padding: '10px',
            borderRadius: '4px',
            transition: 'background-color 0.3s ease',
            margin: '5px',
            fontSize: '16px',
        },
        error: {
            color: 'red',
            fontSize: '0.875em',
            marginTop: '5px',
        },
    };

    return (
        <form onSubmit={handleSubmit} style={styles.form}>
            <div>
                <label>First Name:</label>
                <input type="text" name="first_name" value={formData.first_name} onChange={handleChange} style={styles.input} />
                {errors.first_name && <div style={styles.error}>{errors.first_name}</div>}
            </div>
            <div>
                <label>Last Name:</label>
                <input type="text" name="last_name" value={formData.last_name} onChange={handleChange} style={styles.input} />
                {errors.last_name && <div style={styles.error}>{errors.last_name}</div>}
            </div>
            <div>
                <label>Address:</label>
                <input type="text" name="address" value={formData.address} onChange={handleChange} style={styles.input} />
                {errors.address && <div style={styles.error}>{errors.address}</div>}
            </div>
            <div>
                <label>Company:</label>
                <input type="text" name="company" value={formData.company} onChange={handleChange} style={styles.input} />
                {errors.company && <div style={styles.error}>{errors.company}</div>}
            </div>
            <div>
                <label>Phone Numbers (comma separated):</label>
                <input type="text" name="phone_numbers" value={formData.phone_numbers} onChange={handleChange} style={styles.input} />
                {errors.phone_numbers && <div style={styles.error}>{errors.phone_numbers}</div>}
            </div>
            <button type="submit" style={styles.button}>Save Contact</button>
        </form>
    );
};

export default ContactForm;
