import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useGetChatHistoryByUserID } from "../../hooks/useChatHistory";
import { CustomLoading } from "../Loading/Loading";
import { HistoryItem } from "./HistoryItem";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalStorage } from "../../contexts/Storage";

export const ChatHistory = () => {
  const navigate = useNavigate();
  const { user } = useGlobalStorage();
  const { data: chatHistories, isLoading } = useGetChatHistoryByUserID(
    user?.id
  );
  const [openChatHistory, setOpenChatHistory] = useState(true);

  const handleToggleChatHistory = () => {
    setOpenChatHistory(!openChatHistory);
  };

  if (isLoading) return <CustomLoading />;

  return (
    <>
      <div
        className={`bg-slate-800 text-white h-screen w-1/6 flex flex-col gap-4 transition-all duration-200 ${
          !openChatHistory && "hidden"
        }`}
      >
        <div className="flex gap-4 items-center w-full justify-between p-6">
          <div
            className="hover:cursor-pointer hover:brightness-105"
            onClick={handleToggleChatHistory}
          >
            <ArrowCircleLeftIcon />
          </div>
          <div>Chat Toeic</div>
          <div
            className="hover:cursor-pointer hover:brightness-105"
            onClick={() => navigate("/chat")}
          >
            <AddCircleIcon />
          </div>
        </div>
        <div className="overflow-y-scroll h-full custom-scrollbar">
          {chatHistories?.map((chatHistoryItem) => (
            <HistoryItem key={chatHistoryItem._id} item={chatHistoryItem} />
          ))}
        </div>
      </div>
      <div className={`${openChatHistory && "hidden"} h-screen`}>
        <div
          className="hover:cursor-pointer hover:brightness-105 m-5"
          onClick={handleToggleChatHistory}
        >
          <ArrowCircleRightIcon />
        </div>
      </div>
    </>
  );
};
