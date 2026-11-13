"use client";
import Images from "@/constants/Images";
import JobCard from "./components/JobCard";
import ResumeCard from "./components/ResumeCard";
import useCoreSignalJobs from "@/hooks/job/useAllCoresignalJobs";
import useSavedJobs from "@/hooks/job/useSavedJobs";
import useAppliedJobs from "@/hooks/job/useAppliedJobs";

import { useEffect, useState } from "react";

function UploadResume() {
  const [industry, setIndustry] = useState<string>("Software Engineer");
  const [region, setRegion] = useState<string>("United Kingdom");

  const { data, isLoading, isError, error, mutate } = useCoreSignalJobs({
    title: industry,
    location: region,
    application_active: true,
    deleted: false,
  });
  const { data: savedData } = useSavedJobs();
  const { data: appliedData } = useAppliedJobs();
  const savedIds = new Set((savedData?.savedJobs || []).map((j) => j.id || j._id));
  const appliedIds = new Set((appliedData?.proposals || []).map((p) => p.job?.id || p.job?._id));

  const [searched, setSearched] = useState({ title: industry, location: region });
  const search = (title = industry, location = region) => {
    setSearched({ title, location });
    mutate({ title, location, application_active: true, deleted: false });
  };

  // Show listings for the default role straight away.
  useEffect(() => {
    search();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          <h1 className="text-3xl font-bold text-center">
            Upload Your Resume and Discover Tailored Opportunities!
          </h1>
          <p className="text-lg font-normal text-center text-gray-600">
            Our AI-driven tool connects your skills and experience with
            personalized job matches in seconds.
          </p>
        </div>

        <div className="pt-4 lg:pt-10 w-full mx-auto">
          <ResumeCard
            industry={industry}
            setIndustry={setIndustry}
            region={region}
            setRegion={setRegion}
            onSearch={search}
          />
        </div>

        <section className="flex flex-col w-full items-center space-y-6 justify-center pt-10" aria-live="polite">
          <h2 className="text-3xl font-bold text-center">Job Listings</h2>
          {data && !isLoading && (
            <p className="text-sm text-gray-600">
              {data.exact === false
                ? `No ${searched.title} roles in ${searched.location} right now. Here are other visa-sponsored jobs there.`
                : `${data.jobs.length} visa-sponsored ${data.jobs.length === 1 ? "job" : "jobs"} for ${searched.title} in ${searched.location}`}
            </p>
          )}

          {isLoading && <p>Loading job listings...</p>}
          {isError && <p className="text-red-500">Error: {error?.message}</p>}

          {data && data.jobs?.length > 0
            ? data.jobs.map((job) => (
                <JobCard key={job.id} job={job} saved={savedIds.has(job.id)} applied={appliedIds.has(job.id)} />
              ))
            : !isLoading && data && <p>No jobs found.</p>}
        </section>
      </div>
    </div>
  );
}

export default UploadResume;
