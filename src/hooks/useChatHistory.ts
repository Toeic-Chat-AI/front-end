import { useQuery } from "@tanstack/react-query";
import { EQuerryKeys } from "../constants/EQuerryKeys";
import {
  getChatHistoryById,
  getChatHistoryByUserId
} from "../services/apiChatHistory";
import { ChatHistories, ChatHistory } from "../types";

export function useGetChatHistory(id?: string) {
  const { data, error, isLoading } = useQuery<ChatHistory>({
    queryKey: [EQuerryKeys.CHAT_HISTORY, id],
    queryFn: () => getChatHistoryById(id),
    ...{
      refetchOnWindowFocus: false,
      enabled: !!id
    }
  });

  return { data, error, isLoading };
}

export function useGetChatHistoryByUserID(userId: string | undefined) {
  const { data, error, isLoading } = useQuery<ChatHistories>({
    queryKey: [EQuerryKeys.CHAT_HISTORY_BY_USER, userId],
    queryFn: () => getChatHistoryByUserId(),
    ...{
      refetchOnWindowFocus: false,
      enabled: !!userId
    }
  });

  return { data, error, isLoading };
}
