import axiosInterceptor from '@/config/axios';
import { AllJobsResponse, AppliedJobsResponse, ApplyJobResponse, savedJobsResponse, saveJobResponse } from '@/types/Interfaces/job';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const getAllJobs = async (): Promise<AllJobsResponse> => {
    const response = await axiosInterceptor.get(`${API_BASE_URL}/api/v1/job`);
    return response.data; 
  };

export const getSavedJobs = async (): Promise<savedJobsResponse> => {
  const response = await axiosInterceptor.get(`${API_BASE_URL}/api/v1/job/save`);
  return response.data; 
};

export const saveJob = async (jobId:string): Promise<saveJobResponse> => {
  const response = await axiosInterceptor.post(`${API_BASE_URL}/api/v1/job/save/${jobId}`);
  return response.data; 
};

export const unSaveJob = async (jobId:string): Promise<saveJobResponse> => {
  const response = await axiosInterceptor.delete(`${API_BASE_URL}/api/v1/job/save/${jobId}`);
  return response.data; 
};


export const getAppliedJobs = async (): Promise<AppliedJobsResponse> => {
  const response = await axiosInterceptor.get(`${API_BASE_URL}/api/v1/proposal/my`)
  return response.data; 
};


export const applyJob = async (jobId : string): Promise<ApplyJobResponse> => {
  const response = await axiosInterceptor.post(`${API_BASE_URL}/api/v1/proposal`, {job: jobId})
  return response.data; 
};