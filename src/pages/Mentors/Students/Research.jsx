import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  useParams,
  useLocation,
  useSearchParams,
} from "react-router-dom";

import {
  FlaskConical,
  FileCheck2,
  Clock3,
  RotateCcw,
  Files,
  X,
  ExternalLink,
  LoaderCircle,
  AlertCircle,
  CheckCircle2,
  FileText,
  MessageSquare,
} from "lucide-react";

import MentorSidebar from "../../../components/layouts/MentorSidebar";
import MentorHeader from "../../../components/layouts/MentorHeader";

import BackButton from "../../../components/Mentors/Students/Header/BackButton";
import ActionButtons from "../../../components/Mentors/Students/Header/ActionButtons";
import StudentTabs from "../../../components/Mentors/Students/Header/StudentTabs";

import StudentResearchProfile from "../../../components/Mentors/Students/Research/StudentResearchProfile";
import ResearchStatCard from "../../../components/Mentors/Students/Research/ResearchStatCard";
import StudentResearchList from "../../../components/Mentors/Students/Research/StudentResearchList";

import api from "../../../api/axios";

// ==========================================================
// API CONFIGURATION
// ==========================================================

// Your shared Axios client is used by Students.jsx with
// api.get("/mentor/students"). Reuse that configured base URL.
const RESEARCH_API = "/mentor/students";

// ==========================================================
// STUDENT ID RESOLUTION
// ==========================================================

function getStudentIdFromValue(value) {
  if (typeof value === "string" && value.trim()) {
    return value.trim();
  }

  if (typeof value === "number") {
    return String(value);
  }

  if (value && typeof value === "object") {
    return (
      getStudentIdFromValue(value.studentId) ||
      getStudentIdFromValue(value.id) ||
      getStudentIdFromValue(value.student?.id) ||
      getStudentIdFromValue(value.selectedStudent?.id) ||
      getStudentIdFromValue(value.student?.studentId) ||
      null
    );
  }

  return null;
}

function useSelectedStudentId(studentIdProp) {
  const params = useParams();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  return useMemo(() => {
    const state = location.state;

    const candidates = [
      studentIdProp,

      params.studentId,
      params.studentID,
      params.id,

      state?.studentId,
      state?.studentID,
      state?.id,
      state?.student,
      state?.selectedStudent,
      state?.studentData,

      searchParams.get("studentId"),
      searchParams.get("studentID"),
      searchParams.get("id"),
    ];

    for (const candidate of candidates) {
      const resolvedId = getStudentIdFromValue(candidate);

      if (resolvedId) {
        return resolvedId;
      }
    }

    return null;
  }, [
    studentIdProp,
    params,
    location.state,
    searchParams,
  ]);
}

// ==========================================================
// AUTHENTICATED API HELPER
// ==========================================================

async function apiRequest(url, options = {}) {
  try {
    const response = await api.request({
      url,
      method: options.method || "GET",

      data: options.body
        ? JSON.parse(options.body)
        : undefined,

      withCredentials: true,
      headers: options.headers,
    });

    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      "The request failed.";

    const requestError = new Error(message);

    requestError.status = error.response?.status;
    requestError.response = error.response;

    throw requestError;
  }
}

// ==========================================================
// MAP BACKEND DOCUMENT
// ==========================================================

function mapResearchDocument(document) {
  return {
    ...document,
    id: document.id,
    title: document.documentName || "Untitled Research",
    type: document.category || "Research",
    description: document.description || "",
    authors: "Student Research Submission",
    submittedAt: document.uploadedAt,
    fileName: document.documentName || "Research document",
    fileUrl: document.fileUrl,
    status: document.researchReviewStatus || "NOT_REVIEWED",
    mentorRemark: document.mentorRemark || "",
    verifiedAt: document.reviewedAt || null,
  };
}

// ==========================================================
// FORMATTERS
// ==========================================================

function formatDate(value) {
  if (!value) return "Not available";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Not available";
  }

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

function formatFileSize(bytes) {
  if (bytes == null || Number.isNaN(Number(bytes))) {
    return "Size unavailable";
  }

  const size = Number(bytes);

  if (size < 1024) return `${size} B`;

  if (size < 1024 * 1024) {
    return `${(size / 1024).toFixed(1)} KB`;
  }

  return `${(size / (1024 * 1024)).toFixed(2)} MB`;
}

// ==========================================================
// STATUS BADGE
// ==========================================================

function ResearchStatusBadge({ status }) {
  const configuration = {
    NOT_REVIEWED: {
      label: "Pending Review",
      className: "bg-amber-50 text-amber-700 ring-amber-200",
    },
    PENDING: {
      label: "Pending Review",
      className: "bg-amber-50 text-amber-700 ring-amber-200",
    },
    VERIFIED: {
      label: "Verified",
      className: "bg-green-50 text-green-700 ring-green-200",
    },
    CORRECTIONS_REQUESTED: {
      label: "Corrections Requested",
      className: "bg-orange-50 text-orange-700 ring-orange-200",
    },
  };

  const config =
    configuration[status] || configuration.NOT_REVIEWED;

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset ${config.className}`}
    >
      {config.label}
    </span>
  );
}

// ==========================================================
// DOCUMENT PREVIEW
// ==========================================================

function ResearchDocumentPreview({ research, onClose }) {
  if (!research) return null;

  const isPdf = research.fileType?.toLowerCase() === "pdf";

  const isImage =
    /\.(png|jpe?g|gif|webp)(\?.*)?$/i.test(
      research.fileUrl || ""
    );

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/60 p-3 backdrop-blur-sm sm:p-6"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="research-preview-title"
        className="flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
      >
        <header className="flex items-start justify-between gap-4 border-b border-slate-200 p-5">
          <div className="min-w-0">
            <h2
              id="research-preview-title"
              className="break-words text-lg font-bold text-slate-900"
            >
              {research.title}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Uploaded {formatDate(research.uploadedAt)}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close document preview"
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
          >
            <X size={20} />
          </button>
        </header>

        <div className="flex-1 overflow-auto bg-slate-100 p-4 sm:p-6">
          {research.fileUrl ? (
            isImage ? (
              <img
                src={research.fileUrl}
                alt={research.title}
                className="mx-auto max-h-[60vh] max-w-full rounded-lg object-contain"
              />
            ) : isPdf ? (
              <iframe
                title={research.title}
                src={research.fileUrl}
                className="h-[60vh] w-full rounded-lg border border-slate-200 bg-white"
              />
            ) : (
              <div className="flex min-h-64 flex-col items-center justify-center gap-4 rounded-xl bg-white p-8 text-center">
                <FileText size={48} className="text-blue-600" />

                <p className="font-medium text-slate-800">
                  Preview is unavailable for this file type.
                </p>

                <a
                  href={research.fileUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                >
                  Open document <ExternalLink size={16} />
                </a>
              </div>
            )
          ) : (
            <div className="flex min-h-64 flex-col items-center justify-center gap-3 rounded-xl bg-white p-8 text-center">
              <FileText size={44} className="text-slate-400" />

              <p className="font-semibold text-slate-800">
                No document URL available
              </p>
            </div>
          )}
        </div>

        <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 p-4">
          <span className="text-sm text-slate-500">
            {formatFileSize(research.fileSize)}
          </span>

          {research.fileUrl && (
            <a
              href={research.fileUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Open in new tab <ExternalLink size={16} />
            </a>
          )}
        </footer>
      </section>
    </div>
  );
}

// ==========================================================
// REVIEW MODAL
// ==========================================================

function ResearchVerificationModal({
  research,
  onClose,
  onSubmit,
  isSubmitting,
}) {
  const [status, setStatus] = useState("VERIFIED");
  const [remark, setRemark] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!research) return;

    setStatus("VERIFIED");
    setRemark(research.mentorRemark || "");
    setError("");
  }, [research]);

  if (!research) return null;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (
      status === "CORRECTIONS_REQUESTED" &&
      !remark.trim()
    ) {
      setError(
        "Please explain the corrections required before submitting."
      );
      return;
    }

    try {
      await onSubmit({
        id: research.id,
        status,
        remark: remark.trim(),
      });
    } catch (submitError) {
      setError(
        submitError.message || "Unable to submit the review."
      );
    }
  };

  return (
    <div
      className="fixed inset-0 z-[110] flex items-center justify-center bg-slate-950/60 p-3 backdrop-blur-sm sm:p-6"
      onMouseDown={(event) => {
        if (
          event.target === event.currentTarget &&
          !isSubmitting
        ) {
          onClose();
        }
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="research-review-title"
        className="w-full max-w-xl overflow-hidden rounded-2xl bg-white shadow-2xl"
      >
        <header className="flex items-start justify-between gap-4 border-b border-slate-200 p-5">
          <div>
            <div className="mb-2 inline-flex rounded-lg bg-blue-50 p-2 text-blue-700">
              <MessageSquare size={20} />
            </div>

            <h2
              id="research-review-title"
              className="text-lg font-bold text-slate-900"
            >
              Review Research Submission
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Review the document and provide feedback.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            aria-label="Close review"
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 disabled:opacity-50"
          >
            <X size={20} />
          </button>
        </header>

        <form onSubmit={handleSubmit} className="space-y-5 p-5">
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <h3 className="font-semibold text-slate-900">
              {research.title}
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Uploaded {formatDate(research.uploadedAt)}
            </p>

            <div className="mt-3">
              <ResearchStatusBadge status={research.status} />
            </div>
          </div>

          <fieldset className="space-y-3">
            <legend className="mb-2 text-sm font-semibold text-slate-800">
              Review decision
            </legend>

            <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-slate-200 p-4 hover:bg-slate-50">
              <input
                type="radio"
                name="researchReviewStatus"
                value="VERIFIED"
                checked={status === "VERIFIED"}
                onChange={() => setStatus("VERIFIED")}
                className="mt-1 accent-green-600"
                disabled={isSubmitting}
              />

              <span className="flex-1">
                <span className="block font-semibold text-slate-900">
                  Verify submission
                </span>

                <span className="mt-1 block text-sm text-slate-500">
                  Approve this research document.
                </span>
              </span>

              <CheckCircle2 size={20} className="text-green-600" />
            </label>

            <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-slate-200 p-4 hover:bg-slate-50">
              <input
                type="radio"
                name="researchReviewStatus"
                value="CORRECTIONS_REQUESTED"
                checked={status === "CORRECTIONS_REQUESTED"}
                onChange={() => setStatus("CORRECTIONS_REQUESTED")}
                className="mt-1 accent-orange-600"
                disabled={isSubmitting}
              />

              <span className="flex-1">
                <span className="block font-semibold text-slate-900">
                  Request corrections
                </span>

                <span className="mt-1 block text-sm text-slate-500">
                  Return the submission with improvement instructions.
                </span>
              </span>

              <RotateCcw size={20} className="text-orange-600" />
            </label>
          </fieldset>

          <div className="space-y-2">
            <label
              htmlFor="mentor-research-remark"
              className="block text-sm font-semibold text-slate-800"
            >
              Mentor remarks
              {status === "CORRECTIONS_REQUESTED" && (
                <span className="ml-1 text-red-600">*</span>
              )}
            </label>

            <textarea
              id="mentor-research-remark"
              value={remark}
              onChange={(event) => setRemark(event.target.value)}
              placeholder={
                status === "CORRECTIONS_REQUESTED"
                  ? "Explain what needs to be corrected..."
                  : "Add optional feedback..."
              }
              rows={4}
              maxLength={2000}
              disabled={isSubmitting}
              className="w-full resize-y rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-slate-100"
            />

            <p className="text-right text-xs text-slate-400">
              {remark.length}/2000 characters
            </p>
          </div>

          {error && (
            <div
              role="alert"
              className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700"
            >
              <AlertCircle size={18} className="mt-0.5 shrink-0" />
              {error}
            </div>
          )}

          <footer className="flex flex-wrap justify-end gap-3 border-t border-slate-100 pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60 ${
                status === "VERIFIED"
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-orange-600 hover:bg-orange-700"
              }`}
            >
              {isSubmitting && (
                <LoaderCircle size={16} className="animate-spin" />
              )}

              {isSubmitting
                ? "Submitting..."
                : status === "VERIFIED"
                  ? "Verify Document"
                  : "Request Corrections"}
            </button>
          </footer>
        </form>
      </section>
    </div>
  );
}

// ==========================================================
// MAIN RESEARCH PAGE
// ==========================================================

const Research = ({ studentId: studentIdProp }) => {
  const studentId = useSelectedStudentId(studentIdProp);

  const [researchWorks, setResearchWorks] = useState([]);
  const [student, setStudent] = useState(null);
  const [mentor, setMentor] = useState(null);
  const [dashboardStats, setDashboardStats] = useState(null);

  const [selectedResearch, setSelectedResearch] = useState(null);
  const [reviewResearch, setReviewResearch] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  // --------------------------------------------------------
  // LOAD RESEARCH DASHBOARD
  // --------------------------------------------------------

  const loadResearch = useCallback(async () => {
    if (!studentId) {
      setIsLoading(false);
      setResearchWorks([]);
      setStudent(null);
      setMentor(null);
      setDashboardStats(null);

      setError(
        "Student ID is missing. Navigate here from a selected student's profile."
      );

      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await apiRequest(
        `${RESEARCH_API}/${encodeURIComponent(studentId)}/research/dashboard`
      );

      const data = response?.data;

      if (!data) {
        throw new Error(
          "The research dashboard returned no data."
        );
      }

      setStudent(data.student || null);
      setMentor(data.mentor || null);
      setDashboardStats(data.stats || null);

      setResearchWorks(
        (data.documents || []).map(mapResearchDocument)
      );
    } catch (requestError) {
      setError(
        requestError.message ||
          "Unable to load research submissions."
      );
    } finally {
      setIsLoading(false);
    }
  }, [studentId]);

  useEffect(() => {
    loadResearch();
  }, [loadResearch]);

  // --------------------------------------------------------
  // STATISTICS
  // --------------------------------------------------------

  const stats = useMemo(() => {
    const total =
      dashboardStats?.totalSubmissions ?? researchWorks.length;

    const verified =
      dashboardStats?.verified ??
      researchWorks.filter(
        (work) => work.status === "VERIFIED"
      ).length;

    const pending =
      dashboardStats?.pendingReview ??
      researchWorks.filter(
        (work) =>
          work.status === "NOT_REVIEWED" ||
          work.status === "PENDING"
      ).length;

    const corrections =
      dashboardStats?.correctionsRequested ??
      researchWorks.filter(
        (work) => work.status === "CORRECTIONS_REQUESTED"
      ).length;

    return [
      {
        id: "total",
        title: "Research Works",
        value: total,
        subtitle: "Total submitted",
        icon: FlaskConical,
        iconBg: "bg-blue-50",
        iconColor: "text-blue-600",
      },
      {
        id: "verified",
        title: "Verified",
        value: verified,
        subtitle: "Reviewed successfully",
        icon: FileCheck2,
        iconBg: "bg-green-50",
        iconColor: "text-green-600",
      },
      {
        id: "pending",
        title: "Pending Review",
        value: pending,
        subtitle: "Awaiting mentor review",
        icon: Clock3,
        iconBg: "bg-amber-50",
        iconColor: "text-amber-600",
      },
      {
        id: "corrections",
        title: "Corrections",
        value: corrections,
        subtitle: "Returned to mentee",
        icon: RotateCcw,
        iconBg: "bg-orange-50",
        iconColor: "text-orange-600",
      },
      {
        id: "documents",
        title: "Documents",
        value: researchWorks.filter(
          (work) => Boolean(work.fileUrl)
        ).length,
        subtitle: "Research files",
        icon: Files,
        iconBg: "bg-violet-50",
        iconColor: "text-violet-600",
      },
    ];
  }, [researchWorks, dashboardStats]);

  // --------------------------------------------------------
  // SEARCH AND FILTER
  // --------------------------------------------------------

  const filteredResearchWorks = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return researchWorks.filter((work) => {
      const matchesSearch =
        !normalizedSearch ||
        (work.title || "").toLowerCase().includes(normalizedSearch) ||
        (work.fileName || "").toLowerCase().includes(normalizedSearch) ||
        (work.type || "").toLowerCase().includes(normalizedSearch) ||
        (work.description || "").toLowerCase().includes(normalizedSearch);

      const matchesStatus =
        statusFilter === "ALL" ||
        work.status === statusFilter ||
        (statusFilter === "PENDING" &&
          work.status === "NOT_REVIEWED");

      return matchesSearch && matchesStatus;
    });
  }, [researchWorks, searchTerm, statusFilter]);

  // --------------------------------------------------------
  // REVIEW DOCUMENT
  // --------------------------------------------------------

  const handleReviewSubmit = async ({ id, status, remark }) => {
    if (!studentId) {
      throw new Error("Student ID is missing.");
    }

    setIsSubmitting(true);
    setError("");
    setNotice("");

    try {
      const response = await apiRequest(
        `${RESEARCH_API}/${encodeURIComponent(studentId)}/research/${encodeURIComponent(id)}/review`,
        {
          method: "PATCH",
          body: JSON.stringify({
            status,
            mentorRemark: remark,
          }),
        }
      );

      setReviewResearch(null);

      setNotice(
        response?.message ||
          (status === "VERIFIED"
            ? "Research document verified successfully."
            : "Corrections requested successfully.")
      );

      await loadResearch();
    } catch (requestError) {
      setError(
        requestError.message ||
          "Unable to submit the research review."
      );

      throw requestError;
    } finally {
      setIsSubmitting(false);
    }
  };

  // --------------------------------------------------------
  // RENDER
  // --------------------------------------------------------

  return (
    <div className="min-h-screen bg-slate-100">
      <MentorSidebar />

      <div className="ml-[290px] min-h-screen max-lg:ml-0">
        <MentorHeader />

        <main className="space-y-5 p-4 md:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <BackButton />
            <ActionButtons />
          </div>

          {!studentId && (
            <div
              role="alert"
              className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800"
            >
              <AlertCircle size={20} className="mt-0.5 shrink-0" />

              <div>
                <p className="font-semibold">
                  No student selected
                </p>

                <p className="mt-1">
                  The page could not find a student ID in its props,
                  route parameters, navigation state, or query string.
                  Open this page from a selected student's profile.
                </p>
              </div>
            </div>
          )}

          {error && (
            <div
              role="alert"
              className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
            >
              <AlertCircle size={20} className="mt-0.5 shrink-0" />

              <div className="flex-1">
                <p className="font-semibold">
                  Something went wrong
                </p>

                <p className="mt-1">{error}</p>
              </div>

              <button
                type="button"
                onClick={loadResearch}
                disabled={isLoading || !studentId}
                className="shrink-0 rounded-lg border border-red-200 px-3 py-1.5 font-semibold hover:bg-red-100 disabled:opacity-50"
              >
                Retry
              </button>
            </div>
          )}

          {notice && (
            <div
              role="status"
              className="flex items-start gap-3 rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-800"
            >
              <CheckCircle2 size={20} className="mt-0.5 shrink-0" />

              <p className="flex-1">{notice}</p>

              <button
                type="button"
                onClick={() => setNotice("")}
                aria-label="Dismiss notification"
                className="rounded p-1 hover:bg-green-100"
              >
                <X size={16} />
              </button>
            </div>
          )}

          <section className="grid grid-cols-1 items-start gap-4 xl:grid-cols-[260px_minmax(0,1fr)]">
            <StudentResearchProfile
              student={student}
              mentor={mentor}
            />

            <div className="flex min-w-0 flex-col gap-4">
              <StudentTabs />

              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h1 className="text-xl font-bold text-slate-900">
                    Research Submissions
                  </h1>

                  <p className="mt-1 text-sm text-slate-500">
                    Review research documents and track mentor feedback.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={loadResearch}
                  disabled={isLoading || !studentId}
                  className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <RotateCcw
                    size={16}
                    className={isLoading ? "animate-spin" : ""}
                  />
                  Refresh
                </button>
              </div>

              <section
                aria-label="Research statistics"
                className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5"
              >
                {stats.map((stat) => (
                  <ResearchStatCard
                    key={stat.id}
                    {...stat}
                  />
                ))}
              </section>

              {isLoading ? (
                <div className="flex min-h-56 flex-col items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white p-8">
                  <LoaderCircle
                    size={32}
                    className="animate-spin text-blue-600"
                  />

                  <p className="text-sm font-medium text-slate-600">
                    Loading research submissions...
                  </p>
                </div>
              ) : (
                <StudentResearchList
                  researchWorks={filteredResearchWorks}
                  searchTerm={searchTerm}
                  onSearchChange={setSearchTerm}
                  statusFilter={statusFilter}
                  onStatusFilterChange={setStatusFilter}
                  onView={setSelectedResearch}
                  onReview={setReviewResearch}
                />
              )}
            </div>
          </section>
        </main>
      </div>

      <ResearchDocumentPreview
        research={selectedResearch}
        onClose={() => setSelectedResearch(null)}
      />

      <ResearchVerificationModal
        research={reviewResearch}
        onClose={() => setReviewResearch(null)}
        onSubmit={handleReviewSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  );
};

export default Research;