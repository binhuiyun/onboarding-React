import apiCall from "./api";


export const fetchUserById = async (id) => {
    return await apiCall({
        url: `/api/user/${id}`,
        method: 'get'
    });
}
export const updateCurrentUser = async (data) => {
    return await apiCall({
        url: `/api/user/${data._id}`,
        method: 'put',
        data
    });
}