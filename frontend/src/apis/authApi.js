import axiosClient from "./axiosClient";

export const registerApi = async (data) => {
  const res = await axiosClient.post("/auth/register", data);
  return res.data;
};

export const loginApi = async (data) => {
  const res = await axiosClient.post("/auth/login", data);
  return res.data;
};

export const logoutApi = async () => {
  const res = await axiosClient.post("/auth/logout");
  return res.data;
};

export const getMeApi = async () => {
  const res = await axiosClient.get("/auth/me");
  return res.data;
};

export const updateProfileApi = async (data) => {
  const res = await axiosClient.patch("/auth/profile", data);
  return res.data;
};

export const changePasswordApi = async (data) => {
  const res = await axiosClient.patch("/auth/change-password", data);
  return res.data;
};
