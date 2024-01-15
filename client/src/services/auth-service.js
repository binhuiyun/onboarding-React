import axios from 'axios';
const BASE_URL = 'http://localhost:4000';

export const login = async (data) => {
    try {
        const res = await axios.post(BASE_URL+'/api/auth/login', data);
        return res.data;
    } catch (err) {
        return err.response.data;
    }
}

export const register = async (data) => {
    try {
        const res = await axios.post(BASE_URL+'/api/auth/register', data);
        return res.data;
    } catch (err) {
        return err.response.data;
    }
}