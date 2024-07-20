import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addContact, updateContact } from '../../redux/actions/contactActions';
import { useNavigate } from 'react-router-dom';

const ContactForm = ({ contact }) => {
    const [formData, setFormData] = useState(contact || {
        first_name: '',
        last_name: '',
        address: '',
        company: '',
        phone_numbers: []
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (contact) {
            dispatch(updateContact(contact.id, formData));
        } else {
            dispatch(addContact(formData));
        }
        navigate('/contacts');
    };

    return (
        <div>
            <h2>{contact ? 'Edit Contact' : 'Add Contact'}</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>First Name:</label>
                    <input type="text" name="first_name" value={formData.first_name} onChange={handleChange} required />
                </div>
                <div>
                    <label>Last Name:</label>
                    <input type="text" name="last_name" value={formData.last_name} onChange={handleChange} required />
                </div>
                <div>
                    <label>Address:</label>
                    <input type="text" name="address" value={formData.address} onChange={handleChange} required />
                </div>
                <div>
                    <label>Company:</label>
                    <input type="text" name="company" value={formData.company} onChange={handleChange} />
                </div>
                <div>
                    <label>Phone Numbers:</label>
                    <input type="text" name="phone_numbers" value={formData.phone_numbers} onChange={handleChange} required />
                </div>
                <button type="submit">Save</button>
            </form>
        </div>
    );
};

export default ContactForm;
