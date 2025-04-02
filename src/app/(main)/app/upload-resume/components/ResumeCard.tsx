"use client";

import React, { useRef, useState } from "react";
import { FaLock } from "react-icons/fa";
import DropdownInput from "./DropdownInput";
import mammoth from "mammoth";
import { getDocument, GlobalWorkerOptions, PDFPageProxy } from "pdfjs-dist";
import Image from "next/image";

// Manually set worker source
if (typeof window !== "undefined") {
  GlobalWorkerOptions.workerSrc = `/pdf.worker.min.mjs`;
}

interface ResumeCardProps {
  industry: string;
  setIndustry: (value: string) => void;
  region: string;
  setRegion: (value: string) => void;
  refetchJobs: () => void;
}

const ResumeCard: React.FC<ResumeCardProps> = ({
  industry,
  setIndustry,
  region,
  setRegion,
  refetchJobs,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [jobTitles, setJobTitles] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  const [selectedFile, setSelectedFile] = useState<any>();
  const [fileName, setFileName] = useState<string>("Upload Your Resume"); // Default button text

  const handleFileUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const processFile = async (file: File) => {
    setLoading(true);
    handleFileChange(file);
    setSelectedFile(file);
    setFileName(file.name); // Update button text with file name

    if (file.type === "application/pdf") {
      const text = await extractTextFromPDF(file);
      analyzeResume(text);
    } else if (
      file.type ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      const text = await extractTextFromDOCX(file);
      analyzeResume(text);
    } else {
      alert("Unsupported file format. Please upload a PDF or DOCX.");
    }
    setLoading(false);
  };

  const handleFileChange = (file: File) => {
    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];
    if (!allowedTypes.includes(file.type)) {
      alert("Only JPG, PNG, and PDF files are allowed.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setSelectedFile({ type: file.type, dataURL: reader.result as string });
    };

    reader.readAsDataURL(file);
  };

  const extractTextFromPDF = async (file: File) => {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await getDocument({ data: arrayBuffer }).promise;
    let text = "";

    for (let i = 1; i <= pdf.numPages; i++) {
      const page: PDFPageProxy = await pdf.getPage(i);
      const content = await page.getTextContent();
      text +=
        content.items
          .map((item) => (item as { str: string }).str) // Explicitly type `item`
          .join(" ") + " ";
    }

    return text;
  };

  const extractTextFromDOCX = async (file: File) => {
    const data = await file.arrayBuffer();
    const result = await mammoth.extractRawText({ arrayBuffer: data });
    return result.value;
  };

  const analyzeResume = async (resumeText: string) => {
    const API_KEY = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content:
              "Extract potential job titles from the given resume text. Respond with a JSON array of job titles only.",
          },
          { role: "user", content: resumeText },
        ],
        temperature: 0.5,
      }),
    });

    const data = await response.json();
    console.log("OpenAI response:", data);

    if (data.choices?.[0]?.message?.content) {
      let extractedTitles: string[] = [];

      try {
        extractedTitles = JSON.parse(data.choices[0].message.content);
      } catch (error) {
        console.error("Failed to parse JSON, processing as plain text:", error);

        extractedTitles = data.choices[0].message.content
          .split("\n")
          .map((title: string) => title.trim().replace(/^["']|["']$/g, ""))
          .filter((title: string) => title.length > 0);
      }

      setJobTitles(extractedTitles);
    }
  };

  return (
    <div className="p-8 border-2 border-custom-blue bg-white bg-opacity-65 rounded-[50px] w-full">
      <div className="flex flex-col space-y-5 justify-between min-h-[500px] w-full">
        <p className="text-2xl font-semibold">Upload Your Resume</p>
        <div className="w-full bg-gray-100 p-2 rounded-xl flex">
          <div className="w-full flex-1 border bg-gray-50 px-16 py-6 flex flex-col items-center justify-center space-y-3 rounded-lg border-green-500 border-dashed">
            <p className="text-sm text-center text-gray-700">
              Drop your resume here or choose a file. PDF & DOCX only. Max 2MB
              file size.
            </p>
            <button
              onClick={handleFileUpload}
              className="p-2 bg-custom-blue rounded-full text-sm hover:scale-95 transition duration-200 text-white w-44 text-center truncate"
            >
              {loading
                ? "Loading..."
                : fileName.length > 25
                ? `${fileName.slice(0, 22)}...`
                : fileName}
            </button>
            <input
              type="file"
              ref={fileInputRef}
              accept=".pdf,.docx"
              style={{ display: "none" }}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) processFile(file);
              }}
            />
            <p className="text-xs text-gray-700 flex w-full items-center justify-center font-semibold space-x-2">
              <FaLock />
              <span> Privacy Guaranteed </span>
            </p>
          </div>
          {selectedFile && (
            <div className="flex-1 px-10">
              {selectedFile && selectedFile.type.startsWith("image/") && (
                <Image
                  src={selectedFile.dataURL}
                  alt="Resume Preview"
                  width={300}
                  height={400}
                  className="rounded-lg shadow-md"
                />
              )}

              {/* {selectedFile && selectedFile.type === "application/pdf" && (
                <iframe
                  src={selectedFile.dataURL}
                  width="100%"
                  height="200px"
                  className="w-1/2 h-[200px]"
                  style={{ objectFit: "contain", border: "1px solid #ddd" }}
                ></iframe>
              )} */}

              {selectedFile && selectedFile.type === "application/pdf" && (
                <div className="w-full flex justify-center border no-scrollbar rounded-md overflow-hidden relative">
                  <embed
                    src={selectedFile.dataURL}
                    type="application/pdf"
                    className="w-full  no-scrollbar"
                    style={{
                      height: "200px",
                    }}
                  />
                </div>
              )}
            </div>
          )}
        </div>

        <DropdownInput
          label="Select Industry"
          placeholder="Choose an industry"
          options={jobTitles}
          selectedValue={industry}
          onSelect={setIndustry}
        />

        {/* Region Dropdown */}
        <DropdownInput
          label="Select Region"
          placeholder="Choose a region"
          options={["United Kingdom", "America", "United Arab Emirates"]}
          selectedValue={region}
          onSelect={setRegion}
        />

        {/* Search Button */}
        <button
          onClick={refetchJobs}
          className="p-2 py-4 mt-12 bg-custom-blue rounded-full text-sm hover:bg-opacity-80 transition duration-200 text-white w-full"
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default ResumeCard;
