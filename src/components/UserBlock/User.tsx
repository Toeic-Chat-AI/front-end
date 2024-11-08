import { Avatar } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { removeAllCookies } from "../../helpers";

export const User = () => {
  const navigate = useNavigate();
  const [toggleUser, setToggleUser] = useState(false);

  const handleLogout = () => {
    removeAllCookies();
    navigate("/login");
  };

  return (
    <div className="flex justify-between w-full">
      <div className="m-4 text-2xl font-bold text-slate-500 self-start">
        Chat Toeic
      </div>
      <div className="w-fit">
        <div
          className="m-4 mr-10 hover:cursor-pointer"
          onClick={() => setToggleUser(!toggleUser)}
        >
          <Avatar />
        </div>
        {toggleUser && (
          <div className="flex flex-col gap-1 rounded-md absolute right-12 bg-slate-700 text-white">
            <div
              className="hover:cursor-pointer hover:bg-opacity-90 py-2 px-4 text-center"
              onClick={handleLogout}
            >
              Log out
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
