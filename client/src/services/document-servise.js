import apiCall from "./api";

export const updateDocument = async (data) => {
  return await apiCall({
    url: `api/document/${data._id}`,
    method: "put",
    data
  });
}

export const deleteDocument = async (id) => {
  return await apiCall({
    url: `api/document/${id}`,
    method: "delete"
  });
}