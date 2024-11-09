import { ChatHistoryResponse, ChatHistory } from "../types";
import axiosClient from "./axiosClients";

const API_CHAT_HISTORY = "/chat-history";

export const getChatHistoryById = async (id?: string) => {
  const { data } = await axiosClient.get(`${API_CHAT_HISTORY}/${id}`);
  return data as ChatHistory;
};

export const getChatHistoryByUserId = async () => {
  const { data } = await axiosClient.get(`${API_CHAT_HISTORY}`);
  return data as ChatHistoryResponse;
};

export const updateChatHistory = async (id: string, title: string) => {
  const { data } = await axiosClient.put(`${API_CHAT_HISTORY}/${id}`, {
    data: { title }
  });
  console.log(data);
  return data as ChatHistory;
};

export const deleteChatHistory = async (id: string) => {
  const response = await axiosClient.delete(`${API_CHAT_HISTORY}/${id}`);
  return response.status === 200;
};
