import apiClient from '../../axiosConfig';

// Define action creators for contact-related actions
export const fetchContacts = () => async (dispatch) => {
    try {
        const response = await apiClient.get('/api/contacts/');
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
        const response = await apiClient.post('/api/contacts/', contactData);
        dispatch({ type: 'ADD_CONTACT_SUCCESS', payload: response.data });
    } catch (error) {
        dispatch({ type: 'CONTACT_ERROR', payload: error.response ? error.response.data : error.message });
    }
};

export const updateContact = (id, contactData) => async (dispatch) => {
    try {
        const response = await apiClient.put(`/api/contacts/${id}/`, contactData);
        dispatch({ type: 'UPDATE_CONTACT_SUCCESS', payload: response.data });
    } catch (error) {
        dispatch({ type: 'CONTACT_ERROR', payload: error.response ? error.response.data : error.message });
    }
};

export const deleteContact = (id) => async (dispatch) => {
    try {
        await apiClient.delete(`/api/contacts/${id}/`);
        dispatch({ type: 'DELETE_CONTACT_SUCCESS', payload: id });
    } catch (error) {
        dispatch({ type: 'CONTACT_ERROR', payload: error.response ? error.response.data : error.message });
    }
};
