"use client";
import { useEffect, useState } from "react";
import JobCard from "../upload-resume/components/JobCard";
import useSavedJobs from "@/hooks/job/useSavedJobs";
import { Job } from "@/types/Interfaces/job";
import useGetUserDetails from "@/hooks/auth/useGetUserDetails";
import { getToken } from "@/config/toke";
import useAppliedJobs from "@/hooks/job/useAppliedJobs";

function Saved() {
  const [savedJobs, setSavedJobs] = useState<Job[]>([]);
  const { data, isLoading, refetch } = useSavedJobs();
  const { data: appliedJobsData } = useAppliedJobs();
  
  const { data: userData } = useGetUserDetails(getToken() || "");

  useEffect(() => {
    if (!data && !isLoading) {
      refetch();
    }
    if (data?.success) {
      setSavedJobs(Array.isArray(data.savedJobs) ? data.savedJobs : []);
    }
  }, [data, isLoading, refetch]);

  return (
    <div className="bg-gradient-top-right">
      <div className="min-h-screen max-w-screen-xl text-black w-full mx-auto font-poppins pt-24">
        <div className="max-w-screen-md flex mx-auto items-center py-12 justify-center w-full ">
          <p className="text-3xl font-bold text-center">Saved</p>
        </div>
        <div className="flex flex-col items-center space-y-4 max-w-screen-lg mx-auto p-4 mb-24">
          {isLoading && "loading..."}
          
          {!isLoading && savedJobs.length === 0 && <p>No saved jobs.</p>}

          {appliedJobsData && savedJobs
            .filter((savedJob) => savedJob?.status === "open" && savedJob.createdBy?._id !== userData?.user?._id )
            .map((savedJob, i) => {

              const isApplied = appliedJobsData?.proposals.some(
                (proposal) => proposal.job._id === savedJob._id
              );
              return(
              <JobCard

                key={savedJob?._id || i}
                jobId={savedJob._id}
                title={savedJob?.title || "Untitled Position"}
                description={savedJob?.description || "No description available"}
                tags={savedJob?.skillsRequired || []}
                saved={true}
                proposalSettings={""}
                applied={isApplied}
              />
              )})}

         {/* <JobCard
            title="Figma Designer"
            description="We are looking for talented and experienced Figma designers to collaborate with us in designing an entire mobile application from concept to completion."
            tags={["Ui Designer", "Figma", "Landing Page"]}
            saved={true}
            applied={false}
            proposalSettings={{min:0, max:15}}
          /> */}
        </div>
      </div>
    </div>
  );
}

export default Saved;