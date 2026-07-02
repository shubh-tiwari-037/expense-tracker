import axiosClient from "./axiosClient";

export const createTransactionApi = async (data) => {
  const res = await axiosClient.post("/transaction", data);
  return res.data;
};

export const addBalanceApi = async (data) => {
  const res = await axiosClient.post("/transaction/balance", data);
  return res.data;
};

export const addExpenseApi = async (data) => {
  const res = await axiosClient.post("/transaction/expense", data);
  return res.data;
};

export const getTransactionsApi = async (params = {}) => {
  const res = await axiosClient.get("/transaction", { params });
  return res.data;
};

export const getTransactionByIdApi = async (id) => {
  const res = await axiosClient.get(`/transaction/${id}`);
  return res.data;
};

export const deleteTransactionApi = async (id) => {
  const res = await axiosClient.delete(`/transaction/${id}`);
  return res.data;
};

export const exportTransactionsCsvApi = async () => {
  const res = await axiosClient.get("/transaction/export/csv", { responseType: "blob" });
  return res.data;
};
