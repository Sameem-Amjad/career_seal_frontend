'uce client'
import { verifyEmail } from '@/api/authApi';
import { AxiosError } from "axios";
import { isApiError } from '@/types/errors';
import { useQuery } from '@tanstack/react-query';
import { ApiError, verifyResponse } from '@/types/Interfaces/auth';

interface UseVerifyResponse {
  data?: verifyResponse;
  isLoading: boolean;
  isError: boolean;
  error?: ApiError;
  refetch: () => void;
}

const useVerifyCode = (formData: { email: string; code: string }): UseVerifyResponse => {
  const { data, isLoading, isError, error, refetch } = useQuery<verifyResponse, Error>({
    queryKey: ['verifyEmail'],
    queryFn: () => verifyEmail(formData),
    enabled: false, 
    retry: false,
  });
  console.log("formdata: ",formData)

  const apiError: ApiError | undefined = isApiError(error)
    ? {
        message: error.response.data.message,
        statusCode: (error as AxiosError)?.response?.status || 500,
      }
    : {
        message: error?.message || 'An unknown error occurred',
        statusCode: 500,
      };

  return {
    data,
    isLoading,
    isError,
    error: apiError,
    refetch,
  };
};

export default useVerifyCode;