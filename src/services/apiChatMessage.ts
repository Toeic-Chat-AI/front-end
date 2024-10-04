import { ChatMessage } from "../types";
import axiosClient from "./axiosClients";

const API_MESSAGE = "/messages";

export const getMessageById = ({ id }: { id: string }) => {
  const MessageById = axiosClient.get(`${API_MESSAGE}/${id}`);
  return MessageById;
};

export const postMessageById = ({ _id, message, sender }: ChatMessage) => {
  const data = {
    message,
    sender
  };
  return axiosClient.post(`${API_MESSAGE}/${_id}`, data);
};
