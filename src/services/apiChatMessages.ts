import { toast } from "react-toastify";
import { ChatMessagePayload, ChatMessage } from "../types";
// import axiosAiClient from "./axiosAiClients";
import axiosClient from "./axiosClients";

const API_CHAT_MESSAGE = "/messages";
const API_AI = process.env.REACT_APP_NGROK_URL;

export const getChatMessagesByChatHistory = async (id?: string) => {
  const { data } = await axiosClient.get(`${API_CHAT_MESSAGE}/${id}`);
  return data as ChatMessage[];
};

export const postChatMessage = async (data: ChatMessagePayload) => {
  try {
    const response = await axiosClient.post(API_CHAT_MESSAGE, data);

    if (!data.chatHistoryId && !response.data.chatHistoryId)
      return response.data;

    const formData = new FormData();
    formData.append("conversation_id", response.data.chatHistoryId);
    formData.append("query", data.message.text);

    const MlResponse = await axiosClient({
      method: "POST",
      data: formData,
      baseURL: `${API_AI}/KG/query`,
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });

    const AiResponse = await axiosClient.post(API_CHAT_MESSAGE, {
      ...response.data,
      message: {
        ...data.message,
        position: "left",
        title: "Chat TOEIC AI",
        text: MlResponse.data.result.split("Result:").slice(1)
      }
    });
    return { data: response.data, mlData: AiResponse.data };
  } catch (error) {
    toast.error("Failed to send message");
    console.error(error);
  }
};
