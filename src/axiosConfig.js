// src/axiosConfig.js
import axios from 'axios';
import store from './redux/store'; // Import the store
import { refreshToken } from './redux/actions/authActions';

const apiClient = axios.create({
    baseURL: 'http://localhost:8000', // Your API base URL
});

// Add a request interceptor to include the token
apiClient.interceptors.request.use(config => {
    const token = localStorage.getItem('authToken');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

// Add a response interceptor to handle token refresh
apiClient.interceptors.response.use(response => {
    return response;
}, async error => {
    const originalRequest = error.config;

    if (error.response && error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
            console.log('Attempting to refresh token');
            await store.dispatch(refreshToken()); // Dispatch the refreshToken action

            // Retry the original request with the new token
            const token = localStorage.getItem('authToken');
            originalRequest.headers['Authorization'] = `Bearer ${token}`;
            return apiClient(originalRequest);
        } catch (refreshError) {
            console.error('Token refresh failed:', refreshError);
            localStorage.removeItem('authToken');
            localStorage.removeItem('refreshToken');
            window.location.href = '/login'; // Redirect to login or handle accordingly
            return Promise.reject(refreshError);
        }
    }

    return Promise.reject(error);
});

export default apiClient;
