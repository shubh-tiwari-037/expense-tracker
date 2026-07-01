import axios from "axios";

export const AddBalanceApi = async (data) => {
  const response = await axios.post(
    "http://localhost:5000/api/v1/transaction/balance",
    data,
    {
      withCredentials: true,
    }
  );

  return response.data;
};