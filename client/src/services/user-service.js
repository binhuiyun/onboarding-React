import axios from 'axios';
const USER_API = 'http://localhost:4000/api/user';

export const fetchUserById = async (id) => {
    try{
        const res = await axios.get(`${USER_API}/${id}`);
        return res.data;
    }catch(err){
        return err.response.data;
    }
}

export const updateCurrentUser = async (id, data) => {
    try{
        const res = await axios.put(`${USER_API}/${id}`, data);
        return res.data;
    }catch(err){
        return err.response.data;
    }
}