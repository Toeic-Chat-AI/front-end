import { ITextMessageProps } from "react-chat-elements";
import { File } from "./File";

export type ChatMessage = { type: "text" } & ITextMessageProps & {
    id?: string;
  };

export type ChatMessagePayload = {
  chatHistoryId?: string;
  message: ChatMessage;
};

export type ChatMessageResponse = {
  messages: ChatMessage[];
  files: File[];
};
