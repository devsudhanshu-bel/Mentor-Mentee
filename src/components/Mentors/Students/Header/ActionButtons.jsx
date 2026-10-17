import React, { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Download, LoaderCircle } from "lucide-react";
import studentReportService from "../../../../services/studentReportService";

const ActionButtons = ({
  studentId: studentIdProp,
  student,
  studentName,
  registerNumber,
  onDownloadReport,
  downloading: externalDownloading,
}) => {
  const [internalDownloading, setInternalDownloading] = useState(false);
  const [error, setError] = useState("");

  const location = useLocation();
  const params = useParams();

  // -------------------------------------------------------
  // RESOLVE STUDENT INFORMATION
  // -------------------------------------------------------

  const routeStudent =
    location.state?.student ||
    location.state?.selectedStudent ||
    location.state?.mentee ||
    null;

  const resolvedStudent =
    student ||
    routeStudent ||
    location.state?.studentDetails ||
    null;

  const resolvedStudentId =
    studentIdProp ||
    resolvedStudent?.id ||
    resolvedStudent?.studentId ||
    location.state?.studentId ||
    location.state?.selectedStudentId ||
    location.state?.menteeId ||
    params.studentId ||
    params.id ||
    params.menteeId ||
    null;

  const resolvedStudentName =
    studentName ||
    resolvedStudent?.fullName ||
    resolvedStudent?.name ||
    resolvedStudent?.studentName ||
    "Student";

  const resolvedRegisterNumber =
    registerNumber ||
    resolvedStudent?.registerNumber ||
    resolvedStudent?.registrationNumber ||
    "";

  // -------------------------------------------------------
  // DOWNLOAD STATE
  // -------------------------------------------------------

  const downloading =
    typeof externalDownloading === "boolean"
      ? externalDownloading
      : internalDownloading;

  // -------------------------------------------------------
  // DOWNLOAD REPORT
  // -------------------------------------------------------

  const handleDownload = async () => {
    if (downloading) return;

    setError("");

    if (
      resolvedStudentId === undefined ||
      resolvedStudentId === null ||
      String(resolvedStudentId).trim() === ""
    ) {
      setError(
        "Student ID is unavailable. Please open the report from the selected student's profile."
      );
      return;
    }

    setInternalDownloading(true);

    try {
      if (typeof onDownloadReport === "function") {
        await onDownloadReport();
      } else {
        await studentReportService.downloadStudentReport({
          studentId: resolvedStudentId,
          studentName: resolvedStudentName,
          registerNumber: resolvedRegisterNumber,
        });
      }
    } catch (err) {
      console.error("Student report download failed:", err);

      setError(
        err?.message ||
          "Unable to download the report. Please try again."
      );
    } finally {
      setInternalDownloading(false);
    }
  };

  // -------------------------------------------------------
  // UI
  // -------------------------------------------------------

  return (
    <div className="flex flex-col items-end gap-2">
      <button
        type="button"
        onClick={handleDownload}
        disabled={downloading}
        className="flex h-9 items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 text-[12px] font-medium text-blue-700 transition hover:border-blue-200 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
        aria-label="Download student report"
        aria-busy={downloading}
        title={
          !resolvedStudentId
            ? "Student ID is required to download the report"
            : "Download the complete student report"
        }
      >
        {downloading ? (
          <LoaderCircle
            size={15}
            className="animate-spin"
          />
        ) : (
          <Download size={15} />
        )}

        {downloading
          ? "Generating Report..."
          : "Download Report"}
      </button>

      {error && (
        <p
          role="alert"
          className="max-w-sm text-right text-xs text-red-600"
        >
          {error}
        </p>
      )}
    </div>
  );
};

export default ActionButtons;