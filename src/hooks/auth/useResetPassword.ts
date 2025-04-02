import { useMutation } from "@tanstack/react-query";
import { isApiError } from "@/types/errors";
import { AxiosError } from "axios";
import { ApiError, updatePasswordResponse } from "@/types/Interfaces/auth";
import { resetPassword } from "@/api/authApi";

interface UseResetPasswordResponse {
  resetPassword: (data: { token: string; newPassword: string }) => Promise<void>;
  isLoading: boolean;
  isError: boolean;
  error?: ApiError;
  reset: () => void;
}

const useResetPassword = (): UseResetPasswordResponse => {
  const resetPasswordMutation = useMutation<
    updatePasswordResponse,
    AxiosError,
    { token: string; newPassword: string }
  >({
    mutationFn: resetPassword,
  });

  const resetPasswordError: ApiError | undefined = isApiError(resetPasswordMutation.error)
    ? {
        message: resetPasswordMutation.error.response?.data.message || "Failed to reset password",
        statusCode: resetPasswordMutation.error.response?.status || 500,
      }
    : undefined;

  return {
    resetPassword: async (data) => {
      await resetPasswordMutation.mutateAsync(data);
    },
    isLoading: resetPasswordMutation.isPending,
    isError: resetPasswordMutation.isError,
    error: resetPasswordError,
    reset: resetPasswordMutation.reset,
  };
};

export default useResetPassword;
