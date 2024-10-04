import { Avatar } from "@mui/material";
import { useState } from "react";

export const User = () => {
  const [toggleUser, setToggleUser] = useState(false);
  return (
    <div className="fixed right-0 top-0">
      <div
        className="m-4 hover:cursor-pointer"
        onClick={() => setToggleUser(true)}
      >
        <Avatar />
      </div>
      {toggleUser && <div className="">Hello hehe</div>}
    </div>
  );
};
