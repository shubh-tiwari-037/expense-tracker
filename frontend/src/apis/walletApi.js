import axiosClient from "./axiosClient";

export const getWalletSummaryApi = async () => {
  const res = await axiosClient.get("/wallet");
  return res.data;
};
