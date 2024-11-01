import { ChatHistories, ChatHistory } from "../types";
import axiosClient from "./axiosClients";

const API_CHAT_HISTORY = "/chat-history";

export const getChatHistoryById = async (id?: string) => {
  const { data } = await axiosClient.get(`${API_CHAT_HISTORY}/${id}`);
  return data as ChatHistory;
};

export const getChatHistoryByUserId = async () => {
  const { data } = await axiosClient.get(`${API_CHAT_HISTORY}`);
  return data as ChatHistories;
};
