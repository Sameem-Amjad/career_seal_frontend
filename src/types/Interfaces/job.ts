export interface Job {
    _id: string;
    title: string;
    description: string;
    budget?: number;
    deadline?: Date;
    status: 'open' | 'closed' | 'in_progress';
    createdBy: {_id: string, email: string}; 
    proposalSettings: {min:number, max:number}
    skillsRequired: string[];
}

export interface Proposal {
    _id: string;
    job: Job;
    status: string;
}
export interface AllJobsResponse {
    success: boolean;
    jobs: Job[]
}


export interface AppliedJobsResponse {
    success: boolean;
    proposals: Proposal[];
}

export interface savedJobsResponse {
    success: boolean;
    savedJobs: Job[]
}

export interface saveJobResponse {
    success: boolean;
    message: string;
    savedJobs: string[];
}

export interface ApplyJobResponse {
    success: boolean;
    message: string;
    proposal: Proposal
}

export interface Filters {
    title: string;
    location: string;
    application_active: boolean;
    deleted: boolean;
  }
  

  interface JobIndustry {
    job_industry_list: {
      industry: string;
    };
  }
  
  export interface JobData {
    id: number;
    created: string;
    last_updated: string;
    time_posted: string;
    title: string;
    description: string;
    seniority: string;
    employment_type: string;
    location: string;
    url: string;
    hash: string;
    company_id: number;
    company_name: string;
    company_url: string;
    external_url: string | null;
    deleted: number;
    application_active: number;
    salary: string | null;
    applicants_count: string;
    linkedin_job_id: number;
    country: string;
    redirected_url: string;
    job_industry_collection: JobIndustry[];
    job_functions_collection: string[];
  }
  
 export interface JobDataResponse{

    success: boolean,
    jobs: JobData[]
  }