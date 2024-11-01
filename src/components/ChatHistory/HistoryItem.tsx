import { useGetChatHistory } from "../../hooks/useChatHistory";
import { CustomLoading } from "../Loading/Loading";

export const HistoryItem = ({ id }: { id: string }) => {
  const { data, error, isLoading } = useGetChatHistory(id);

  if (isLoading) return <CustomLoading />;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="p-4">
      <div className="text-xl font-bold">{data?.title}</div>
    </div>
  );
};
