import axios from 'axios';

const API_URL = 'https://expressreactsso.onrender.com';
export const api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('loginToken');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const login = async (username, password) => {
    try {
        const response = await api.post('/signin', { username, password });
        return response.data;
    } catch (error) {
        throw new Error('Invalid login credentials');
    }
};

export const signUp = async (userData) => {
    try {
        const response = await api.post('/signup', userData);
        return response.data;
    } catch (error) {
        throw new Error('Error during sign up');
    }
};

export const checkAuth = async () => {
    try {
        const response = await api.get('/protected');
        return response.data;
    } catch (error) {
        throw new Error('Not authenticated');
    }
};
