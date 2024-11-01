import { useQuery } from "@tanstack/react-query";
import { getUserProfile } from "../services/apiUser";
import { EQuerryKeys } from "../constants/EQuerryKeys";
import { UserProfile } from "../types/UserProfile";
import { getCookie } from "../helpers";

export const useGetUserProfile = () => {
  const userId = getCookie("userId");
  const { data, error, isLoading } = useQuery<UserProfile | undefined>({
    queryKey: [EQuerryKeys.USER_PROFILE, userId],
    queryFn: () => getUserProfile(),
    ...{
      refetchOnWindowFocus: true,
      enabled: !!userId
    }
  });
  return { data, error, isLoading };
};
