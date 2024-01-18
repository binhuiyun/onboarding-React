import axios from "axios";
const BASE_URL = "http://localhost:4000";

export const addToVisaDocumentation = async ({ data, id, fileType }) => {
  try {
    const res = await axios.post(BASE_URL + `/api/visa/${id}/${fileType}`, data);
    return res.data;
  } catch (err) {
    return err.response.data;
  }
};

export default addToVisaDocumentation;
