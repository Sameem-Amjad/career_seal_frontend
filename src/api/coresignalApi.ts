
import axiosInterceptor from '@/config/axios';
import { Filters, JobDataResponse,} from '@/types/Interfaces/job';



const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;


export const getAllJobsCoresignal = async (filters: Filters ): Promise<JobDataResponse> => {
  const response = await axiosInterceptor.post(`${API_BASE_URL}api/v1/job/coresignaljobs`, {...filters,  "keyword_description": "Visa Sponsorship"});
  console.log(response);
  return response.data; 
};
