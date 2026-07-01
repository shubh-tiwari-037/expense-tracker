import axios from "axios";


export const GetTransactionsApi = async () => {
  const res = await axios.get(
    `http://localhost:5000/api/v1/transaction/get`,
    { withCredentials: true }
  );
  return res.data;
};
