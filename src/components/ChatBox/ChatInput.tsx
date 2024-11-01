import { useState, useEffect } from "react";
import { TextField, Button } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { postChatMessage } from "../../services/apiChatMessages";
import { ChatMessagePayload } from "../../types/ChatMessage";
import { useQueryClient } from "@tanstack/react-query";
import { EQuerryKeys } from "../../constants/EQuerryKeys";

export type MessageInputRef = {
  focusInput: () => void;
};

export const ChatInput = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const { chatId } = useParams();

  useEffect(() => {
    const messageInput = document.getElementById(
      "message-input"
    ) as HTMLInputElement;
    if (messageInput) {
      messageInput.focus();
    }
  }, [chatId]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    const newMessage = {
      chatHistoryId: chatId,
      message: { position: "right", type: "text", title: "You", text: message }
    } as ChatMessagePayload;

    const newMessageResponse = await postChatMessage(newMessage);

    setMessage("");
    queryClient.invalidateQueries({ queryKey: [EQuerryKeys.CHAT_MESSAGE] });
    queryClient.invalidateQueries({
      queryKey: [EQuerryKeys.CHAT_HISTORY_BY_USER]
    });

    if (chatId !== newMessageResponse.chatHistoryId)
      navigate(`/chat/${newMessageResponse.chatHistoryId}`);
  };

  return (
    <form className="absolute bottom-0 w-full" onSubmit={sendMessage}>
      <div className="p-4 items-center flex gap-4 w-full justify-center">
        <TextField
          id="message-input"
          className="w-full"
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
