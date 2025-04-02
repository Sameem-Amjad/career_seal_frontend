"use client";

import Images from "@/constants/Images";
import Image from "next/image";
import React from "react";
import Rating from "./Rating";
import { MdOutlineBookmarkBorder, MdOutlineBookmark } from "react-icons/md";
import { HiBadgeCheck } from "react-icons/hi";
interface JobCardProps {
  title: string;
  description: string;
  tags: string[];
  proposalSettings: string;
  saved?: boolean;
  applied?: boolean;
  jobId: string;
  redirecUrl?: string;
}

const JobCard: React.FC<JobCardProps> = ({
  title,
  description,
  tags,
  proposalSettings,
  applied,
  redirecUrl
}) => {
  // const [isSaved, setIsSaved] = useState(saved);
  // const [isApplied, setIsApplied] = useState(applied);
  // const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(null);
  // const { saveJob, unSaveJob } = useSaveJob();
  // const { applyJob, isLoading: isApplying } = useApplyJob();

  // const toggleBookmark = () => {
  //   if (debounceTimer) {
  //     clearTimeout(debounceTimer);
  //   }

  //   setIsSaved((prev) => !prev);

  //   const timer = setTimeout(() => {
  //     if (!isSaved) {
  //       saveJob(jobId);
  //     } else {
  //       unSaveJob(jobId);
  //     }
  //   }, 1000);

  //   setDebounceTimer(timer);
  // };

  // useEffect(() => {
  //   return () => {
  //     if (debounceTimer) {
  //       clearTimeout(debounceTimer);
  //     }
  //   };
  // }, [debounceTimer]);

  // const handleApply = async () => {
  //   try {
  //     // await applyJob(jobId);
  //     setIsApplied(true)
  //   } catch (error) {
  //     console.error("Error applying for job:", error);
  //   }
  // };
  return (
    <div className="flex flex-col space-y-4 text-black w-full p-2 lg:p-4 lg:py-6 rounded-xl bg-opacity-60 border-2 border-gray-300 bg-gray-50">
      <div className="flex justify-between">
        <div className="flex items-center space-x-2">
          <Image
            src={Images.jobsticker}
            alt="jobsticker"
            width={40}
            height={40}
            className="object-contain w:w-5 lg:w-16"
          />
          <div className="flex flex-col space-y-[4px] w-2/3">
            <p className="text-xs w-[80%] lg:text-xl font-semibold truncate">{title}</p>
            <p className="text-[8px] w-full lg:text-xs text-gray-600 line-clamp-2">{description}</p>
          </div>
        </div>
        <div className="flex items-center space-x-4 justify-end">
          {applied && (
            <div className="lg:p-2 p-1 lg:w-24 items-center rounded-full flex border lg:border-2 justify-center space-x-0 lg:space-x-1 border-green-400 text-green-400">
              <HiBadgeCheck className="p-1 lg:p-0" />
              <p className="lg:text-xs font-semibold text-[6px]">Applied</p>
            </div>
          )}
          {true ? (
            <MdOutlineBookmark
              size={25}
              className="cursor-pointer hover:scale-105 transition duration-200"
              onClick={() => {}}
            />
          ) : (
            <MdOutlineBookmarkBorder
              size={25}
              className="cursor-pointer hover:scale-105 transition duration-200"
              onClick={() => {}}
            />
          )}
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex flex-col space-y-3">
          <div className="flex items-center space-x-2">
            {tags.map((e, i) => (
              <p
                key={i}
                className="px-2 py-1 rounded lg:text-[10px] text-[6px] font-medium bg-gray-100 text-gray-600"
              >
                {e}
              </p>
            ))}
          </div>
          <div className="flex flex-col space-y-1 lg:space-y-0 lg:flex-row lg:items-center lg:space-x-6">
            <Rating rating={5} maxStars={5} />
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-1">
                <Image
                  src={Images.bluetick}
                  alt="tick"
                  width={5}
                  height={5}
                  className="object-contain w-3"
                />
                <p className="lg:text-xs text-[6px] text-gray-400">Project Verified</p>
              </div>
              <p className="lg:text-xs text-[6px] font-medium">
                Proposals:{" "}
                <span className="text-gray-400 ml-1">
                  {proposalSettings}
                </span>
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => {
              window.open(redirecUrl, "_blank");

            }}
            className="border w-16 lg:border-2 lg:text-sm text-[8px] border-custom-blue rounded-full lg:w-32 hover:scale-95 transition duration-200 text-custom-blue font-medium p-1 lg:py-2 lg:px-4">
            View Job
          </button>
          <button
            disabled={true}
            onClick={() => {}}
            className={`lg:px-4 lg:py-2 p-1 bg-gray-400 rounded-full lg:text-sm text-[8px] ${
              !false && "hover:scale-95"
            } transition duration-200 text-white lg:w-32 w-16`}
          >
            {/* {isApplying ? "Applying..." : applied ? "Applied" : "Auto Apply"} */}
            Auto Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
