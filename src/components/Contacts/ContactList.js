import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContacts, deleteContact, addContact, updateContact } from '../../redux/actions/contactActions';
import { logout } from '../../redux/actions/authActions';
import { useNavigate } from 'react-router-dom';

const ContactList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const contacts = useSelector(state => state.contacts.contacts);

    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [contactsPerPage] = useState(5);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        address: '',
        company: '',
        phone_numbers: ''
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        dispatch(fetchContacts());
    }, [dispatch]);

    const handleDelete = (id) => {
        dispatch(deleteContact(id));
    };

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    };

    const handleCreateContact = () => {
        setFormData({
            first_name: '',
            last_name: '',
            address: '',
            company: '',
            phone_numbers: ''
        });
        setShowForm(true);
    };

    const handleCloseForm = () => {
        setShowForm(false);
        setFormData({
            first_name: '',
            last_name: '',
            address: '',
            company: '',
            phone_numbers: ''
        });
        setErrors({});
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.first_name) newErrors.first_name = 'First name is required';
        if (!formData.last_name) newErrors.last_name = 'Last name is required';
        if (!formData.address) newErrors.address = 'Address is required';
        if (!formData.company) newErrors.company = 'Company is required';
        if (!formData.phone_numbers) newErrors.phone_numbers = 'Phone numbers are required';
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
        
        // Create formatted data object
        const formattedFormData = {
            ...formData,
            phone_numbers: formattedPhoneNumbers
        };

        if (formData.id) {
            dispatch(updateContact(formData.id, formattedFormData));
        } else {
            dispatch(addContact(formattedFormData));
        }
        handleCloseForm();
    };

    const indexOfLastContact = currentPage * contactsPerPage;
    const indexOfFirstContact = indexOfLastContact - contactsPerPage;
    const currentContacts = contacts.slice(indexOfFirstContact, indexOfLastContact);

    const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

    const filteredContacts = currentContacts.filter(contact =>
        contact.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.last_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

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
        input: {
            marginBottom: '15px',
            padding: '10px',
            borderRadius: '4px',
            border: '1px solid #ddd',
        },
        table: {
            width: '100%',
            borderCollapse: 'collapse',
        },
        th: {
            borderBottom: '2px solid #ddd',
            padding: '10px',
            textAlign: 'left',
        },
        td: {
            borderBottom: '1px solid #ddd',
            padding: '10px',
        },
        pagination: {
            marginTop: '20px',
        },
        pageButton: {
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            padding: '10px',
            borderRadius: '4px',
            margin: '0 5px',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
        },
        pageButtonHover: {
            backgroundColor: '#0056b3',
        },
    };

    return (
        <div style={styles.container}>
            <button onClick={handleLogout} style={styles.button}>Logout</button>
            <h1 style={styles.header}>Contact List</h1>
            <button onClick={handleCreateContact} style={styles.button}>Add New Contact</button>
            <input
                type="text"
                placeholder="Search Contacts"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={styles.input}
            />
            {showForm && (
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
                    <button type="button" onClick={handleCloseForm} style={styles.button}>Cancel</button>
                </form>
            )}
            <table style={styles.table}>
                <thead>
                    <tr>
                        <th style={styles.th}>First Name</th>
                        <th style={styles.th}>Last Name</th>
                        <th style={styles.th}>Address</th>
                        <th style={styles.th}>Company</th>
                        <th style={styles.th}>Phone Numbers</th>
                        <th style={styles.th}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredContacts.map(contact => (
                        <tr key={contact.id}>
                            <td style={styles.td}>{contact.first_name}</td>
                            <td style={styles.td}>{contact.last_name}</td>
                            <td style={styles.td}>{contact.address}</td>
                            <td style={styles.td}>{contact.company}</td>
                            <td style={styles.td}>{contact.phone_numbers.map(phone => phone.number).join(', ')}</td>
                            <td style={styles.td}>
                                <button onClick={() => {
                                    setFormData({
                                        ...contact,
                                        phone_numbers: contact.phone_numbers.map(phone => phone.number).join(', ')
                                    });
                                    setShowForm(true);
                                }} style={styles.button}>Edit</button>
                                <button onClick={() => handleDelete(contact.id)} style={styles.button}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div style={styles.pagination}>
                {Array.from({ length: Math.ceil(filteredContacts.length / contactsPerPage) }, (_, index) => (
                    <button key={index} onClick={() => handlePageChange(index + 1)} style={styles.pageButton}>
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ContactList;
