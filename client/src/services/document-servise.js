import apiCall from "./api";


export const getAllDocument = async () => {
  return await apiCall({
    url: `api/document`,
    method: "get"
  });
}

export const updateDocument = async (data) => {
  return await apiCall({
    url: `api/document/${data._id}`,
    method: "put",
    data
  });
}