import axiosClient from "./axiosClient";

export const getAllUsersApi = async () => {
  const res = await axiosClient.get("/admin/users");
  return res.data;
};

export const getAllTransactionsAdminApi = async () => {
  const res = await axiosClient.get("/admin/transactions");
  return res.data;
};

export const getDashboardStatsApi = async () => {
  const res = await axiosClient.get("/admin/dashboard");
  return res.data;
};

export const deleteUserApi = async (id) => {
  const res = await axiosClient.delete(`/admin/user/${id}`);
  return res.data;
};

export const deleteTransactionAdminApi = async (id) => {
  const res = await axiosClient.delete(`/admin/transaction/${id}`);
  return res.data;
};
