import { ITextMessageProps } from "react-chat-elements";

export type ChatMessage = { type: "text" } & ITextMessageProps & {
    id?: string;
  };

export type ChatMessagePayload = {
  chatHistoryId?: string;
  message: ChatMessage;
};
