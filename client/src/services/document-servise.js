import apiCall from "./api";

export const getDocument = async (userId) => {
  return await apiCall({
    url: `api/document/${userId}`,
    method: "get"
  });
}