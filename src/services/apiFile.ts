import axiosClient from "./axiosClients";
import { FileResponse } from "../types/File";

const API_FILES = "/files";
// const API_AI = process.env.REACT_APP_NGROK_URL;

export const postFile = async (
  files: FileList,
  chatHistoryId?: string
): Promise<FileResponse> => {
  const formData = new FormData();

  for (let i = 0; i < files.length; i++) {
    formData.append("files", files[i]);
  }
  formData.append("text_docs", "");
  formData.append("conversation_id", chatHistoryId || "");

  const { data } = await axiosClient.post(API_FILES, formData, {
    params: {
      chatHistoryId: chatHistoryId
    },
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });

  // const { data: AiData } = await axiosClient({
  //   method: "POST",
  //   baseURL: `${API_AI}/KG/upload-files`,
  //   data: formData,
  //   headers: {
  //     "Content-Type": "multipart/form-data"
  //   }
  // });
  // console.log(AiData);
  return { data };
};
