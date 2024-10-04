import { ChatHistories } from "../types";
import axiosClient from "./axiosClients";

const API_CHAT_HISTORY = "/chat-history";

export const getChatHistoryById = async ({ id }: { id: string }) => {
  const { data } = await axiosClient.get(`${API_CHAT_HISTORY}/${id}`);
  return data as ChatHistories;
};
