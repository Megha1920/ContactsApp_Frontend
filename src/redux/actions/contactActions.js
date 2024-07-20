import axios from 'axios';

const API_URL = 'http://localhost:8000/api/contacts/';

export const fetchContacts = () => async dispatch => {
    try {
        const response = await axios.get(API_URL, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
        dispatch({ type: 'FETCH_CONTACTS_SUCCESS', payload: response.data });
    } catch (error) {
        dispatch({ type: 'CONTACT_ERROR', payload: error.response.data });
    }
};

export const addContact = (contactData) => async dispatch => {
    try {
        const response = await axios.post(API_URL, contactData, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
        dispatch({ type: 'ADD_CONTACT_SUCCESS', payload: response.data });
    } catch (error) {
        dispatch({ type: 'CONTACT_ERROR', payload: error.response.data });
    }
};

export const updateContact = (contactId, contactData) => async dispatch => {
    try {
        const response = await axios.put(`${API_URL}${contactId}/`, contactData, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
        dispatch({ type: 'UPDATE_CONTACT_SUCCESS', payload: response.data });
    } catch (error) {
        dispatch({ type: 'CONTACT_ERROR', payload: error.response.data });
    }
};

export const deleteContact = (contactId) => async dispatch => {
    try {
        await axios.delete(`${API_URL}${contactId}/`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
        dispatch({ type: 'DELETE_CONTACT_SUCCESS', payload: contactId });
    } catch (error) {
        dispatch({ type: 'CONTACT_ERROR', payload: error.response.data });
    }
};
