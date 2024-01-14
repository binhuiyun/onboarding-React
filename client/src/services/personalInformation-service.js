import axios from 'axios';
const BASE_URL = 'http://localhost:4000';

export const createPersonalInformation = async (data) => {
    try {
        //console.log(data);
        const res = await axios.post(BASE_URL+'/api/personalInformation', data);
        // return res.data;
    } catch (err) {
        return err.response.data;
    }
};
