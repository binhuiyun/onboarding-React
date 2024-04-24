import apiCall from "./api";

export const updateDocument = async (data) => {
  return await apiCall({
    url: `api/document/${data._id}`,
    method: "put",
    data
  });
}