"use client";
import JobCard from "../upload-resume/components/JobCard";
import useSavedJobs from "@/hooks/job/useSavedJobs";
import useAppliedJobs from "@/hooks/job/useAppliedJobs";

function Saved() {
  const { data, isLoading } = useSavedJobs();
  const { data: appliedData } = useAppliedJobs();
  const savedJobs = data?.savedJobs || [];
  const appliedIds = new Set((appliedData?.proposals || []).map((p) => p.job?.id || p.job?._id));

  return (
    <div className="bg-gradient-top-right">
      <div className="min-h-screen max-w-screen-xl text-black w-full mx-auto font-poppins pt-24">
        <div className="max-w-screen-md flex mx-auto items-center py-12 justify-center w-full ">
          <h1 className="text-3xl font-bold text-center">Saved</h1>
        </div>
        <div className="flex flex-col items-center space-y-4 max-w-screen-lg mx-auto p-4 mb-24">
          {isLoading && <p>Loading…</p>}
          {!isLoading && savedJobs.length === 0 && <p>No saved jobs yet. Tap the bookmark on a listing to keep it here.</p>}
          {savedJobs.map((job) => (
            <JobCard key={job.id} job={job} saved applied={appliedIds.has(job.id)} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Saved;
