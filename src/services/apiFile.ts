import axiosClient from "./axiosClients";

const API_FILES = "/files";

export const postFile = async (id?: string) => {
  const { data } = await axiosClient.post(`${API_FILES}/${id}`);
  return data;
};
