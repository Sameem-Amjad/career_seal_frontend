  import { useQuery } from '@tanstack/react-query';
  import { ApiError, UserDetailsResponse } from '@/types/Interfaces/auth';
  import { isApiError } from '@/types/errors';
  import { fetchCurrentUser } from '@/api/authApi';
  import { AxiosError } from 'axios';

  interface UseGetUserDetailsResponse {
    data?: UserDetailsResponse;
    isLoading: boolean;
    isError: boolean;
    error?: ApiError;
    refetch: () => void;
  }

  const useGetUserDetails = (token: string): UseGetUserDetailsResponse => {
    const { data, isLoading, isError, error, refetch } = useQuery<UserDetailsResponse | undefined, AxiosError>({
      queryKey: ['userDetails'],
      queryFn: fetchCurrentUser,
      enabled: !!token,
      retry: false,
    });
  
    const apiError: ApiError | undefined = isApiError(error)
      ? {
          message: error.response?.data?.message || error.message,
          statusCode: error.response?.status || 500,
        }
      : error
      ? {
          message: error?.message || 'An unknown error occurred',
          statusCode: 500,
        }
      : undefined;
  
    return {
      data: data ?? undefined, // Ensure `data` is explicitly undefined when no user info is found
      isLoading,
      isError,
      error: apiError,
      refetch,
    };
  };
export default useGetUserDetails;  