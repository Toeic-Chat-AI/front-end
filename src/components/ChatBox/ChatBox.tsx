import React, { useEffect, useRef, useState } from "react";
import { ChatInput } from "./ChatInput";
import { MessageList, MessageType } from "react-chat-elements";

const clearRef = () => {};

const ChatBox = () => {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const messageListRef = useRef<HTMLDivElement>(null);

  const addMessage = (newMessage: MessageType) => {
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    clearRef();
  };

  useEffect(() => {
    return () => {
      console.log("dismount");
    };
  }, []);

  return (
    <div className="relative w-[70vw] flex flex-col items-center">
      <div className="m-4 text-2xl font-bold text-slate-500 self-start">
        Chat Toeic
      </div>
      <MessageList
        className="message-list"
        toBottomHeight={"100%"}
        referance={null}
        lockable
        dataSource={messages}
        sendMessagePreview={true}
      />
      <ChatInput onSend={addMessage} />
    </div>
  );
};

export default ChatBox;
