import { useState, useEffect } from "react";
import { TextField, Button } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { postChatMessage } from "../../services/apiChatMessages";
import { ChatMessagePayload } from "../../types/ChatMessage";
import { useQueryClient } from "@tanstack/react-query";
import { EQuerryKeys } from "../../constants/EQuerryKeys";
import { CustomLoading } from "../Loading/Loading";

export type MessageInputRef = {
  focusInput: () => void;
};

export const ChatInput = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
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
    try {
      setIsLoading(true);
      e.preventDefault();

      const newMessage = {
        chatHistoryId: chatId,
        message: {
          position: "right",
          type: "text",
          title: "You",
          text: message
        }
      } as ChatMessagePayload;

      const { data } = await postChatMessage(newMessage);
      setMessage("");
      queryClient.invalidateQueries({ queryKey: [EQuerryKeys.CHAT_MESSAGE] });
      queryClient.invalidateQueries({
        queryKey: [EQuerryKeys.CHAT_HISTORY_BY_USER]
      });
      console.log(data);
      if (chatId !== data?.chatHistoryId)
        navigate(`/chat/${data.chatHistoryId}`);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="absolute bottom-0 w-full" onSubmit={sendMessage}>
      {isLoading && (
        <div className="fixed inset-0 bg-white bg-opacity-10">
          <CustomLoading />
        </div>
      )}
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
