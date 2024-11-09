import { useRef } from "react";
import { ChatInput } from "./ChatInput";
import { MessageList } from "react-chat-elements";
import { useGetChatMessagesByChatHistory } from "../../hooks/useChatMessages";
import { CustomLoading } from "../Loading/Loading";
import { useParams } from "react-router-dom";
import { ChatFileUpload } from "./ChatFileUpload";

const ChatBox = () => {
  const messageListRef = useRef(null);
  const { chatId } = useParams();
  const { data, isLoading } = useGetChatMessagesByChatHistory(chatId);

  if (isLoading) return <CustomLoading />;

  return (
    <div className="flex w-full h-full justify-between">
      <div className="relative w-3/4 flex flex-col items-center justify-between h-full">
        {data && data.files.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full">
            <div className="text-2xl">
              Upload a document to start a new chat
            </div>
          </div>
        )}
        <MessageList
          className="message-list w-full"
          toBottomHeight={"100%"}
          referance={messageListRef}
          lockable
          dataSource={data?.messages || []}
          sendMessagePreview={true}
        />
        <ChatInput />
      </div>
      <ChatFileUpload files={data?.files} />
    </div>
  );
};

export default ChatBox;
