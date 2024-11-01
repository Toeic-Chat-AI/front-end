import { useRef } from "react";
import { ChatInput } from "./ChatInput";
import { MessageList } from "react-chat-elements";
import { useGetChatMessagesByChatHistory } from "../../hooks/useChatMessages";
import { CustomLoading } from "../Loading/Loading";
import { useParams } from "react-router-dom";

const ChatBox = () => {
  const messageListRef = useRef(null);
  const { chatId } = useParams();
  const { data: messages, isLoading } = useGetChatMessagesByChatHistory(chatId);

  if (isLoading) return <CustomLoading />;

  return (
    <div className="relative w-3/4 flex flex-col items-center justify-between h-full">
      <MessageList
        className="message-list w-full"
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
