import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { forgotPassword } from "@/api/authApi";
import { ApiError, updatePasswordResponse } from "@/types/Interfaces/auth";
import { isApiError } from "@/types/errors";

interface UseForgotPasswordResponse {
  requestPasswordReset: (data: { email: string }) => Promise<void>;
  isLoading: boolean;
  isError: boolean;
  error?: ApiError;
  reset: () => void;
}

const useForgotPassword = (): UseForgotPasswordResponse => {
  const forgotPasswordMutation = useMutation<
    updatePasswordResponse,
    AxiosError,
    { email: string }
  >({
    mutationFn: forgotPassword,
  });

  const forgotPasswordError: ApiError | undefined = isApiError(
    forgotPasswordMutation.error
  )
    ? {
        message:
          forgotPasswordMutation.error.response?.data.message ||
          "Failed to send reset email",
        statusCode: forgotPasswordMutation.error.response?.status || 500,
      }
    : undefined;

  return {
    requestPasswordReset: async (data) => {
      await forgotPasswordMutation.mutateAsync(data);
    },
    isLoading: forgotPasswordMutation.isPending,
    isError: forgotPasswordMutation.isError,
    error: forgotPasswordError,
    reset: forgotPasswordMutation.reset,
  };
};

export default useForgotPassword;
