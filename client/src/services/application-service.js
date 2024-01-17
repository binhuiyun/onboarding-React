import axios from 'axios';
const APPLICATION_URL = 'http://localhost:4000/api/application';

export const getAppByStatus = async (status) => {
    try {
        const res = await axios.get(`${APPLICATION_URL}/${status}`);
        return res.data;
    } catch (err) {
        return err.response.data;
    }
}