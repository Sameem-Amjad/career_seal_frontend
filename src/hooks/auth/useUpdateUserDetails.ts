import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isApiError } from "@/types/errors";
import { AxiosError } from "axios";
import { ApiError, UserUpdateResponse } from "@/types/Interfaces/auth";
import { updatUserDetails } from "@/api/authApi";

interface UseUpdateUserDetailsResponse {
  updateUserDetails: (data: { username?: string; email?: string, image?: string }) => Promise<void>;
  isLoading: boolean;
  isError: boolean;
  error?: ApiError;
}

const useUpdateUserDetails = (): UseUpdateUserDetailsResponse => {
  const queryClient = useQueryClient();

  const updateUserMutation = useMutation<UserUpdateResponse, AxiosError, { username?: string, image?: string }>({
    mutationFn: updatUserDetails,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userDetails"] });
    },
  });

  const updateUserError: ApiError | undefined = isApiError(updateUserMutation.error)
    ? {
        message: updateUserMutation.error.response?.data.message || "Failed to update profile",
        statusCode: updateUserMutation.error.response?.status || 500,
      }
    : undefined;

  return {
    updateUserDetails: async (data) => {
      await updateUserMutation.mutateAsync(data);
    },
    isLoading: updateUserMutation.isPending,
    isError: updateUserMutation.isError,
    error: updateUserError,
  };
};

export default useUpdateUserDetails;
