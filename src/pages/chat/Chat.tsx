import ChatBox from "../../components/ChatBox/ChatBox";
import { ChatHistory } from "../../components/ChatHistory/ChatHistory";
import { User } from "../../components/UserBlock/User";

export const Chat = (): JSX.Element => {
  return (
    <div className="flex w-screen h-screen">
      <ChatHistory />
      <div className="flex-1 flex flex-col items-center">
        <User />
        <ChatBox />
      </div>
    </div>
  );
};
