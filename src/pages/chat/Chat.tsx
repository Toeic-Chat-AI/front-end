import ChatBox from "../../components/ChatBox/ChatBox";
import { ChatHistory } from "../../components/ChatHistory/ChatHistory";
import { User } from "../../components/UserBlock/User";

export const Chat = (): JSX.Element => {
  return (
    <div className="flex w-screen relative">
      <User />
      <ChatHistory />
      <ChatBox />
    </div>
  );
};
