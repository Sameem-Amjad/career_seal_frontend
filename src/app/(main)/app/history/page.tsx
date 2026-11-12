"use client";
import useAppliedJobs from "@/hooks/job/useAppliedJobs";
import useSavedJobs from "@/hooks/job/useSavedJobs";
import JobCard from "../upload-resume/components/JobCard";

function ApplicationHistory() {
  const { data, isLoading } = useAppliedJobs();
  const { data: savedData } = useSavedJobs();
  const proposals = (data?.proposals || []).filter((p) => p.job);
  const savedIds = new Set((savedData?.savedJobs || []).map((j) => j.id || j._id));

  return (
    <div className="bg-gradient-top-right">
      <div className="min-h-screen max-w-screen-xl text-black w-full mx-auto font-poppins pt-24">
        <div className="max-w-screen-md flex mx-auto items-center py-12 justify-center w-full ">
          <h1 className="text-3xl font-bold text-center">Application history</h1>
        </div>
        <div className="flex flex-col items-center space-y-4 max-w-screen-lg mx-auto p-4 mb-24">
          {isLoading && <p>Loading…</p>}
          {!isLoading && proposals.length === 0 && <p>No applications yet. Use Auto Apply on a listing to apply.</p>}
          {proposals.map((p) => (
            <JobCard key={p._id} job={p.job} applied status={p.status} appliedAt={p.createdAt} saved={savedIds.has(p.job.id)} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ApplicationHistory;
