import { ChatMessage } from "./ChatMessage";

export type ChatHistories = ChatHistory[];

export type ChatHistory = {
  _id: string;
  userId: string;
  messages?: ChatMessage[];
  title: string;
  createAt: string;
};
