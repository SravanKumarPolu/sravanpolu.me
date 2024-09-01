import React from "react";
import resumePdf from "../assets/Resume.pdf";

const Resume = () => {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = resumePdf;
    link.download = "Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section
      id="Resume"
      className="flex justify-center items-center h-auto py-16 ">
      <button
        className="flex justify-center my-10 items-center bg-blue-500 hover:bg-blue-600 text-white w-28 h-10 rounded cursor-pointer shadow-md"
        onClick={handleDownload}>
        Resume
      </button>
    </section>
  );
};

export default Resume;
