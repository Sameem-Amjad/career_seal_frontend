import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { isApiError } from "@/types/errors";
import { ApiError, updatePasswordResponse } from "@/types/Interfaces/auth";
import { sendContactFormMessage } from "@/api/authApi";

interface UseSendContactDetailsProps {
  sendContactFormMessage: (data: { name: string; email: string; phone: string; message: string }) => Promise<void>;
  isLoading: boolean;
  isError: boolean;
  error?: ApiError;
}

const useSendContactDetails = (): UseSendContactDetailsProps => {
  const mutation = useMutation<
    updatePasswordResponse,
    AxiosError,
    { name: string; email: string; phone: string; message: string }
  >({
    mutationFn: sendContactFormMessage,
  });

  const mutationError: ApiError | undefined = isApiError(mutation.error)
    ? {
        message: mutation.error.response?.data.message || "Failed to send contact message",
        statusCode: mutation.error.response?.status || 500,
      }
    : undefined;

  return {
    sendContactFormMessage: async (data) => {
      await mutation.mutateAsync(data);
    },
    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutationError,
  };
};

export default useSendContactDetails;
