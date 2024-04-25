import apiCall from "./api";

export const createProfile = async (data) => {
  return await apiCall({
    url: `api/personalInformation/${data.userId}`,
    method: "post",
    data
  });
};

export const getProfile = async (userId) => {
  return await apiCall({
    url: `api/personalInformation/${userId}`,
    method: "get"
  });
}

export const updateProfile = async (data) => {
  return await apiCall({
    url: `api/personalInformation/${data.userId}`,
    method: "put",
    data
  });
};

export const getAllProfile = async () => {
  return await apiCall({
    url: `api/personalInformation`,
    method: "get"
  });
};

export const getAppByStatus = async (status) => {
  return await apiCall({
      url : `api/personalInformation/status/${status}`,
      method: 'get'

  });
}

export const getProfileByOpt = async () => {
  return await apiCall({
    url: `api/personalInformation/opt`,
    method: "get"
  });
}

export const getInProgressProfile = async () => {
  return await apiCall({
    url: `api/personalInformation/inProgress`,
    method: "get"
  });
}