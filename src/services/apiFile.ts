import axiosClient from "./axiosClients";

const API_FILES = "/files";

export const postFile = async (file: File, chatHistoryId?: string) => {
  const formData = new FormData();
  formData.append("files", file);

  const { data } = await axiosClient.post(API_FILES, formData, {
    params: {
      chatHistoryId: chatHistoryId
    },
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });

  return data;
};
