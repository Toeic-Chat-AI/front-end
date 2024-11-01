import { Avatar } from "@mui/material";
import { useState } from "react";

export const User = () => {
  const [toggleUser, setToggleUser] = useState(false);
  return (
    <div className="flex justify-between w-full">
      <div className="m-4 text-2xl font-bold text-slate-500 self-start">
        Chat Toeic
      </div>
      <div className="">
        <div
          className="m-4 hover:cursor-pointer"
          onClick={() => setToggleUser(true)}
        >
          <Avatar />
        </div>
        {toggleUser && <div className="">Hello hehe</div>}
      </div>
    </div>
  );
};
