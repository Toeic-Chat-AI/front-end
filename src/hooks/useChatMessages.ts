import { useQuery } from "@tanstack/react-query";
import { EQuerryKeys } from "../constants/EQuerryKeys";
import { getChatMessagesByChatHistory } from "../services/apiChatMessages";
import { ChatMessageResponse } from "../types/ChatMessage";

export function useGetChatMessagesByChatHistory(chatId?: string) {
  const { data, error, isLoading, refetch, isRefetching } =
    useQuery<ChatMessageResponse>({
      queryKey: [EQuerryKeys.CHAT_MESSAGE, chatId],
      queryFn: () => getChatMessagesByChatHistory(chatId),
      ...{
        refetchOnWindowFocus: true,
        enabled: !!chatId
      }
    });

  return { data, error, isLoading, refetch, isRefetching };
}
