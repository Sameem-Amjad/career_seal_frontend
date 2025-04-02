import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isApiError } from "@/types/errors";
import { AxiosError } from "axios";
import { ApiError, updatePasswordResponse } from "@/types/Interfaces/auth";
import { updatPassword } from "@/api/authApi";

interface UseUpdatePasswordResponse {
  updatePassword: (data: { oldPassword: string; newPassword: string }) => Promise<void>;
  isLoading: boolean;
  isError: boolean;
  error?: ApiError;
  reset: () => void; 
}

const useUpdatePassword = (): UseUpdatePasswordResponse => {
  const queryClient = useQueryClient();

  const updatePasswordMutation = useMutation<
    updatePasswordResponse,
    AxiosError,
    { oldPassword: string; newPassword: string }
  >({
    mutationFn: updatPassword, 
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userDetails"] }); 
    },
  });

  const updatePasswordError: ApiError | undefined = isApiError(updatePasswordMutation.error)
    ? {
        message: updatePasswordMutation.error.response?.data.message || "Failed to update password",
        statusCode: updatePasswordMutation.error.response?.status || 500,
      }
    : undefined;

  return {
    updatePassword: async (data) => {
      await updatePasswordMutation.mutateAsync(data);
    },
    isLoading: updatePasswordMutation.isPending,
    isError: updatePasswordMutation.isError,
    error: updatePasswordError,
    reset: updatePasswordMutation.reset, 
  };
};

export default useUpdatePassword;
