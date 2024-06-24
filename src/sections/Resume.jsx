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
    <div>
      <button
        className="flex justify-center align-middle bg-white w-28 cursor-pointer"
        onClick={handleDownload}>
        Resume
      </button>
      <iframe
        title="resume"
        width="100%"
        height="800px"
        src={resumePdf}
        style={{ display: "none" }}></iframe>
    </div>
  );
};

export default Resume;
