import axios from 'axios';
const BASE_URL = 'http://localhost:4000';

export const getAppByStatus = async (status) => {
    try {
        const res = await axios.get(BASE_URL+'/api/application/'+status);
        return res.data;
    } catch (err) {
        return err.response.data;
    }
}