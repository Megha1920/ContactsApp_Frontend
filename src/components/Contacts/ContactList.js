import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContacts, deleteContact } from '../../redux/actions/contactActions';
import { logout } from '../../redux/actions/authActions';
import { useNavigate } from 'react-router-dom';
import ContactForm from './ContactForm'; // Adjust the import path as necessary

const ContactList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const contacts = useSelector(state => state.contacts.contacts);

    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [contactsPerPage] = useState(5);
    const [showForm, setShowForm] = useState(false);
    const [selectedContact, setSelectedContact] = useState(null);

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
        setSelectedContact(null);
        setShowForm(true);
    };

    const handleCloseForm = () => {
        setShowForm(false);
        setSelectedContact(null);
    };

    const handleEdit = (id) => {
        const contactToEdit = contacts.find(contact => contact.id === id);
        setSelectedContact(contactToEdit);
        setShowForm(true);
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
            paddingTop: '50px',
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
            margin: '5px',
        },
        input: {
            marginBottom: '15px',
            padding: '10px',
            borderRadius: '4px',
            border: '1px solid #ddd',
        },
        error: {
            color: 'red',
            fontSize: '0.875em',
            marginTop: '5px',
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
        fixedLogoutButton: {
            position: 'fixed',
            top: '10px',
            right: '10px',
            backgroundColor: '#007bff',
            color: '#fff',
            cursor: 'pointer',
            border: 'none',
            padding: '10px',
            borderRadius: '4px',
            transition: 'background-color 0.3s ease',
            zIndex: 1000,
        },
        modal: {
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#fff',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
            zIndex: 1001,
        },
        overlay: {
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 1000,
        }
    };

    return (
        <div style={styles.container}>
            <button onClick={handleLogout} style={styles.fixedLogoutButton}>Logout</button>
            <h1 style={styles.header}>Contact List</h1>
            <button onClick={handleCreateContact} style={styles.button}>Add New Contact</button>
            <input
                type="text"
                placeholder="Search Contacts"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={styles.input}
            />
            {filteredContacts.length > 0 ? (
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
                                    <button onClick={() => handleEdit(contact.id)} style={styles.button}>Edit</button>
                                    <button onClick={() => handleDelete(contact.id)} style={styles.button}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No contacts found.</p>
            )}
            <div style={styles.pagination}>
                {Array.from({ length: Math.ceil(contacts.length / contactsPerPage) }, (_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => handlePageChange(index + 1)}
                        style={styles.pageButton}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
            {showForm && (
                <>
                    <div style={styles.overlay} onClick={handleCloseForm}></div>
                    <div style={styles.modal}>
                        <ContactForm contact={selectedContact} handleCloseForm={handleCloseForm} />
                    </div>
                </>
            )}
        </div>
    );
};

export default ContactList;
