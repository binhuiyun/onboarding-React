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

export const updateApplicationStatus = async (id, payload) => {
    try {
        const res = await axios.put(`${APPLICATION_URL}/apps/${id}`, payload);
        return res.data;
    } catch (err) {
        return err.response.data;
    }
}

export const fetchAppById = async (id) => {
    try {
        const res = await axios.get(`${APPLICATION_URL}/apps/${id}`);
        return res.data;
    } catch (err) {
        return err.response.data;
    }
}