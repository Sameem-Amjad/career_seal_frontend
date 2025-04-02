import { useMutation, useQueryClient } from '@tanstack/react-query';
import { applyJob } from '@/api/jobApi';
import { isApiError } from '@/types/errors';
import { AxiosError } from 'axios';
import { ApplyJobResponse } from '@/types/Interfaces/job';
import { ApiError } from '@/types/Interfaces/auth';

interface UseApplyJobResponse {
  applyJob: (jobId: string) => Promise<void>;
  isLoading: boolean;
  isError: boolean;
  error?: ApiError;
}

const useApplyJob = (): UseApplyJobResponse => {
  const queryClient = useQueryClient();

  const applyJobMutation = useMutation<ApplyJobResponse, AxiosError, string>({
    mutationFn: applyJob,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['appliedJobs'] });
    },
  });

  const applyJobError: ApiError | undefined = isApiError(applyJobMutation.error)
    ? {
        message: applyJobMutation.error.response?.data.message || 'Failed to apply for job',
        statusCode: applyJobMutation.error.response?.status || 500,
      }
    : undefined;

  return {
    applyJob: async (jobId: string) => {
      await applyJobMutation.mutateAsync(jobId);
    },
    isLoading: applyJobMutation.isPending,
    isError: applyJobMutation.isError,
    error: applyJobError,
  };
};

export default useApplyJob;
