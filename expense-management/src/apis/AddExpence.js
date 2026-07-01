import axios from "axios";

 export const   AddExpenseApi = async (data) => {
  const response = await axios.post(
     "http://localhost:5000/api/v1/transaction/expense",
    data,
    {
      withCredentials: true,
    }
  );

  return response.data;
};