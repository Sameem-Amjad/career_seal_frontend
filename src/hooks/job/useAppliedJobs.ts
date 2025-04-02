import { getAppliedJobs } from '@/api/jobApi';
import { isApiError } from '@/types/errors';
import { ApiError } from '@/types/Interfaces/auth';
import { AppliedJobsResponse } from '@/types/Interfaces/job';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

interface UseAppliedJobsResponse {
  data?: AppliedJobsResponse;
  isLoading: boolean;
  isError: boolean;
  error?: ApiError;
  refetch: () => void;
}

const useAppliedJobs = (): UseAppliedJobsResponse => {
  const { data, isLoading, isError, error, refetch } = useQuery<AppliedJobsResponse, Error>({
    queryKey: ['appliedJobs'],
    queryFn: getAppliedJobs,
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

export default useAppliedJobs;
