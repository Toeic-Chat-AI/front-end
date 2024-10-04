import React from "react";

interface MessageProps {
  message: string;
  sender: string;
  createdAt: string;
}

const Message: React.FC<MessageProps> = ({ message, sender, createdAt }) => {
  return (
    <div>
      <strong>{sender}</strong>: {message}{" "}
      <small>{new Date(createdAt).toLocaleString()}</small>
    </div>
  );
};

export default Message;
