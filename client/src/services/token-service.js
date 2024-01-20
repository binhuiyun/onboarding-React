import axios from 'axios';
const TOKEN_API = 'http://localhost:4000/api/tokenHistory';


export const fetchTokenHistory = async () => {
    try{
        const res = await axios.get(TOKEN_API);
        return res.data;
    }catch(err){
        return err.response.data;
    }
}


export const updateTokenStatus = async (email) => {
    try{
        const res = await axios.put(`${TOKEN_API}/${email}`, {status: "Submitted"});
        return res.data;
    }catch(err){
        return err.response.data;
    }
}

export const createToken = async (newToken) => {
    try{
        const res = await axios.post(TOKEN_API, newToken);
        return res.data;
    }catch(err){
        return err.response.data;
    }
}