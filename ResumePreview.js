import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import "../styles/ResumePreview.css";

const ResumePreview = ({ user, data, template, onEdit }) => {
  const resumeRef = useRef();

  const handlePrint = useReactToPrint({
    contentRef: resumeRef, // use contentRef for v3+
    documentTitle: `${user?.name || "resume"}-resume`,
    pageStyle: `
      @page {
        size: A4;
        margin: 10mm;
      }
      @media print {
        body {
          background: white !important;
        }
        .no-print {
          display: none !important;
        }
        .resume-preview {
          box-shadow: none !important;
          margin: 0 !important;
          padding: 0 !important;
          width: 100% !important;
        }
      }
    `,
    removeAfterPrint: true,
  });

  return (
    <div className="resume-preview-wrapper">
      <div className="resume-bar no-print">
        <button onClick={onEdit}>Edit</button>
        <button onClick={handlePrint}>Download PDF</button>
      </div>

      <div className={`resume-preview res-${template}`} ref={resumeRef}>
        <h1>{user?.name || "Your Name"}</h1>
        <p>
          Email: {user?.email || "email@example.com"} | Phone: {data?.phone || "N/A"} | {data?.address || "N/A"}
        </p>

        <h2>Professional Summary</h2>
        <p>{data?.summary || "Add your professional summary here."}</p>

        <h2>Education</h2>
        <ul>
          {(data?.education ?? []).map((e, i) => (
            <li key={i}>
              <strong>{e.degree || "Degree"}</strong>, {e.school || "School"} ({e.year || "Year"})
            </li>
          ))}
        </ul>

        <h2>Experience</h2>
        <ul>
          {(data?.experience ?? []).map((x, i) => (
            <li key={i}>
              <strong>{x.position || "Position"}</strong> - {x.company || "Company"} ({x.year || "Year"})
            </li>
          ))}
        </ul>

        <h2>Skills</h2>
        <p>{data?.skills || "Your skills, separated by commas."}</p>
      </div>
    </div>
  );
};

export default ResumePreview;
