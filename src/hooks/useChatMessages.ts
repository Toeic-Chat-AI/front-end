import { useQuery } from "@tanstack/react-query";
import { EQuerryKeys } from "../constants/EQuerryKeys";
import { ChatMessage } from "../types";
import { getChatMessagesByChatHistory } from "../services/apiChatMessages";

export function useGetChatMessagesByChatHistory(chatId?: string) {
  const { data, error, isLoading, refetch, isRefetching } = useQuery<
    ChatMessage[]
  >({
    queryKey: [EQuerryKeys.CHAT_MESSAGE, chatId],
    queryFn: () => getChatMessagesByChatHistory(chatId),
    ...{
      refetchOnWindowFocus: true,
      enabled: !!chatId
    }
  });

  return { data, error, isLoading, refetch, isRefetching };
}
