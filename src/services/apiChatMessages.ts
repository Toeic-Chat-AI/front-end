import { ChatMessagePayload, ChatMessage } from "../types";
import axiosClient from "./axiosClients";

const API_CHAT_MESSAGE = "/messages";

export const getChatMessagesByChatHistory = async (id?: string) => {
  const { data } = await axiosClient.get(`${API_CHAT_MESSAGE}/${id}`);
  return data as ChatMessage[];
};

export const postChatMessage = async (
  data: ChatMessagePayload
): Promise<ChatMessagePayload> => {
  const response = await axiosClient.post(API_CHAT_MESSAGE, data);
  return response.data;
};
