import { useState } from "react";
import { TextField, Button } from "@mui/material";
import { MessageType } from "react-chat-elements";

type ChatInputProps = {
  onSend: (newMessage: MessageType) => void;
};

export const ChatInput = ({ onSend }: ChatInputProps) => {
  const [message, setMessage] = useState("");

  const sendMessage = async () => {
    if (message === "") return;
    const newMessage = {
      position: "right",
      type: "text",
      title: "You",
      text: message
    } as MessageType;

    onSend(newMessage);
  };

  return (
    <form className="absolute bottom-0 right-0 left-0" onSubmit={sendMessage}>
      <div className="p-4 items-center flex gap-4 w-full justify-center">
        <TextField
          className="w-1/2"
          variant="outlined"
          size="small"
          placeholder="Type a message..."
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button type="submit" variant="contained">
          Send
        </Button>
      </div>
    </form>
  );
};
