"use client";
import Images from "@/constants/Images";
import JobCard from "./components/JobCard";
import ResumeCard from "./components/ResumeCard";
import UserReviews from "@/components/UserReviews/UserReviews";
import useCoreSignalJobs from "@/hooks/job/useAllCoresignalJobs";

import { useState } from "react";

function UploadResume() {
  // Lift state to control filters
  const [industry, setIndustry] = useState<string>("Software Engineer");
  const [region, setRegion] = useState<string>("UK");

  // Fetch job data based on filters
  const { data, isLoading, isError, error, mutate } = useCoreSignalJobs({
    title: industry,
    location: region,
    application_active: true,
    deleted: false,
  });

  return (
    <div
      className="min-h-screen bg-top bg-no-repeat"
      style={{
        backgroundImage: `url(${Images.landing})`,
        backgroundSize: "cover",
      }}
    >
      <div className="max-w-screen-lg font-poppins mx-auto flex flex-col text-black items-center p-4 space-y-4 pt-32">
        <div className="max-w-screen-md w-full mx-auto">
          <p className="text-3xl font-bold text-center">
            Upload Your Resume and Discover Tailored Opportunities!
          </p>
          <p className="text-lg font-normal text-center text-gray-600">
            Our AI-driven tool connects your skills and experience with
            personalized job matches in seconds.
          </p>
        </div>

        {/* ResumeCard will update industry and region */}
        <div className="pt-4 lg:pt-10 w-full mx-auto">
          <ResumeCard
            industry={industry}
            setIndustry={setIndustry}
            region={region}
            setRegion={setRegion}
            refetchJobs={mutate}
          />
        </div>

        <div className="flex flex-col w-full items-center space-y-10 justify-center pt-10">
          <p className="text-3xl font-bold text-center">Job Listings</p>

          {isLoading && <p>Loading job listings...</p>}
          {isError && <p className="text-red-500">Error: {error?.message}</p>}

          {data && data.jobs?.length > 0
            ? data.jobs.map((job) => (
                <JobCard
                  key={job.id}
                  title={job.title}
                  jobId={job.id.toString()}
                  description={job.description}
                  tags={["IT", "Software Engineer"]}
                  proposalSettings={job.applicants_count}
                  redirecUrl={job.url}
                />
              ))
            : !isLoading && <p>No jobs found.</p>}
        </div>
      </div>
      <UserReviews />
    </div>
  );
}

export default UploadResume;
