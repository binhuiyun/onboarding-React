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
