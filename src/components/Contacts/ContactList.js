import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContacts, deleteContact } from '../../redux/actions/contactActions';
import { logout } from '../../redux/actions/authActions'; // Add this import
import { useNavigate } from 'react-router-dom';

const ContactList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const contacts = useSelector(state => state.contacts.contacts);
    const error = useSelector(state => state.contacts.error);

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

    return (
        <div>
            <h2>Contacts</h2>
            <button onClick={handleLogout}>Logout</button>
            {error && <div>{error.detail}</div>}
            <ul>
                {contacts.map(contact => (
                    <li key={contact.id}>
                        {contact.first_name} {contact.last_name}
                        <button onClick={() => handleDelete(contact.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ContactList;
