import axiosClient from "./axiosClients";

const baseUrl = "/user-profile";

export const getUserProfile = async () => {
  const { data } = await axiosClient.get(baseUrl);
  return data;
};
