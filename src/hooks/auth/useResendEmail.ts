import { useMutation } from "@tanstack/react-query";
import { isApiError } from "@/types/errors";
import { AxiosError } from "axios";
import { ApiError, updatePasswordResponse } from "@/types/Interfaces/auth";
import { resendEmail } from "@/api/authApi";

interface UseResendEmailResponse {
  resendEmail: () => Promise<void>;
  isLoading: boolean;
  isError: boolean;
  error?: ApiError;
  reset: () => void;
}

const useResendEmail = (): UseResendEmailResponse => {
  const resendEmailMutation = useMutation<updatePasswordResponse, AxiosError>({
    mutationFn: resendEmail,
  });

  const resendEmailError: ApiError | undefined = isApiError(resendEmailMutation.error)
    ? {
        message: resendEmailMutation.error.response?.data.message || "Failed to resend email",
        statusCode: resendEmailMutation.error.response?.status || 500,
      }
    : undefined;

  return {
    resendEmail: async () => {
      await resendEmailMutation.mutateAsync();
    },
    isLoading: resendEmailMutation.isPending,
    isError: resendEmailMutation.isError,
    error: resendEmailError,
    reset: resendEmailMutation.reset,
  };
};

export default useResendEmail;
