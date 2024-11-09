import { toast } from "react-toastify";
import axiosClient from "./axiosClients";

// const API_FILES = "/files";
const API_AI = process.env.REACT_APP_NGROK_URL;

export const postFile = async (file: File, chatHistoryId = "tempId") => {
  try {
    const formData = new FormData();

    // const { data } = await axiosClient.post(API_FILES, formData, {
    //   params: {
    //     chatHistoryId: chatHistoryId
    //   },
    //   headers: {
    //     "Content-Type": "multipart/form-data"
    //   }
    // });
    formData.append("files", file);
    formData.append("text_docs", "");
    formData.append("conversation_id", chatHistoryId);
    const { data: AiData } = await axiosClient({
      method: "POST",
      baseURL: `${API_AI}/KG/upload-files`,
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
    console.log(AiData);
    return AiData;
  } catch (error) {
    toast.error("Failed to upload file");
    console.error(error);
  }
};
