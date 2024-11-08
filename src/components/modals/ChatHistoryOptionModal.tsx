import { ClickAwayListener } from "@mui/material";

type ChatHistoryOptionModalType = {
  handleClose: () => void;
  handleEditTitle: () => void;
  handleDeleteChatHistory: () => void;
};

export const ChatHistoryOptionModal = ({
  handleClose,
  handleEditTitle,
  handleDeleteChatHistory
}: ChatHistoryOptionModalType) => {
  return (
    <ClickAwayListener onClickAway={handleClose}>
      <div className="absolute top-10 z-20 right-0 w-fit rounded-md p-1 text-black bg-slate-100 font-medium">
        <div
          className="px-5 py-2 hover:brightness-85 hover:bg-slate-300 rounded-md"
          onClick={() => handleEditTitle()}
        >
          Rename
        </div>
        <div
          className="px-5 py-2 hover:brightness-85 hover:bg-slate-300 rounded-md text-red-600"
          onClick={() => handleDeleteChatHistory()}
        >
          Delete
        </div>
      </div>
    </ClickAwayListener>
  );
};
