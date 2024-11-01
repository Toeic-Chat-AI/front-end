import { useQuery } from "@tanstack/react-query";
import { EQuerryKeys } from "../constants/EQuerryKeys";
import { ChatMessage } from "../types";
import { getChatMessagesByChatHistory } from "../services/apiChatMessages";

export function useGetChatMessagesByChatHistory(id?: string) {
  const { data, error, isLoading, refetch, isRefetching } = useQuery<
    ChatMessage[]
  >({
    queryKey: [EQuerryKeys.CHAT_MESSAGE, id],
    queryFn: () => getChatMessagesByChatHistory(id),
    ...{
      refetchOnWindowFocus: true,
      enabled: !!id
    }
  });

  return { data, error, isLoading, refetch, isRefetching };
}
