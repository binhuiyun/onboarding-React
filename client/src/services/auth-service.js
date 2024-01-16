import axios from 'axios';
const AUTH_API = 'http://localhost:4000/api/auth';

export const login = async (data) => {
    try {
        const res = await axios.post(AUTH_API+'/login', data);
        return res.data;
    } catch (err) {
        return err.response.data;
    }
}

export const register = async (data) => {
    try {
        const res = await axios.post(AUTH_API+'/register', data);
        return res.data;
    } catch (err) {
        return err.response.data;
    }
}