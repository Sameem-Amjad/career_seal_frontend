"use client"
import useAppliedJobs from "@/hooks/job/useAppliedJobs";
import JobCard from "../upload-resume/components/JobCard";
import { useEffect, useState } from "react";
import { Proposal } from "@/types/Interfaces/job";
import useSavedJobs from "@/hooks/job/useSavedJobs";

function ApplicationHistory() {
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const { data, isLoading, refetch } = useAppliedJobs();
  const { data: savedJobsData, isLoading: isSavedJobsLoading, refetch: savedJobRefetch } = useSavedJobs();

  useEffect(() => {
    if (!data && !isLoading) {
      refetch();
    }
    if (data?.success) {
      setProposals(Array.isArray(data.proposals) ? data.proposals : []);
    }
    if (!savedJobsData && !isSavedJobsLoading) {
      savedJobRefetch();
    }
  }, [data, savedJobsData, isLoading, isSavedJobsLoading, refetch, savedJobRefetch]);

  return (
    <div className="bg-gradient-top-right">
      <div className="min-h-screen max-w-screen-xl text-black w-full mx-auto font-poppins pt-24">
        <div className="max-w-screen-md flex mx-auto items-center py-12 justify-center w-full ">
          <p className="text-3xl font-bold text-center">Application history</p>
        </div>
        <div className="flex flex-col items-center space-y-4 max-w-screen-lg mx-auto p-4">
          {isLoading && "loading..."}

          {!isLoading && proposals.length === 0 && <p>No applied jobs.</p>}

          {!isLoading &&
            savedJobsData &&
            Array.isArray(proposals) && 
            proposals.map((proposal, i) => (
              <JobCard
                key={proposal._id || i} 
                jobId={proposal.job._id}
                title={proposal.job.title || "Untitled Position"}
                description={proposal.job.description || "No description available"} 
                tags={proposal.job.skillsRequired || []} 
                saved={savedJobsData?.savedJobs?.some((savedJob) => savedJob._id === proposal.job._id) || false}
                proposalSettings={""}
                applied={true}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default ApplicationHistory;