
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
  Award,
  ShieldCheck,
  Clock3,
  RotateCcw,
  Files,
  AlertCircle,
  CheckCircle2,
  X,
  LoaderCircle,
  ExternalLink,
  Download,
} from "lucide-react";

import MentorSidebar from "../../../components/layouts/MentorSidebar";
import AdminSidebar from "../../../components/layouts/AdminSidebar";
import MentorHeader from "../../../components/layouts/MentorHeader";
import AdminHeader from "../../../components/layouts/AdminHeader";

import BackButton from "../../../components/Mentors/Students/Header/BackButton";
import AdminBackButton from "../../../components/Admin/Students/Header/AdminBackButton";
import ActionButtons from "../../../components/Mentors/Students/Header/ActionButtons";
import StudentTabs from "../../../components/Mentors/Students/Header/StudentTabs";
import AdminStudentTabs from "../../../components/Admin/Students/Header/AdminStudentTabs";

import StudentCertificatesProfile from "../../../components/Mentors/Students/Certificates/StudentCertificatesProfile";
import CertificateStatCard from "../../../components/Mentors/Students/Certificates/CertificateStatCard";
import StudentCertificatesList from "../../../components/Mentors/Students/Certificates/StudentCertificatesList";
import CertificateVerificationModal from "../../../components/Mentors/Students/Certificates/CertificateVerificationModal";

import api from "../../../api/axios";

const getProfileApiRoot = (isAdminRoute) =>
  isAdminRoute ? "/admin/student-profile" : "/mentor/students";

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
  }, [studentIdProp, params, location.state, searchParams]);
}

// ==========================================================
// API REQUEST
// ==========================================================

async function apiRequest(url, options = {}) {
  try {
    const response = await api.request({
      url,
      method: options.method || "GET",
      data: options.body ? JSON.parse(options.body) : undefined,
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
    requestError.details = error.response?.data?.errors;

    throw requestError;
  }
}

// ==========================================================
// PRIVATE FILE URL RESOLUTION
// ==========================================================

function resolvePrivateFileUrl(fileUrl) {
  if (!fileUrl || typeof fileUrl !== "string") {
    throw new Error("The document URL is missing.");
  }

  const baseURL = api.defaults.baseURL || window.location.origin;

  let base;
  let target;

  try {
    base = new URL(baseURL, window.location.origin);
    target = new URL(fileUrl, base);
  } catch {
    throw new Error("The document URL is invalid.");
  }

  // Do not send authentication headers to an external host.
  if (target.origin !== base.origin) {
    throw new Error(
      "This document belongs to an unsupported external storage location."
    );
  }

  let pathname = target.pathname;

  // Axios already has /api in its base URL in this application.
  // Remove the duplicate prefix when the stored URL contains it.
  const basePath = base.pathname.replace(/\/$/, "");

  if (basePath && basePath !== "/" && pathname.startsWith(`${basePath}/`)) {
    pathname = pathname.slice(basePath.length);
  } else if (
    basePath.endsWith("/api") &&
    pathname.startsWith("/api/")
  ) {
    pathname = pathname.slice(4);
  }

  return `${pathname}${target.search}${target.hash}`;
}

// ==========================================================
// CERTIFICATE MAPPING
// ==========================================================

function mapCertificate(document) {
  return {
    ...document,
    id: document.id,
    title: document.documentName || "Untitled Certificate",
    description: document.description || "",
    category: "Certificates",
    fileName: document.documentName || "Certificate document",
    fileUrl: document.fileUrl || "",
    fileType: document.fileType || "",
    fileSize: document.fileSize ?? null,
    uploadedAt: document.uploadedAt,
    status: document.researchReviewStatus || "NOT_REVIEWED",
    mentorRemark: document.mentorRemark || "",
    reviewedAt: document.reviewedAt || null,
  };
}

// ==========================================================
// MAIN CERTIFICATES PAGE
// ==========================================================

const Certificates = ({ studentId: studentIdProp }) => {
  const location = useLocation();

  const isAdminRoute =
    location.pathname.startsWith("/admin/overview/students/") ||
    location.pathname.startsWith("/admin/mentor/");

  const API = getProfileApiRoot(isAdminRoute);
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
  const [errorDetails, setErrorDetails] = useState([]);
  const [notice, setNotice] = useState("");

  // ========================================================
  // LOAD CERTIFICATES
  // ========================================================

  const loadCertificates = useCallback(async () => {
    if (!studentId) {
      setActivities([]);
      setStudent(null);
      setMentor(null);
      setDashboardStats(null);
      setIsLoading(false);

      setError(
        "Student ID is missing. Open this page from a selected student's profile."
      );

      setErrorDetails([]);
      return;
    }

    setIsLoading(true);
    setError("");
    setErrorDetails([]);

    try {
      const response = await apiRequest(
        `${API}/${encodeURIComponent(studentId)}/certificates/dashboard`
      );

      const data = response?.data;

      if (!data) {
        throw new Error(
          "The Certificates dashboard returned no data."
        );
      }

      setStudent(data.student || null);
      setMentor(data.mentor || null);
      setDashboardStats(data.stats || null);
      setActivities((data.documents || []).map(mapCertificate));
    } catch (requestError) {
      setError(
        requestError.message || "Unable to load certificates."
      );

      setErrorDetails(requestError.details || []);
    } finally {
      setIsLoading(false);
    }
  }, [studentId, API]);

  useEffect(() => {
    let active = true;

    Promise.resolve().then(() => {
      if (active) {
        loadCertificates();
      }
    });

    return () => {
      active = false;
    };
  }, [loadCertificates]);

  // ========================================================
  // STATISTICS
  // ========================================================

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
        title: "Total Certificates",
        value: dashboardStats?.totalCertificates ?? activities.length,
        subtitle: "All submitted certificates",
        icon: Award,
        iconBg: "bg-blue-100",
        iconColor: "text-blue-600",
      },
      {
        id: "approved",
        title: "Approved",
        value: dashboardStats?.approved ?? verified,
        subtitle: "Verified certificates",
        icon: ShieldCheck,
        iconBg: "bg-green-100",
        iconColor: "text-green-600",
      },
      {
        id: "pending",
        title: "Under Review",
        value: dashboardStats?.underReview ?? pending,
        subtitle: "Awaiting mentor review",
        icon: Clock3,
        iconBg: "bg-orange-100",
        iconColor: "text-orange-600",
      },
      {
        id: "corrections",
        title: "Corrections",
        value: dashboardStats?.correctionsRequested ?? corrections,
        subtitle: "Returned to student",
        icon: RotateCcw,
        iconBg: "bg-violet-100",
        iconColor: "text-violet-600",
      },
      {
        id: "documents",
        title: "Documents",
        value: activities.filter((item) => Boolean(item.fileUrl)).length,
        subtitle: "Attached certificate files",
        icon: Files,
        iconBg: "bg-cyan-100",
        iconColor: "text-cyan-600",
      },
    ];
  }, [activities, dashboardStats]);

  // ========================================================
  // SEARCH AND FILTER
  // ========================================================

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

  // ========================================================
  // REVIEW SUBMISSION
  // ========================================================

  const handleReviewSubmit = async ({ id, status, remark }) => {
    if (!studentId) {
      throw new Error("Student ID is missing.");
    }

    setIsSubmitting(true);
    setError("");
    setErrorDetails([]);
    setNotice("");

    try {
      const response = await apiRequest(
        `${API}/${encodeURIComponent(studentId)}/certificates/${encodeURIComponent(id)}/review`,
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
            ? "Certificate verified successfully."
            : "Corrections requested successfully.")
      );

      await loadCertificates();
    } catch (requestError) {
      setError(
        requestError.message ||
          "Unable to submit the certificate review."
      );

      setErrorDetails(requestError.details || []);
      throw requestError;
    } finally {
      setIsSubmitting(false);
    }
  };

  // ========================================================
  // PAGE UI
  // ========================================================

  return (
    <div className="min-h-screen w-full min-w-0 overflow-x-hidden bg-slate-100">
      {isAdminRoute ? <AdminSidebar /> : <MentorSidebar />}

      <div className="min-h-screen w-full min-w-0 lg:ml-[290px] lg:w-[calc(100%-290px)]">
        {isAdminRoute ? <AdminHeader /> : <MentorHeader />}

        <main className="w-full min-w-0 space-y-4 p-3 sm:space-y-5 sm:p-4 md:p-6">
          <div className="flex min-w-0 flex-wrap items-center justify-between gap-2 sm:gap-3">
            {isAdminRoute ? <AdminBackButton /> : <BackButton />}
            <ActionButtons />
          </div>

          {error && (
            <div
              role="alert"
              className="flex min-w-0 items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700 sm:gap-3 sm:p-4"
            >
              <AlertCircle
                size={20}
                className="mt-0.5 shrink-0"
              />

              <div className="min-w-0 flex-1">
                <p className="font-semibold">
                  Something went wrong
                </p>

                <p className="mt-1">{error}</p>

                {errorDetails.length > 0 && (
                  <ul className="mt-2 list-disc pl-5">
                    {errorDetails.map((item, index) => (
                      <li
                        key={`${item.path?.join(".") || "error"}-${index}`}
                      >
                        {item.message}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <button
                type="button"
                onClick={loadCertificates}
                disabled={isLoading || !studentId}
                className="rounded-lg border border-red-200 px-3 py-1.5 font-semibold hover:bg-red-100 disabled:opacity-50"
              >
                Retry
              </button>
            </div>
          )}

          {notice && (
            <div
              role="status"
              className="flex min-w-0 items-start gap-2 rounded-xl border border-green-200 bg-green-50 p-3 text-sm text-green-800 sm:gap-3 sm:p-4"
            >
              <CheckCircle2 size={20} className="shrink-0" />

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

          <section className="grid w-full min-w-0 grid-cols-1 items-start gap-3 sm:gap-4 xl:grid-cols-[260px_minmax(0,1fr)]">
            <StudentCertificatesProfile
              student={student}
              mentor={mentor}
            />

            <div className="flex min-w-0 flex-col gap-3 sm:gap-4">
              {isAdminRoute ? <AdminStudentTabs /> : <StudentTabs />}

              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h1 className="text-lg font-bold text-slate-900 sm:text-xl">
                    Certificates
                  </h1>

                  <p className="mt-1 text-xs leading-5 text-slate-500 sm:text-sm">
                    Review submitted certificates and provide mentor feedback.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={loadCertificates}
                  disabled={isLoading || !studentId}
                  className="inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50 disabled:opacity-50 sm:w-auto"
                >
                  <RotateCcw
                    size={16}
                    className={isLoading ? "animate-spin" : ""}
                  />
                  Refresh
                </button>
              </div>

              <section
                aria-label="Certificate statistics"
                className="grid min-w-0 grid-cols-2 gap-2 sm:gap-3 lg:grid-cols-3 2xl:grid-cols-5"
              >
                {stats.map((stat) => (
                  <CertificateStatCard
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
                    Loading certificates...
                  </p>
                </div>
              ) : (
                <StudentCertificatesList
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

      <CertificatePreviewModal
        activity={selectedActivity}
        onClose={() => setSelectedActivity(null)}
      />

      <CertificateVerificationModal
        activity={reviewActivity}
        onClose={() => setReviewActivity(null)}
        onSubmit={handleReviewSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  );
};

// ==========================================================
// CERTIFICATE PREVIEW MODAL
// ==========================================================

function CertificatePreviewModal({ activity, onClose }) {
  if (!activity) return null;

  return (
    <CertificatePreviewContent
      key={activity.id || activity.fileUrl}
      activity={activity}
      onClose={onClose}
    />
  );
}

function CertificatePreviewContent({ activity, onClose }) {
  const fileUrl = activity.fileUrl || "";

  const [blobUrl, setBlobUrl] = useState("");
  const [blobType, setBlobType] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [fileError, setFileError] = useState("");

  // ========================================================
  // AUTHENTICATED PRIVATE FILE FETCH
  // ========================================================

  useEffect(() => {
    let active = true;
    let createdObjectUrl = null;

    const loadDocument = async () => {
      if (!fileUrl) {
        setFileError("No document URL is available.");
        setIsLoading(false);
        return;
      }

      try {
        const resolvedUrl = resolvePrivateFileUrl(fileUrl);

        const response = await api.get(resolvedUrl, {
          responseType: "blob",
          withCredentials: true,
        });

        if (!active) return;

        const blob = response.data;

        if (!(blob instanceof Blob) || blob.size === 0) {
          throw new Error("The document is empty or unavailable.");
        }

        createdObjectUrl = window.URL.createObjectURL(blob);

        setBlobUrl(createdObjectUrl);
        setBlobType(
          blob.type ||
            response.headers?.["content-type"] ||
            activity.fileType ||
            ""
        );
      } catch (requestError) {
        if (!active) return;

        const status = requestError.response?.status;

        if (status === 401 || status === 403) {
          setFileError(
            "You are not authorized to access this document. Please sign in again or check your access."
          );
        } else if (status === 404) {
          setFileError(
            "This document could not be found on the server."
          );
        } else {
          setFileError(
            requestError.message ||
              "Unable to load the certificate document."
          );
        }
      } finally {
        if (active) {
          setIsLoading(false);
        }
      }
    };

    Promise.resolve().then(loadDocument);

    return () => {
      active = false;

      if (createdObjectUrl) {
        window.URL.revokeObjectURL(createdObjectUrl);
      }
    };
  }, [fileUrl, activity.fileType]);

  // ========================================================
  // FILE TYPE DETECTION
  // ========================================================

  const cleanUrl = fileUrl.toLowerCase().split("?")[0];
  const cleanName = (activity.fileName || "").toLowerCase();

  const detectedType = (
    blobType ||
    activity.fileType ||
    ""
  ).toLowerCase();

  const isPdf =
    detectedType.includes("pdf") ||
    cleanUrl.endsWith(".pdf") ||
    cleanName.endsWith(".pdf");

  const isImage =
    detectedType.startsWith("image/") ||
    /\.(png|jpe?g|gif|webp|bmp|svg)$/i.test(cleanUrl) ||
    /\.(png|jpe?g|gif|webp|bmp|svg)$/i.test(cleanName);

  // ========================================================
  // OPEN AND DOWNLOAD
  // ========================================================

  const handleOpenDocument = () => {
    if (!blobUrl) return;

    window.open(blobUrl, "_blank", "noopener,noreferrer");
  };

  const handleDownloadDocument = () => {
    if (!blobUrl) return;

    const link = document.createElement("a");

    link.href = blobUrl;
    link.download =
      activity.fileName ||
      activity.title ||
      "certificate-document";

    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  // ========================================================
  // MODAL UI
  // ========================================================

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/60 p-2 backdrop-blur-sm sm:p-4 md:p-6"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-label="Certificate document preview"
        className="flex max-h-[calc(100dvh-1rem)] w-full min-w-0 max-w-5xl flex-col overflow-hidden rounded-xl bg-white shadow-2xl sm:max-h-[94dvh] sm:rounded-2xl"
      >
        <header className="flex items-start justify-between gap-2 border-b p-3 sm:gap-4 sm:p-5">
          <div className="min-w-0">
            <h2 className="break-words text-sm font-bold text-slate-900 sm:text-base">
              {activity.title}
            </h2>

            <p className="mt-1 text-xs text-slate-500 sm:text-sm">
              Uploaded{" "}
              {activity.uploadedAt
                ? new Date(activity.uploadedAt).toLocaleDateString("en-IN")
                : "date unavailable"}
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-1 sm:gap-2">
            {blobUrl && (
              <>
                <button
                  type="button"
                  onClick={handleOpenDocument}
                  title="Open document in new tab"
                  className="rounded-lg border border-slate-200 p-2 text-slate-600 hover:bg-slate-100"
                >
                  <ExternalLink size={18} />
                </button>

                <button
                  type="button"
                  onClick={handleDownloadDocument}
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

        <div className="min-h-0 flex-1 overflow-auto bg-slate-100 p-2 sm:p-4">
          {isLoading ? (
            <div className="flex min-h-[50vh] flex-col items-center justify-center gap-3">
              <LoaderCircle
                size={34}
                className="animate-spin text-blue-600"
              />

              <p className="text-sm font-medium text-slate-600">
                Loading certificate document...
              </p>
            </div>
          ) : fileError ? (
            <div
              role="alert"
              className="flex min-h-[40vh] flex-col items-center justify-center gap-3 p-8 text-center"
            >
              <AlertCircle
                size={36}
                className="text-red-500"
              />

              <p className="max-w-lg text-sm text-slate-600">
                {fileError}
              </p>
            </div>
          ) : blobUrl && isImage ? (
            <img
              src={blobUrl}
              alt={activity.title}
              className="mx-auto max-h-[70dvh] max-w-full object-contain"
            />
          ) : blobUrl && isPdf ? (
            <iframe
              title={activity.title}
              src={blobUrl}
              className="h-[70dvh] min-h-[280px] w-full bg-white"
            />
          ) : blobUrl ? (
            <div className="flex min-h-[40vh] flex-col items-center justify-center gap-4 p-8 text-center">
              <Files
                size={42}
                className="text-slate-400"
              />

              <p className="text-sm text-slate-600">
                Preview is unavailable for this file type.
              </p>

              <button
                type="button"
                onClick={handleDownloadDocument}
                className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
              >
                <Download size={16} />
                Download certificate
              </button>
            </div>
          ) : (
            <p className="p-10 text-center text-sm text-slate-500">
              No document URL is available.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}

export default Certificates;
