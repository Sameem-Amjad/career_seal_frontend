import { login } from '@/api/authApi';
import { isApiError } from '@/types/errors';
import { ApiError, LoginResponse } from '@/types/Interfaces/auth';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

interface UseLoginResponse {
  data?: LoginResponse;
  isLoading: boolean;
  isError: boolean;
  error?: ApiError;
  refetch: () => void;
}

const useLogin = (credentials: { email: string; password: string }): UseLoginResponse => {
  const { data, isLoading, isError, error, refetch } = useQuery<LoginResponse, Error>({
    queryKey: ['login'],
    queryFn: () => login(credentials),
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


export default useLogin;