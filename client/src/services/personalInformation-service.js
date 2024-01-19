import axios from "axios";
const BASE_URL = "http://localhost:4000";

export const createPersonalInformation = async (data, u_id) => {
  console.log(data, u_id);
  try {
    const res = await axios.post(
      BASE_URL + `/api/personalInformation/${u_id}`,
      data
    );
    return res.data;
  } catch (err) {
    return err.response.data;
  }
};

export default createPersonalInformation;
