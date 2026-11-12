import axiosInterceptor from "@/config/axios";
import { API_BASE_URL } from "@/config/api";
import { Filters, JobDataResponse } from "@/types/Interfaces/job";

/** Visa-sponsored listings matching a title, in one region. */
export const getAllJobsCoresignal = async (filters: Filters): Promise<JobDataResponse> => {
  const response = await axiosInterceptor.post(`${API_BASE_URL}/api/v1/job/search`, { title: filters.title, location: filters.location });
  return response.data;
};

/** Job titles that fit a resume (suggested on the server; the AI key never reaches the browser). */
export const suggestJobTitles = async (resumeText: string): Promise<{ success: boolean; titles: string[]; source: string }> => {
  const response = await axiosInterceptor.post(`${API_BASE_URL}/api/v1/ai/job-titles`, { resumeText });
  return response.data;
};
