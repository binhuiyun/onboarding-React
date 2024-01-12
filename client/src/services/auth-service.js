import axios from 'axios';

export const login = async (data) => {
    try {
        const res = await axios.post('/api/auth/login', data);
        return res.data;
    } catch (err) {
        return err.response.data;
    }
}

export const register = async (data) => {
    try {
        const res = await axios.post('/api/auth/register', data);
        return res.data;
    } catch (err) {
        return err.response.data;
    }
}