import axios from 'axios';

// Set the base URL for axios requests
axios.defaults.baseURL = 'http://localhost:8000'; // Update to your API URL

// Add a request interceptor to include the token
axios.interceptors.request.use(config => {
    const token = localStorage.getItem('authToken'); // Ensure this matches the key used in authActions.js
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

export const fetchContacts = () => async (dispatch) => {
    try {
        const response = await axios.get('/api/contacts/');
        dispatch({ type: 'FETCH_CONTACTS_SUCCESS', payload: response.data });
    } catch (error) {
        if (error.response && error.response.status === 401) {
            dispatch({ type: 'AUTH_ERROR', payload: 'Unauthorized access. Please log in.' });
        } else {
            dispatch({ type: 'CONTACT_ERROR', payload: error.response ? error.response.data : error.message });
        }
    }
};


export const addContact = (contactData) => async (dispatch) => {
    try {
        console.log(contactData)
        const response = await axios.post('/api/contacts/', contactData);
        dispatch({ type: 'ADD_CONTACT_SUCCESS', payload: response.data });
    } catch (error) {
        dispatch({ type: 'CONTACT_ERROR', payload: error.response ? error.response.data : error.message });
    }
};

export const updateContact = (id, contactData) => async (dispatch) => {
    try {
        const response = await axios.put(`/api/contacts/${id}/`, contactData);
        dispatch({ type: 'UPDATE_CONTACT_SUCCESS', payload: response.data });
    } catch (error) {
        dispatch({ type: 'CONTACT_ERROR', payload: error.response ? error.response.data : error.message });
    }
};

export const deleteContact = (id) => async (dispatch) => {
    try {
        await axios.delete(`/api/contacts/${id}/`);
        dispatch({ type: 'DELETE_CONTACT_SUCCESS', payload: id });
    } catch (error) {
        dispatch({ type: 'CONTACT_ERROR', payload: error.response ? error.response.data : error.message });
    }
};
