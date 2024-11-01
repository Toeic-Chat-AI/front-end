import { useParams, useNavigate } from "react-router-dom";
import { ChatHistory } from "../../types";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useState } from "react";

const getActiveClassName = (isActive: boolean) =>
  `${isActive ? "bg-slate-700" : "bg-slate-800"}`;

export const HistoryItem = ({ item }: { item: ChatHistory }) => {
  const [openMenu, setOpenMenu] = useState(false);
  const [openOptionModal, setOpenOptionModal] = useState(false);
  const navigate = useNavigate();
  const { chatId } = useParams();
  const isActive = chatId === item._id;

  const handleNavigateToChat = async () => {
    navigate(`/chat/${item._id}`);
  };

  return (
    <div
      className={`${getActiveClassName(
        isActive
      )} hover:cursor-pointer hover:bg-slate-700 rounded-md py-2 px-3 mx-2 flex justify-between items-center`}
      onClick={handleNavigateToChat}
      onMouseOver={() => setOpenMenu(true)}
      onMouseLeave={() => setOpenMenu(false)}
    >
      <div className="text-sm">{item?.title}</div>
      {openMenu && (
        <MoreHorizIcon
          fontSize="small"
          onClick={() => setOpenOptionModal(true)}
        />
      )}
    </div>
  );
};
