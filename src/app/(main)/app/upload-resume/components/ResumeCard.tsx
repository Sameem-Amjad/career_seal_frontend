"use client";
import React, { useRef, useState } from "react";
import { FaLock } from "react-icons/fa";
import axios from "axios";
import DropdownInput from "./DropdownInput";
import mammoth from "mammoth";
import { getDocument, GlobalWorkerOptions, PDFPageProxy } from "pdfjs-dist";
import { suggestJobTitles } from "@/api/coresignalApi";
import { POPULAR_ROLES, REGIONS } from "@/constants/roles";

if (typeof window !== "undefined") {
  GlobalWorkerOptions.workerSrc = `/pdf.worker.min.mjs`;
}

const DOCX = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
const MAX_BYTES = 2 * 1024 * 1024;

interface ResumeCardProps {
  industry: string;
  setIndustry: (value: string) => void;
  region: string;
  setRegion: (value: string) => void;
  onSearch: (title?: string, location?: string) => void;
}

const ResumeCard: React.FC<ResumeCardProps> = ({ industry, setIndustry, region, setRegion, onSearch }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [suggested, setSuggested] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [pdfPreview, setPdfPreview] = useState<string>("");
  const [fileName, setFileName] = useState<string>("Upload Your Resume");
  const [error, setError] = useState("");
  const [note, setNote] = useState("");
  const [dragging, setDragging] = useState(false);

  const extractTextFromPDF = async (file: File) => {
    const pdf = await getDocument({ data: await file.arrayBuffer() }).promise;
    let text = "";
    for (let i = 1; i <= pdf.numPages; i++) {
      const page: PDFPageProxy = await pdf.getPage(i);
      const content = await page.getTextContent();
      text += content.items.map((item) => (item as { str: string }).str).join(" ") + " ";
    }
    return text;
  };

  const extractTextFromDOCX = async (file: File) => (await mammoth.extractRawText({ arrayBuffer: await file.arrayBuffer() })).value;

  const processFile = async (file: File) => {
    setError("");
    setNote("");
    const isPdf = file.type === "application/pdf" || /\.pdf$/i.test(file.name);
    const isDocx = file.type === DOCX || /\.docx$/i.test(file.name);
    if (!isPdf && !isDocx) return setError("Please upload a PDF or DOCX file.");
    if (file.size > MAX_BYTES) return setError("That file is over 2 MB. Please upload a smaller resume.");

    setLoading(true);
    setFileName(file.name);
    setPdfPreview("");
    try {
      if (isPdf) {
        const reader = new FileReader();
        reader.onload = () => setPdfPreview(reader.result as string);
        reader.readAsDataURL(file);
      }
      const text = isPdf ? await extractTextFromPDF(file) : await extractTextFromDOCX(file);
      const { titles, source } = await suggestJobTitles(text);
      setSuggested(titles);
      setIndustry(titles[0]);
      setNote(source === "gemini" ? "Suggested by AI from your resume." : "Matched from the skills in your resume.");
      onSearch(titles[0], region);
    } catch (err) {
      setError(axios.isAxiosError(err) ? err.response?.data?.message || "We couldn't analyse that resume. Please try again." : "We couldn't read that file. Is it a text-based PDF or DOCX?");
    } finally {
      setLoading(false);
    }
  };

  const options = [...suggested, ...POPULAR_ROLES.filter((r) => !suggested.includes(r))];

  return (
    <div className="p-6 lg:p-8 border-2 border-custom-blue bg-white bg-opacity-65 rounded-[50px] w-full">
      <div className="flex flex-col space-y-5 justify-between min-h-[500px] w-full">
        <h2 className="text-2xl font-semibold">Upload Your Resume</h2>
        <div className="w-full bg-gray-100 p-2 rounded-xl flex flex-col md:flex-row gap-3">
          <div
            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragging(false);
              const file = e.dataTransfer.files?.[0];
              if (file) processFile(file);
            }}
            className={`w-full flex-1 border bg-gray-50 px-6 md:px-16 py-6 flex flex-col items-center justify-center space-y-3 rounded-lg border-dashed ${dragging ? "border-custom-blue bg-blue-50" : "border-green-500"}`}
          >
            <p className="text-sm text-center text-gray-700">
              Drop your resume here or choose a file. PDF &amp; DOCX only. Max 2MB file size.
            </p>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={loading}
              className="p-2 bg-custom-blue rounded-full text-sm hover:scale-95 transition duration-200 text-white w-48 text-center truncate disabled:opacity-70"
            >
              {loading ? "Analysing…" : fileName.length > 25 ? `${fileName.slice(0, 22)}...` : fileName}
            </button>
            <input
              type="file"
              ref={fileInputRef}
              accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              aria-label="Resume file"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) processFile(file);
                e.target.value = "";
              }}
            />
            <p className="text-xs text-gray-700 flex w-full items-center justify-center font-semibold space-x-2">
              <FaLock aria-hidden />
              <span> Privacy Guaranteed </span>
            </p>
          </div>
          {pdfPreview && (
            <div className="flex-1 md:px-6">
              <embed src={pdfPreview} type="application/pdf" className="w-full rounded-md border" style={{ height: "200px" }} />
            </div>
          )}
        </div>
        {error && <p role="alert" className="text-sm text-red-600">{error}</p>}
        {note && !error && (
          <p role="status" className="text-sm text-green-700">
            {note} Best match: <span className="font-semibold">{suggested[0]}</span>
            {suggested.length > 1 ? `, also ${suggested.slice(1).join(", ")}` : ""}.
          </p>
        )}

        <DropdownInput
          label="Select Industry"
          placeholder="Choose a role"
          options={options}
          selectedValue={industry}
          onSelect={setIndustry}
        />

        <DropdownInput
          label="Select Region"
          placeholder="Choose a region"
          options={REGIONS}
          selectedValue={region}
          onSelect={setRegion}
        />

        <button
          type="button"
          onClick={() => onSearch(industry, region)}
          className="p-2 py-4 mt-12 bg-custom-blue rounded-full text-sm hover:bg-opacity-80 transition duration-200 text-white w-full"
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default ResumeCard;
