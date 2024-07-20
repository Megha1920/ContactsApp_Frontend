import axios from 'axios';

const API_URL = 'http://localhost:8000/api/account/';

export const login = (email, password) => async (dispatch) => {
    try {
        const response = await axios.post(`${API_URL}login/`, { email, password });
        const { access } = response.data;
        localStorage.setItem('authToken', access); // Ensure the token is stored with the correct key
        dispatch({ type: 'LOGIN_SUCCESS', payload: { token: access, user: response.data } });
    } catch (error) {
        dispatch({ type: 'AUTH_ERROR', payload: error.response ? error.response.data : 'Login failed' });
    }
};

export const register = (userData) => async (dispatch) => {
    try {
        const formData = new FormData();
        for (const key in userData) {
            formData.append(key, userData[key]);
        }

        const response = await axios.post('http://localhost:8000/api/account/register/', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        });

        dispatch({ type: 'REGISTER_SUCCESS', payload: response.data });
    } catch (err) {
        console.error(err.response ? err.response.data : err.message);
        dispatch({ type: 'REGISTER_FAIL', payload: err.response ? err.response.data : 'Registration failed' });
    }
};

export const logout = () => (dispatch) => {
    localStorage.removeItem('authToken'); // Ensure the token is removed with the correct key
    dispatch({ type: 'LOGOUT' });
};
