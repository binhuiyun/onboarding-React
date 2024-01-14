import axios from 'axios';
const BASE_URL = 'http://localhost:4000';

export const createToken = async (data) => {
    try {
        const res = await axios.post(BASE_URL+'/api/tokenHistory', data);
        return res.data;
    } catch (err) {
        return err.response.data;
    }
}