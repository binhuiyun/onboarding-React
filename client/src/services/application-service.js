import apiCall from "./api";
export const getAppByStatus = async (status) => {
    return await apiCall({
        url : `api/application/${status}`,
        method: 'get'

    });
}

export const updateApplicationStatus = async (id, data) =>{
    return await apiCall({
        url: `api/application/apps/${id}`,
        method: 'put',
        data
    });
}

export const fetchAppById = async (id) =>{
    return await apiCall({
        url: `api/application/apps/${id}`,
        method: 'get'

    });
}


