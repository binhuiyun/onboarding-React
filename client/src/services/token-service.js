
import apiCall from "./api";
export const fetchTokenHistory = async () =>{
    return await apiCall({
        url: 'api/tokenHistory',
        method: 'get',
    });
}

export const createToken = async (data) =>{
    return await apiCall({
        url: '/api/tokenHistory',
        method: 'post',
        data
    });
}

export const updateTokenStatus = async (email) =>{
    return await apiCall({
        url: `/api/tokenHistory/${email}`,
        method: 'put',
        data:{status: "Submitted"}
});
}