import { useParams, useNavigate } from "react-router-dom";
import { ChatHistory } from "../../types";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useState, useEffect } from "react";
import { ChatHistoryOptionModal } from "../modals/ChatHistoryOptionModal";
import {
  deleteChatHistory,
  updateChatHistory
} from "../../services/apiChatHistory";
import { useQueryClient } from "@tanstack/react-query";
import { EQuerryKeys } from "../../constants/EQuerryKeys";
import { toast } from "react-toastify";

const getActiveClassName = (isActive: boolean) =>
  `${isActive ? "bg-slate-700" : "bg-slate-800"}`;

export const HistoryItem = ({ item }: { item: ChatHistory }) => {
  const queryClient = useQueryClient();
  const [openMenu, setOpenMenu] = useState(false);
  const [openOptionModal, setOpenOptionModal] = useState(false);
  const [isEditTitle, setIsEditTitle] = useState(false);
  const [title, setTitle] = useState(item.title);
  const navigate = useNavigate();
  const { chatId } = useParams();
  const isActive = chatId === item._id;

  const handleNavigateToChat = async () => {
    navigate(`/chat/${item._id}`);
  };

  const handleToggleEditTitle = () => {
    setOpenOptionModal(false);
    setIsEditTitle(true);
  };

  useEffect(() => {
    if (isEditTitle) {
      const inputElement = document.querySelector<HTMLInputElement>(
        "#chat-history-title"
      );
      if (inputElement) {
        inputElement.focus();
      }
    }
  }, [isEditTitle]);

  const handleBlur = async () => {
    setIsEditTitle(false);
    if (title !== item.title) {
      const newData = await updateChatHistory(item._id, title);
      queryClient.invalidateQueries({
        queryKey: [EQuerryKeys.CHAT_HISTORY_BY_USER]
      });
      queryClient.invalidateQueries({
        queryKey: [EQuerryKeys.CHAT_HISTORY]
      });
      setTitle(newData.title);
      toast.success("Chat history title updated successfully");
      return;
    }
    setTitle(item.title);
    toast.error("Failed to update chat history title");
  };

  const handleDeleteChatHistory = async () => {
    setOpenOptionModal(false);
    const isDeleteSuccess = await deleteChatHistory(item._id);
    if (isDeleteSuccess) {
      navigate("/chat");
      queryClient.invalidateQueries({
        queryKey: [EQuerryKeys.CHAT_HISTORY_BY_USER]
      });
      queryClient.invalidateQueries({
        queryKey: [EQuerryKeys.CHAT_HISTORY]
      });
      toast.success("Chat history deleted successfully");
      return;
    }
    toast.error("Failed to delete chat history");
  };

  return (
    <div
      className={`relative ${getActiveClassName(
        isActive
      )} hover:cursor-pointer hover:bg-slate-700 rounded-md py-2 px-3 mx-2 flex justify-between items-center `}
      onClick={handleNavigateToChat}
      onMouseOver={() => setOpenMenu(true)}
      onMouseLeave={() => setOpenMenu(false)}
    >
      {isEditTitle ? (
        <input
          className="text-sm text-black"
          id="chat-history-title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={handleBlur}
        />
      ) : (
        <div className="text-sm overflow-hidden text-ellipsis">{title}</div>
      )}
      {openMenu && (
        <MoreHorizIcon
          fontSize="small"
          onClick={(e) => {
            e.stopPropagation();
            setOpenOptionModal(!openOptionModal);
          }}
        />
      )}
      {openOptionModal && (
        <ChatHistoryOptionModal
          handleClose={() => setOpenOptionModal(false)}
          handleEditTitle={handleToggleEditTitle}
          handleDeleteChatHistory={handleDeleteChatHistory}
        />
      )}
    </div>
  );
};
