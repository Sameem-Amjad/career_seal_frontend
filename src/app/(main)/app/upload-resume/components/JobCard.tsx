"use client";

import Images from "@/constants/Images";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { MdOutlineBookmarkBorder, MdOutlineBookmark } from "react-icons/md";
import { HiBadgeCheck } from "react-icons/hi";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { applyJob, saveJob, unSaveJob } from "@/api/jobApi";
import { JobData } from "@/types/Interfaces/job";

interface JobCardProps {
  job: JobData;
  saved?: boolean;
  applied?: boolean;
  /** Application status, on the history page. */
  status?: string;
  appliedAt?: string;
}

const STATUS_LABEL: Record<string, string> = {
  submitted: "Submitted",
  viewed: "Viewed by employer",
  interview: "Interview invite",
  rejected: "Not progressed",
};

const posted = (iso: string) => {
  const days = Math.max(0, Math.round((Date.now() - new Date(iso).getTime()) / 86400000));
  return days === 0 ? "Posted today" : days === 1 ? "Posted yesterday" : `Posted ${days} days ago`;
};

const messageOf = (err: unknown, fallback: string) =>
  axios.isAxiosError(err) ? err.response?.data?.message || fallback : fallback;

const JobCard: React.FC<JobCardProps> = ({ job, saved = false, applied = false, status, appliedAt }) => {
  const queryClient = useQueryClient();
  const [isSaved, setIsSaved] = useState(saved);
  const [isApplied, setIsApplied] = useState(applied);
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState<"save" | "apply" | null>(null);
  const [notice, setNotice] = useState<{ ok: boolean; text: string } | null>(null);

  useEffect(() => setIsSaved(saved), [saved]);
  useEffect(() => setIsApplied(applied), [applied]);

  const toggleSave = async () => {
    if (busy) return;
    setBusy("save");
    const next = !isSaved;
    setIsSaved(next);
    try {
      if (next) await saveJob(job.id);
      else await unSaveJob(job.id);
      queryClient.invalidateQueries({ queryKey: ["savedJobs"] });
    } catch (err) {
      setIsSaved(!next);
      setNotice({ ok: false, text: messageOf(err, "Couldn't update your saved jobs") });
    } finally {
      setBusy(null);
    }
  };

  const apply = async () => {
    if (busy || isApplied) return;
    setBusy("apply");
    try {
      const res = await applyJob(job.id);
      setIsApplied(true);
      setNotice({ ok: true, text: res.message || "Application sent" });
      queryClient.invalidateQueries({ queryKey: ["appliedJobs"] });
    } catch (err) {
      setNotice({ ok: false, text: messageOf(err, "Couldn't apply. Please try again.") });
    } finally {
      setBusy(null);
    }
  };

  const tags = [job.industry, job.employment_type, ...(job.housing_support ? ["Housing support"] : [])].filter(Boolean);

  return (
    <article className="flex flex-col space-y-4 text-black w-full p-3 lg:p-5 rounded-xl bg-opacity-60 border-2 border-gray-300 bg-gray-50" aria-label={`${job.title} at ${job.company_name}`}>
      <div className="flex justify-between gap-3">
        <div className="flex items-start space-x-3 min-w-0">
          <Image src={Images.jobsticker} alt="" width={40} height={40} className="object-contain w-10 lg:w-14 shrink-0" />
          <div className="flex flex-col space-y-1 min-w-0">
            <h3 className="text-base lg:text-xl font-semibold truncate">{job.title}</h3>
            <p className="text-xs lg:text-sm text-gray-700">
              {job.company_name} · {job.location}, {job.country}
            </p>
            {!open && <p className="text-xs text-gray-600 line-clamp-2">{job.description.split("\n")[0]}</p>}
          </div>
        </div>
        <div className="flex items-start space-x-3 shrink-0">
          {isApplied && (
            <span className="px-2 py-1 rounded-full flex items-center gap-1 border-2 border-green-500 text-green-600 text-xs font-semibold">
              <HiBadgeCheck aria-hidden /> {status ? STATUS_LABEL[status] || "Applied" : "Applied"}
            </span>
          )}
          <button
            type="button"
            onClick={toggleSave}
            disabled={busy === "save"}
            aria-pressed={isSaved}
            aria-label={isSaved ? "Remove from saved jobs" : "Save job"}
            className="hover:scale-105 transition duration-200 disabled:opacity-60"
          >
            {isSaved ? <MdOutlineBookmark size={26} /> : <MdOutlineBookmarkBorder size={26} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="rounded-lg bg-white p-4 text-sm leading-6 text-gray-800 whitespace-pre-line border border-gray-200">
          {job.description}
          <dl className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 text-xs text-gray-600">
            <div><dt className="inline font-semibold">Visa: </dt><dd className="inline">{job.visa}</dd></div>
            <div><dt className="inline font-semibold">Level: </dt><dd className="inline">{job.seniority}</dd></div>
            {job.salary && <div><dt className="inline font-semibold">Salary: </dt><dd className="inline">{job.salary}</dd></div>}
            <div><dt className="inline font-semibold">Applicants: </dt><dd className="inline">{job.applicants_count}</dd></div>
          </dl>
        </div>
      )}

      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          {tags.map((t) => (
            <span key={t} className="px-2 py-1 rounded text-[11px] font-medium bg-gray-100 text-gray-600">{t}</span>
          ))}
          <span className="flex items-center gap-1 text-[11px] text-gray-500">
            <Image src={Images.bluetick} alt="" width={12} height={12} className="w-3" /> Visa sponsorship
          </span>
          <span className="text-[11px] text-gray-500">
            {appliedAt ? `Applied ${new Date(appliedAt).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}` : posted(job.time_posted)} · {job.applicants_count} applicants
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            className="border-2 text-sm border-custom-blue rounded-full w-32 hover:scale-95 transition duration-200 text-custom-blue font-medium py-2 px-4"
          >
            {open ? "Hide details" : "View Job"}
          </button>
          <button
            type="button"
            onClick={apply}
            disabled={isApplied || busy === "apply"}
            className={`px-4 py-2 rounded-full text-sm transition duration-200 text-white w-32 ${isApplied ? "bg-gray-400" : "bg-custom-blue hover:scale-95"} disabled:cursor-default`}
          >
            {busy === "apply" ? "Applying…" : isApplied ? "Applied" : "Auto Apply"}
          </button>
        </div>
      </div>
      {notice && (
        <p role="status" className={`text-xs ${notice.ok ? "text-green-700" : "text-red-600"}`}>
          {notice.text}
        </p>
      )}
    </article>
  );
};

export default JobCard;
