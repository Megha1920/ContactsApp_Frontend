import apiClient from '../../axiosConfig';

const API_URL = 'http://localhost:8000/api/account/';

export const login = (email, password) => async (dispatch) => {
    try {
        const response = await apiClient.post(`${API_URL}login/`, { email, password });
        const { access, refresh } = response.data;
        localStorage.setItem('authToken', access);
        localStorage.setItem('refreshToken', refresh);
        dispatch({ type: 'LOGIN_SUCCESS', payload: { token: access, user: response.data } });
        return Promise.resolve(); // Resolve the promise on success
    } catch (error) {
        dispatch({ type: 'AUTH_ERROR', payload: error.response ? error.response.data : 'Login failed' });
        return Promise.reject(); // Reject the promise on failure
    }
};

export const register = (userData) => async (dispatch) => {
    try {
        const formData = new FormData();
        for (const key in userData) {
            formData.append(key, userData[key]);
        }

        const response = await apiClient.post(`${API_URL}register/`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        });

        dispatch({ type: 'REGISTER_SUCCESS', payload: response.data });
    } catch (err) {
        console.error(err.response ? err.response.data : err.message);
        dispatch({ type: 'REGISTER_FAIL', payload: err.response ? err.response.data : 'Registration failed' });
        throw err; // Throw error to be caught in the component
    }
};

export const logout = () => (dispatch) => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');
    dispatch({ type: 'LOGOUT' });
};

export const refreshToken = () => async (dispatch) => {
    try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) {
            throw new Error('No refresh token available');
        }
        
        const response = await apiClient.post(`${API_URL}token/refresh/`, { refresh: refreshToken });

        const { access } = response.data;
        localStorage.setItem('authToken', access);

        // Optionally dispatch a success action if needed
        dispatch({ type: 'TOKEN_REFRESH_SUCCESS', payload: { token: access } });

        return Promise.resolve();
    } catch (error) {
        console.error('Token refresh failed:', error);
        localStorage.removeItem('authToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login'; // Redirect to login or handle accordingly
        return Promise.reject(error);
    }
};
