import { getAllJobs } from '@/api/jobApi';
import { isApiError } from '@/types/errors';
import { ApiError } from '@/types/Interfaces/auth';
import { AllJobsResponse } from '@/types/Interfaces/job';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

interface UseAllJobsResponse {
  data?: AllJobsResponse;
  isLoading: boolean;
  isError: boolean;
  error?: ApiError;
  refetch: () => void;
}

const useAllJobs = (): UseAllJobsResponse => {
  const { data, isLoading, isError, error, refetch } = useQuery<AllJobsResponse, Error>({
    queryKey: ['allJobs'],
    queryFn: getAllJobs,
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

export default useAllJobs;
