import React, { useState, useEffect } from "react";
import Message from "./Message";
import { ChatMessage } from "../../types";
import { ChatInput } from "./ChatInput";

const ChatBox: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  return (
    <div className="relative w-full">
      <div className="m-4 text-2xl font-bold text-slate-500">Chat Toeic</div>
      <div>
        {messages.map((msg, index) => (
          <Message
            key={index}
            createdAt={msg.createAt}
            message={msg.message}
            sender={msg.sender}
          />
        ))}
      </div>
      <ChatInput />
    </div>
  );
};

export default ChatBox;
