import { useRef } from "react";
import { ChatInput } from "./ChatInput";
import { MessageList } from "react-chat-elements";
import { useGetChatMessagesByChatHistory } from "../../hooks/useChatMessages";
import { CustomLoading } from "../Loading/Loading";

const ChatBox = () => {
  const messageListRef = useRef(null);
  const {
    data: messages,
    isLoading,
    isRefetching
  } = useGetChatMessagesByChatHistory();

  if (isLoading || isRefetching) return <CustomLoading />;

  return (
    <div className="relative w-[70vw] flex flex-col items-center">
      <div className="m-4 text-2xl font-bold text-slate-500 self-start">
        Chat Toeic
      </div>
      <MessageList
        className="message-list"
        toBottomHeight={"100%"}
        referance={messageListRef}
        lockable
        dataSource={messages || []}
        sendMessagePreview={true}
      />
      <ChatInput />
    </div>
  );
};

export default ChatBox;
