import { getSavedJobs } from '@/api/jobApi';
import { isApiError } from '@/types/errors';
import { ApiError } from '@/types/Interfaces/auth';
import { savedJobsResponse } from '@/types/Interfaces/job';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

interface UseSavedJobsResponse {
  data?: savedJobsResponse;
  isLoading: boolean;
  isError: boolean;
  error?: ApiError;
  refetch: () => void;
}

const useSavedJobs = (): UseSavedJobsResponse => {
  const { data, isLoading, isError, error, refetch } = useQuery<savedJobsResponse, Error>({
    queryKey: ['savedJobs'],
    queryFn: getSavedJobs, 
    retry: false,
  });

  const apiError: ApiError | undefined = isApiError(error)
    ? {
        message: error.response?.data?.message || 'Unknown API error',
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

export default useSavedJobs;
