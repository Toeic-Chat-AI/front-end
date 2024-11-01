import { useQuery } from "@tanstack/react-query";
import { EQuerryKeys } from "../constants/EQuerryKeys";
import {
  getChatHistoryById,
  getChatHistoryByUserId
} from "../services/apiChatHistory";
import { ChatHistories, ChatHistory } from "../types";
import { useGlobalStorage } from "../contexts/Storage";

export function useGetChatHistory(id?: string) {
  const { data, error, isLoading } = useQuery<ChatHistory>({
    queryKey: [EQuerryKeys.CHAT_HISTORY, id],
    queryFn: () => getChatHistoryById(id),
    ...{
      refetchOnWindowFocus: true,
      enabled: !!id
    }
  });

  return { data, error, isLoading };
}

export function useGetChatHistoryByUserID() {
  const { user } = useGlobalStorage();
  const { data, error, isLoading } = useQuery<ChatHistories>({
    queryKey: [EQuerryKeys.CHAT_HISTORY_BY_USER],
    queryFn: () => getChatHistoryByUserId(),
    ...{
      refetchOnWindowFocus: true,
      enabled: !!user?.id
    }
  });

  return { data, error, isLoading };
}
