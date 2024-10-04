import { useState, useEffect } from "react";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { ChatHistories } from "../../types";

export const ChatHistory = () => {
  const [Histories, setHistories] = useState<ChatHistories>([]);
  
  return (
    <div className="bg-slate-800 text-white h-screen w-1/6 flex flex-col gap-4">
      <div className="flex gap-4 items-center w-full justify-between p-6">
        <ArrowCircleLeftIcon />
        <div>Chat Toeic</div>
        <AddCircleIcon />
      </div>
      <div className="overflow-y-scroll h-full">

      </div>
    </div>
  );
};
