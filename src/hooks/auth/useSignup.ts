import { register } from '@/api/authApi';
import { isApiError } from '@/types/errors';
import { ApiError, signupResponse } from '@/types/Interfaces/auth';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

interface UseSignupResponse {
  data?: signupResponse;
  isLoading: boolean;
  isError: boolean;
  error?: ApiError;
  refetch: () => void;
}

const useSignup = (credentials: { email: string; password: string }): UseSignupResponse => {
  const { data, isLoading, isError, error, refetch } = useQuery<signupResponse, Error>({
    queryKey: ['signup'],
    queryFn: () => register(credentials),
    enabled: false, 
    retry: false,
  });

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

export default useSignup;