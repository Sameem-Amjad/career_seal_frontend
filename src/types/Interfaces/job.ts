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
    job: JobData;
    status: string;
    createdAt?: string;
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
    savedJobs: JobData[]
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
  

  /** A listing as the API returns it. */
  export interface JobData {
    id: string;
    _id: string;
    title: string;
    description: string;
    company_name: string;
    location: string;
    region: string;
    country: string;
    industry: string;
    seniority: string;
    employment_type: string;
    salary?: string;
    visa: string;
    housing_support: boolean;
    tags: string[];
    applicants_count: string;
    time_posted: string;
  }

 export interface JobDataResponse{
    success: boolean,
    exact?: boolean,
    jobs: JobData[]
  }
