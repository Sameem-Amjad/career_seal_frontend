import { useMutation, useQueryClient } from '@tanstack/react-query';
import { saveJob, unSaveJob } from '@/api/jobApi'; // Import your API functions
import { isApiError } from '@/types/errors';
import { AxiosError } from 'axios';
import { saveJobResponse } from '@/types/Interfaces/job';
import { ApiError } from '@/types/Interfaces/auth';

interface UseSaveJobResponse {
  saveJob: (jobId: string) => Promise<void>;
  unSaveJob: (jobId: string) => Promise<void>;
  isLoading: boolean;
  isError: boolean;
  error?: ApiError;
}

const useSaveJob = (): UseSaveJobResponse => {
  const queryClient = useQueryClient();

  const saveJobMutation = useMutation<saveJobResponse, AxiosError, string>({
    mutationFn: saveJob,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['savedJobs'] });
    },
  });

  const unSaveJobMutation = useMutation<saveJobResponse, AxiosError, string>({
    mutationFn: unSaveJob,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['savedJobs'] });
    },
  });

  const saveJobError: ApiError | undefined = isApiError(saveJobMutation.error)
    ? {
        message: saveJobMutation.error.response?.data.message || 'Failed to save job',
        statusCode: saveJobMutation.error.response?.status || 500,
      }
    : undefined;

  const unSaveJobError: ApiError | undefined = isApiError(unSaveJobMutation.error)
    ? {
        message: unSaveJobMutation.error.response?.data.message || 'Failed to unsave job',
        statusCode: unSaveJobMutation.error.response?.status || 500,
      }
    : undefined;

  return {
    saveJob: async (jobId: string) => {
      await saveJobMutation.mutateAsync(jobId);
    },
    unSaveJob: async (jobId: string) => {
      await unSaveJobMutation.mutateAsync(jobId);
    },
    isLoading: saveJobMutation.isPending || unSaveJobMutation.isPending,
    isError: saveJobMutation.isError || unSaveJobMutation.isError,
    error: saveJobError || unSaveJobError,
  };
};

export default useSaveJob;