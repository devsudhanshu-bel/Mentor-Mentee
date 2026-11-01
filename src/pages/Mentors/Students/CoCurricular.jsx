import {
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
  Trophy,
  ShieldCheck,
  Clock3,
  RotateCcw,
  Files,
  AlertCircle,
  CheckCircle2,
  X,
  LoaderCircle,
  Download,
  ExternalLink,
  FileText,
} from "lucide-react";

import MentorSidebar from "../../../components/layouts/MentorSidebar";
import MentorHeader from "../../../components/layouts/MentorHeader";

import BackButton from "../../../components/Mentors/Students/Header/BackButton";
import ActionButtons from "../../../components/Mentors/Students/Header/ActionButtons";
import StudentTabs from "../../../components/Mentors/Students/Header/StudentTabs";

import StudentCoCurricularProfile from "../../../components/Mentors/Students/CoCurricular/StudentCoCurricularProfile";
import CoCurricularStatCard from "../../../components/Mentors/Students/CoCurricular/CoCurricularStatCard";
import StudentCoCurricularList from "../../../components/Mentors/Students/CoCurricular/StudentCoCurricularList";
import CoCurricularVerificationModal from "../../../components/Mentors/Students/CoCurricular/CoCurricularVerificationModal";

import api from "../../../api/axios";

// ==========================================================
// API CONFIGURATION
// ==========================================================

const API = "/mentor/students";

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
      const id = getStudentIdFromValue(candidate);

      if (id) return id;
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
// API HELPER
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
    const requestError = new Error(
      error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        "The request failed.",
      { cause: error }
    );

    requestError.status = error.response?.status;

    throw requestError;
  }
}

// ==========================================================
// PRIVATE FILE URL RESOLUTION
// ==========================================================

function resolvePrivateFileUrl(fileUrl) {
  if (!fileUrl || typeof fileUrl !== "string") {
    throw new Error("No document URL is available.");
  }

  const trimmedUrl = fileUrl.trim();

  if (!trimmedUrl) {
    throw new Error("No document URL is available.");
  }

  if (/^https?:\/\//i.test(trimmedUrl)) {
    const parsedUrl = new URL(trimmedUrl);

    if (parsedUrl.origin !== window.location.origin) {
      throw new Error(
        "The document URL belongs to an untrusted origin."
      );
    }

    return `${parsedUrl.pathname}${parsedUrl.search}`;
  }

  if (/^(blob:|data:|javascript:)/i.test(trimmedUrl)) {
    throw new Error("Unsupported document URL.");
  }

  const normalizedPath = trimmedUrl.startsWith("/")
    ? trimmedUrl
    : `/${trimmedUrl}`;

  // Axios baseURL already contains /api.
  if (normalizedPath.startsWith("/api/")) {
    return normalizedPath.slice(4);
  }

  return normalizedPath;
}

// ==========================================================
// AUTHENTICATED PRIVATE FILE FETCH
// ==========================================================

async function fetchPrivateFile(fileUrl) {
  const resolvedUrl = resolvePrivateFileUrl(fileUrl);

  try {
    const response = await api.get(resolvedUrl, {
      responseType: "blob",
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        "Unable to load the private document. Please try again.",
      { cause: error }
    );
  }
}

// ==========================================================
// MAP DATABASE DOCUMENT TO UI ACTIVITY
// ==========================================================

function mapActivity(document) {
  return {
    ...document,
    id: document.id,
    title: document.documentName || "Untitled Activity",
    activityName: document.documentName || "Untitled Activity",
    description: document.description || "",
    category: document.description || "Co-Curricular",
    fileName: document.documentName || "Activity document",
    fileUrl: document.fileUrl || "",
    fileType: document.fileType || "",
    fileSize: document.fileSize ?? null,
    submittedAt: document.uploadedAt,
    uploadedAt: document.uploadedAt,
    status: document.researchReviewStatus || "NOT_REVIEWED",
    mentorRemark: document.mentorRemark || "",
    reviewedAt: document.reviewedAt || null,
  };
}

// ==========================================================
// MAIN PAGE
// ==========================================================

const CoCurricular = ({ studentId: studentIdProp }) => {
  const studentId = useSelectedStudentId(studentIdProp);

  const [activities, setActivities] = useState([]);
  const [student, setStudent] = useState(null);
  const [mentor, setMentor] = useState(null);
  const [dashboardStats, setDashboardStats] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const [selectedActivity, setSelectedActivity] = useState(null);
  const [reviewActivity, setReviewActivity] = useState(null);

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  // --------------------------------------------------------
  // LOAD CO-CURRICULAR DASHBOARD
  // --------------------------------------------------------

  const loadActivities = useCallback(async () => {
    if (!studentId) {
      setActivities([]);
      setStudent(null);
      setMentor(null);
      setDashboardStats(null);
      setIsLoading(false);

      setError(
        "Student ID is missing. Open this page from a selected student's profile."
      );

      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await apiRequest(
        `${API}/${encodeURIComponent(studentId)}/cocurricular/dashboard`
      );

      const data = response?.data;

      if (!data) {
        throw new Error(
          "The Co-Curricular dashboard returned no data."
        );
      }

      setStudent(data.student || null);
      setMentor(data.mentor || null);
      setDashboardStats(data.stats || null);

      setActivities(
        (data.documents || []).map(mapActivity)
      );
    } catch (requestError) {
      setError(
        requestError.message ||
          "Unable to load Co-Curricular activities."
      );
    } finally {
      setIsLoading(false);
    }
  }, [studentId]);

  useEffect(() => {
    let active = true;

    Promise.resolve().then(() => {
      if (active) {
        loadActivities();
      }
    });

    return () => {
      active = false;
    };
  }, [loadActivities]);

  // --------------------------------------------------------
  // STATISTICS
  // --------------------------------------------------------

  const stats = useMemo(() => {
    const verified = activities.filter(
      (item) => item.status === "VERIFIED"
    ).length;

    const pending = activities.filter(
      (item) =>
        item.status === "NOT_REVIEWED" ||
        item.status === "PENDING"
    ).length;

    const corrections = activities.filter(
      (item) => item.status === "CORRECTIONS_REQUESTED"
    ).length;

    return [
      {
        id: "total",
        title: "Total Activities",
        value:
          dashboardStats?.totalActivities ??
          dashboardStats?.totalSubmissions ??
          activities.length,
        subtitle: "All submissions",
        icon: Trophy,
        iconBg: "bg-blue-100",
        iconColor: "text-blue-600",
      },
      {
        id: "approved",
        title: "Approved",
        value: dashboardStats?.approved ?? verified,
        subtitle: "Approved activities",
        icon: ShieldCheck,
        iconBg: "bg-green-100",
        iconColor: "text-green-600",
      },
      {
        id: "pending",
        title: "Under Review",
        value:
          dashboardStats?.underReview ??
          dashboardStats?.pendingReview ??
          pending,
        subtitle: "Awaiting mentor review",
        icon: Clock3,
        iconBg: "bg-orange-100",
        iconColor: "text-orange-600",
      },
      {
        id: "corrections",
        title: "Corrections",
        value:
          dashboardStats?.correctionsRequested ??
          corrections,
        subtitle: "Returned to student",
        icon: RotateCcw,
        iconBg: "bg-violet-100",
        iconColor: "text-violet-600",
      },
      {
        id: "documents",
        title: "Documents",
        value: activities.filter(
          (item) => Boolean(item.fileUrl)
        ).length,
        subtitle: "Attached files",
        icon: Files,
        iconBg: "bg-cyan-100",
        iconColor: "text-cyan-600",
      },
    ];
  }, [activities, dashboardStats]);

  // --------------------------------------------------------
  // SEARCH AND FILTER
  // --------------------------------------------------------

  const filteredActivities = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    return activities.filter((item) => {
      const matchesSearch =
        !query ||
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query) ||
        item.fileName.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "ALL" ||
        item.status === statusFilter ||
        (statusFilter === "PENDING" &&
          item.status === "NOT_REVIEWED");

      return matchesSearch && matchesStatus;
    });
  }, [activities, searchTerm, statusFilter]);

  // --------------------------------------------------------
  // REVIEW ACTIVITY
  // --------------------------------------------------------

  const handleReviewSubmit = async ({
    id,
    status,
    remark,
  }) => {
    if (!studentId) {
      throw new Error("Student ID is missing.");
    }

    setIsSubmitting(true);
    setError("");
    setNotice("");

    try {
      const response = await apiRequest(
        `${API}/${encodeURIComponent(studentId)}/cocurricular/${encodeURIComponent(id)}/review`,
        {
          method: "PATCH",
          body: JSON.stringify({
            status,
            mentorRemark: remark,
          }),
        }
      );

      setReviewActivity(null);

      setNotice(
        response?.message ||
          (status === "VERIFIED"
            ? "Activity approved successfully."
            : "Corrections requested successfully.")
      );

      await loadActivities();
    } catch (requestError) {
      setError(
        requestError.message ||
          "Unable to submit the activity review."
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
          {/* PAGE ACTIONS */}

          <div className="flex flex-wrap items-center justify-between gap-3">
            <BackButton />
            <ActionButtons />
          </div>

          {/* ERROR MESSAGE */}

          {error && (
            <div
              role="alert"
              className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
            >
              <AlertCircle
                size={20}
                className="mt-0.5 shrink-0"
              />

              <div className="flex-1">
                <p className="font-semibold">
                  Something went wrong
                </p>

                <p className="mt-1">{error}</p>
              </div>

              <button
                type="button"
                onClick={loadActivities}
                disabled={isLoading || !studentId}
                className="rounded-lg border border-red-200 px-3 py-1.5 font-semibold hover:bg-red-100 disabled:opacity-50"
              >
                Retry
              </button>
            </div>
          )}

          {/* SUCCESS MESSAGE */}

          {notice && (
            <div
              role="status"
              className="flex items-start gap-3 rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-800"
            >
              <CheckCircle2
                size={20}
                className="shrink-0"
              />

              <p className="flex-1">{notice}</p>

              <button
                type="button"
                onClick={() => setNotice("")}
                aria-label="Dismiss notification"
              >
                <X size={16} />
              </button>
            </div>
          )}

          {/* STUDENT PROFILE AND DASHBOARD */}

          <section className="grid grid-cols-1 items-start gap-4 xl:grid-cols-[260px_minmax(0,1fr)]">
            <StudentCoCurricularProfile
              student={student}
              mentor={mentor}
            />

            <div className="flex min-w-0 flex-col gap-4">
              <StudentTabs />

              {/* PAGE TITLE */}

              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h1 className="text-xl font-bold text-slate-900">
                    Co-Curricular Activities
                  </h1>

                  <p className="mt-1 text-sm text-slate-500">
                    Review activities, certificates, and mentor feedback.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={loadActivities}
                  disabled={isLoading || !studentId}
                  className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50 disabled:opacity-50"
                >
                  <RotateCcw
                    size={16}
                    className={isLoading ? "animate-spin" : ""}
                  />
                  Refresh
                </button>
              </div>

              {/* STATISTICS */}

              <section
                aria-label="Co-Curricular statistics"
                className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5"
              >
                {stats.map((stat) => (
                  <CoCurricularStatCard
                    key={stat.id}
                    {...stat}
                  />
                ))}
              </section>

              {/* ACTIVITIES LIST */}

              {isLoading ? (
                <div className="flex min-h-56 flex-col items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white p-8">
                  <LoaderCircle
                    size={32}
                    className="animate-spin text-blue-600"
                  />

                  <p className="text-sm font-medium text-slate-600">
                    Loading Co-Curricular activities...
                  </p>
                </div>
              ) : (
                <StudentCoCurricularList
                  activities={filteredActivities}
                  searchTerm={searchTerm}
                  onSearchChange={setSearchTerm}
                  statusFilter={statusFilter}
                  onStatusFilterChange={setStatusFilter}
                  onView={setSelectedActivity}
                  onReview={setReviewActivity}
                />
              )}
            </div>
          </section>
        </main>
      </div>

      {/* ACTIVITY PREVIEW MODAL */}

      {selectedActivity && (
        <ActivityPreviewModal
          key={selectedActivity.id}
          activity={selectedActivity}
          onClose={() => setSelectedActivity(null)}
        />
      )}

      {/* VERIFICATION MODAL */}

      <CoCurricularVerificationModal
        activity={reviewActivity}
        onClose={() => setReviewActivity(null)}
        onSubmit={handleReviewSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  );
};

// ==========================================================
// ACTIVITY PREVIEW MODAL
// ==========================================================

function ActivityPreviewModal({ activity, onClose }) {
  const fileUrl = activity?.fileUrl || "";
  const fileType = (activity?.fileType || "").toLowerCase();

  const fileName =
    activity?.fileName ||
    activity?.title ||
    "activity-document";

  // State is initialized when the keyed modal mounts.
  // No synchronous state updates are made inside the effect.
  const [blobUrl, setBlobUrl] = useState("");
  const [isLoadingFile, setIsLoadingFile] = useState(
    Boolean(fileUrl)
  );
  const [fileError, setFileError] = useState("");

  // --------------------------------------------------------
  // LOAD PRIVATE DOCUMENT
  // --------------------------------------------------------

  useEffect(() => {
    if (!fileUrl) {
      return undefined;
    }

    let active = true;
    let temporaryUrl = "";

    const loadFile = async () => {
      try {
        const blob = await fetchPrivateFile(fileUrl);

        if (!active) return;

        temporaryUrl = window.URL.createObjectURL(blob);
        setBlobUrl(temporaryUrl);
      } catch (error) {
        if (active) {
          setFileError(
            error.message || "Unable to preview this document."
          );
        }
      } finally {
        if (active) {
          setIsLoadingFile(false);
        }
      }
    };

    // Defer the request outside the synchronous effect body.
    Promise.resolve().then(() => {
      if (active) {
        loadFile();
      }
    });

    return () => {
      active = false;

      if (temporaryUrl) {
        window.URL.revokeObjectURL(temporaryUrl);
      }
    };
  }, [fileUrl]);

  // --------------------------------------------------------
  // FILE TYPE DETECTION
  // --------------------------------------------------------

  const cleanFileUrl = fileUrl.split("?")[0];

  const isPdf =
    fileType.includes("pdf") ||
    /\.pdf$/i.test(fileName) ||
    /\.pdf$/i.test(cleanFileUrl);

  const isImage =
    fileType.startsWith("image/") ||
    /\.(png|jpe?g|gif|webp|bmp)$/i.test(fileName) ||
    /\.(png|jpe?g|gif|webp|bmp)$/i.test(cleanFileUrl);

  // --------------------------------------------------------
  // DOWNLOAD DOCUMENT
  // --------------------------------------------------------

  const handleDownload = () => {
    if (!blobUrl) return;

    const link = document.createElement("a");

    link.href = blobUrl;
    link.download = fileName;

    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  // --------------------------------------------------------
  // OPEN DOCUMENT
  // --------------------------------------------------------

  const handleOpen = () => {
    if (!blobUrl) return;

    const link = document.createElement("a");

    link.href = blobUrl;
    link.target = "_blank";
    link.rel = "noopener noreferrer";

    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  // --------------------------------------------------------
  // RENDER
  // --------------------------------------------------------

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
        aria-label="Activity document preview"
        className="flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
      >
        {/* HEADER */}

        <header className="flex items-start justify-between border-b p-5">
          <div className="min-w-0">
            <h2 className="break-words font-bold text-slate-900">
              {activity.title}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Uploaded{" "}
              {activity.uploadedAt
                ? new Date(activity.uploadedAt).toLocaleDateString("en-IN")
                : "date unavailable"}
            </p>
          </div>

          <div className="ml-3 flex shrink-0 items-center gap-2">
            {blobUrl && (
              <>
                <button
                  type="button"
                  onClick={handleOpen}
                  title="Open document in new tab"
                  className="rounded-lg border border-slate-200 p-2 text-slate-600 hover:bg-slate-100"
                >
                  <ExternalLink size={18} />
                </button>

                <button
                  type="button"
                  onClick={handleDownload}
                  title="Download document"
                  className="rounded-lg border border-slate-200 p-2 text-slate-600 hover:bg-slate-100"
                >
                  <Download size={18} />
                </button>
              </>
            )}

            <button
              type="button"
              onClick={onClose}
              aria-label="Close preview"
              className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
            >
              <X size={20} />
            </button>
          </div>
        </header>

        {/* PREVIEW CONTENT */}

        <div className="flex-1 overflow-auto bg-slate-100 p-4">
          {!fileUrl ? (
            <div className="flex flex-col items-center justify-center gap-3 p-10 text-center">
              <FileText
                size={40}
                className="text-slate-400"
              />

              <p className="text-sm text-slate-500">
                No document URL is available.
              </p>
            </div>
          ) : isLoadingFile ? (
            <div className="flex min-h-[300px] flex-col items-center justify-center gap-3">
              <LoaderCircle
                size={32}
                className="animate-spin text-blue-600"
              />

              <p className="text-sm font-medium text-slate-600">
                Loading private document...
              </p>
            </div>
          ) : fileError ? (
            <div
              role="alert"
              className="flex min-h-[300px] flex-col items-center justify-center gap-3 text-center"
            >
              <AlertCircle
                size={36}
                className="text-red-500"
              />

              <p className="max-w-md text-sm text-red-600">
                {fileError}
              </p>
            </div>
          ) : blobUrl && isImage ? (
            <img
              src={blobUrl}
              alt={activity.title}
              className="mx-auto max-h-[65vh] max-w-full object-contain"
            />
          ) : blobUrl && isPdf ? (
            <iframe
              title={activity.title}
              src={blobUrl}
              className="h-[65vh] w-full bg-white"
            />
          ) : blobUrl ? (
            <div className="flex min-h-[300px] flex-col items-center justify-center gap-4 p-8 text-center">
              <FileText
                size={48}
                className="text-blue-500"
              />

              <div>
                <p className="font-semibold text-slate-800">
                  {fileName}
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  Preview is unavailable for this file type.
                </p>
              </div>

              <div className="flex flex-wrap justify-center gap-3">
                <button
                  type="button"
                  onClick={handleOpen}
                  className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                >
                  <ExternalLink size={16} />
                  Open document
                </button>

                <button
                  type="button"
                  onClick={handleDownload}
                  className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                >
                  <Download size={16} />
                  Download
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </section>
    </div>
  );
}

export default CoCurricular;