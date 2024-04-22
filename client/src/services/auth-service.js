
import apiCall from "./api";

export const login = async (data) => {
    return await apiCall({
        url: '/api/auth/login',
        method: 'post',
        data
    });
}

export const register = async (data) => {
    return await apiCall({
        url: '/api/auth/register',
        method: 'post',
        data
    });
};