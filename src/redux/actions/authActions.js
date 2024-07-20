import axios from 'axios';

const API_URL = 'http://localhost:8000/api/account/';

export const login = (email, password) => async dispatch => {
    try {
        const response = await axios.post(`${API_URL}login/`, { email, password });
        const { access } = response.data; // Remove 'refresh' since it's not used
        localStorage.setItem('token', access);
        dispatch({ type: 'LOGIN_SUCCESS', payload: { token: access, user: response.data } });
    } catch (error) {
        dispatch({ type: 'AUTH_ERROR', payload: error.response.data });
    }
};

// src/redux/actions/authActions.js


// Function to handle user registration
export const register = (userData) => async (dispatch) => {
    try {
        // Prepare form data
        const formData = new FormData();
        for (const key in userData) {
            formData.append(key, userData[key]);
        }

        // Make POST request to the backend
        const response = await axios.post('http://localhost:8000/api/account/register/', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',  // Ensure this is correct for file uploads
            }
        });

        // Dispatch success action
        dispatch({ type: 'REGISTER_SUCCESS', payload: response.data });
    } catch (err) {
        console.error(err.response.data);
        // Dispatch failure action
        dispatch({ type: 'REGISTER_FAIL', payload: err.response.data });
    }
};

export const logout = () => dispatch => {
    localStorage.removeItem('token');
    dispatch({ type: 'LOGOUT' });
};
