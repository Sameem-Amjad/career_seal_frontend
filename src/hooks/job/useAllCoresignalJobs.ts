import { AxiosError } from "axios";
import { isApiError } from "@/types/errors";
import { useMutation } from "@tanstack/react-query";
import { ApiError } from "@/types/Interfaces/auth";
import { getAllJobsCoresignal } from "@/api/coresignalApi";
import { Filters, JobDataResponse } from "@/types/Interfaces/job";

const useCoreSignalJobs = (filters: Filters) => {
  const { data, isPending, isError, error,mutate } = useMutation<JobDataResponse, Error>({
    mutationKey: ["coreSignalJobs"],
    mutationFn: () => getAllJobsCoresignal(filters),  
  });


  // const { data, isLoading, isError, error, refetch } = useQuery<JobDataResponse, Error>({
  //   queryKey: ['coreSignalJobs', filters], // Dynamic key based on filters
  //   queryFn: () => getAllJobsCoresignal(filters), // Pass filters to the API call
  //   retry: false,
  //   enabled: !!filters, // Only run query if filters are provided
  // });

  const apiError: ApiError | undefined = isApiError(error)
    ? {
        message: error.response?.data?.message || 'An error occurred',
        statusCode: (error as AxiosError)?.response?.status || 500,
      }
    : {
        message: error?.message || 'An unknown error occurred',
        statusCode: 500,
      };

  return {
    data,
    isLoading: isPending,
    isError,
    error: apiError,
    mutate
  };
};

export default useCoreSignalJobs;
