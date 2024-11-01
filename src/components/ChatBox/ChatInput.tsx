import { useRef, useState } from "react";
import { TextField, Button } from "@mui/material";
import { useParams } from "react-router-dom";
import { ChatMessage } from "../../types";
import { postChatMessage } from "../../services/apiChatMessages";
import { useGetChatMessagesByChatHistory } from "../../hooks/useChatMessages";

export type MessageInputRef = {
  focusInput: () => void;
};

export const ChatInput = () => {
  const [message, setMessage] = useState("");
  const messageInputRef = useRef<HTMLDivElement>(null);
  const { chatId } = useParams();
  const { refetch } = useGetChatMessagesByChatHistory();

  const sendMessage = async () => {
    const newMessage = {
      position: "right",
      type: "text",
      title: "You",
      text: message
    } as ChatMessage;
    const isNewChatHistory = !chatId;
    await postChatMessage(newMessage, isNewChatHistory);
    refetch();
  };

  return (
    <form className="absolute bottom-0 right-0 left-0" onSubmit={sendMessage}>
      <div className="p-4 items-center flex gap-4 w-full justify-center">
        <TextField
          id="message-input"
          ref={messageInputRef}
          className="w-1/2"
          variant="outlined"
          size="small"
          placeholder="Type a message..."
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button type="submit" variant="contained" disabled={!message}>
          Send
        </Button>
      </div>
    </form>
  );
};
