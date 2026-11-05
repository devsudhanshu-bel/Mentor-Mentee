
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

import AdminSidebar from "../../../components/layouts/AdminSidebar";
import AdminHeader from "../../../components/layouts/AdminHeader";

import AdminBackButton from "../../../components/Admin/Students/Header/BackButton";
import ActionButtons from "../../../components/Mentors/Students/Header/ActionButtons";
import AdminStudentTabs from "../../../components/Admin/Students/Header/StudentTabs";

import StudentCertificatesProfile from "../../../components/Mentors/Students/Certificates/StudentCertificatesProfile";
import CertificateStatCard from "../../../components/Mentors/Students/Certificates/CertificateStatCard";
import StudentCertificatesList from "../../../components/Mentors/Students/Certificates/StudentCertificatesList";
import CertificateVerificationModal from "../../../components/Mentors/Students/Certificates/CertificateVerificationModal";

import api from "../../../api/axios";

const API = "/admin/student-profile";

/* -------------------------------------------------------
   STUDENT ID RESOLUTION
------------------------------------------------------- */

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

/* -------------------------------------------------------
   API REQUEST HELPER
------------------------------------------------------- */

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

/* -------------------------------------------------------
   PRIVATE FILE URL RESOLVER
------------------------------------------------------- */

function resolvePrivateFileUrl(fileUrl) {
  if (!fileUrl || typeof fileUrl !== "string") {
    throw new Error("The document URL is unavailable.");
  }

  const baseURL = api.defaults.baseURL || window.location.origin;

  const base = new URL(baseURL, window.location.origin);
  const resolved = new URL(fileUrl, base);

  // Never send the authenticated Axios request to another origin.
  if (resolved.origin !== base.origin) {
    throw new Error(
      "This document uses an unsupported external file URL."
    );
  }

  let pathname = resolved.pathname;

  // Axios baseURL may already contain /api.
  const basePath = base.pathname.replace(/\/$/, "");

  if (
    basePath &&
    basePath !== "/" &&
    pathname.startsWith(`${basePath}/`)
  ) {
    pathname = pathname.slice(basePath.length);
  } else if (basePath && pathname === basePath) {
    pathname = "/";
  }

  return `${pathname}${resolved.search}${resolved.hash}`;
}

/* -------------------------------------------------------
   CERTIFICATE DATA MAPPING
------------------------------------------------------- */

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

/* -------------------------------------------------------
   MAIN ADMIN CERTIFICATES PAGE
------------------------------------------------------- */

const Certificates = ({ studentId: studentIdProp }) => {
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

  /* ---------------- LOAD CERTIFICATES ---------------- */

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
  }, [studentId]);

  useEffect(() => {
    let active = true;

    Promise.resolve().then(() => {
      if (active) loadCertificates();
    });

    return () => {
      active = false;
    };
  }, [loadCertificates]);

  /* ---------------- STATISTICS ---------------- */

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

  /* ---------------- SEARCH AND FILTER ---------------- */

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

  /* ---------------- REVIEW SUBMISSION ---------------- */

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

  /* ---------------- PAGE UI ---------------- */

  return (
    <div className="min-h-screen w-full min-w-0 overflow-x-hidden bg-slate-100">
      <AdminSidebar />

      <div className="ml-0 min-h-screen max-lg:ml-0 lg:ml-[290px] lg:w-[calc(100%-290px)] w-full min-w-0">
        <AdminHeader />

        <main className="space-y-5 p-4 md:p-3 sm:p-4 lg:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <AdminBackButton />
            <ActionButtons />
          </div>

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
              className="flex items-start gap-3 rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-800"
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

          <section className="grid grid-cols-1 items-start gap-4 xl:grid-cols-[260px_minmax(0,1fr)]">
            <StudentCertificatesProfile
              student={student}
              mentor={mentor}
            />

            <div className="flex min-w-0 flex-col gap-4">
              <AdminStudentTabs />

              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h1 className="text-xl font-bold text-slate-900">
                    Certificates
                  </h1>

                  <p className="mt-1 text-sm text-slate-500">
                    Review submitted certificates and monitor verification status.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={loadCertificates}
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

              <section
                aria-label="Certificate statistics"
                className="grid grid-cols-2 gap-2 sm:gap-3 lg:grid-cols-3 2xl:grid-cols-5"
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

/* -------------------------------------------------------
   PRIVATE CERTIFICATE PREVIEW MODAL
------------------------------------------------------- */

function CertificatePreviewModal({ activity, onClose }) {
  if (!activity) return null;

  return (
    <CertificatePreviewContent
      key={activity.id}
      activity={activity}
      onClose={onClose}
    />
  );
}

function CertificatePreviewContent({ activity, onClose }) {
  const [blobUrl, setBlobUrl] = useState("");
  const [blobType, setBlobType] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [fileError, setFileError] = useState("");

  const fileUrl = activity.fileUrl || "";
  const fileName = activity.fileName || "certificate";

  useEffect(() => {
    let active = true;
    let objectUrl = "";

    const loadPrivateFile = async () => {
      if (!fileUrl) {
        setFileError("No document URL is available.");
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setFileError("");

        const resolvedUrl = resolvePrivateFileUrl(fileUrl);

        const response = await api.get(resolvedUrl, {
          responseType: "blob",
          withCredentials: true,
        });

        if (!active) return;

        const blob = response.data;

        if (!(blob instanceof Blob) || blob.size === 0) {
          throw new Error("The document is empty or invalid.");
        }

        objectUrl = window.URL.createObjectURL(blob);

        setBlobType(
          blob.type ||
            response.headers?.["content-type"] ||
            activity.fileType ||
            ""
        );

        setBlobUrl(objectUrl);
      } catch (error) {
        if (!active) return;

        const status = error.response?.status;

        if (status === 401 || status === 403) {
          setFileError(
            "You are not authorized to access this document. Please sign in again or contact the administrator."
          );
        } else if (status === 404) {
          setFileError(
            "This certificate file could not be found on the server."
          );
        } else {
          setFileError(
            error.message || "Unable to load the certificate document."
          );
        }
      } finally {
        if (active) setIsLoading(false);
      }
    };

    loadPrivateFile();

    return () => {
      active = false;

      if (objectUrl) {
        window.URL.revokeObjectURL(objectUrl);
      }
    };
  }, [fileUrl, activity.fileType]);

  const normalizedType = (
    blobType || activity.fileType || ""
  ).toLowerCase();

  const cleanFileName = fileName.toLowerCase().split("?")[0];

  const isPdf =
    normalizedType.includes("pdf") ||
    cleanFileName.endsWith(".pdf");

  const isImage =
    normalizedType.startsWith("image/") ||
    /\.(png|jpe?g|gif|webp|bmp)$/i.test(cleanFileName);

  const downloadFile = () => {
    if (!blobUrl) return;

    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const openFile = () => {
    if (!blobUrl) return;

    window.open(blobUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/60 p-3 backdrop-blur-sm sm:p-6"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-label="Certificate document preview"
        className="flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
      >
        <header className="flex items-start justify-between gap-3 border-b p-5">
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

          <div className="flex shrink-0 items-center gap-2">
            {blobUrl && (
              <>
                <button
                  type="button"
                  onClick={openFile}
                  title="Open in new tab"
                  aria-label="Open certificate in new tab"
                  className="rounded-lg border border-slate-200 p-2 text-slate-600 hover:bg-slate-100"
                >
                  <ExternalLink size={18} />
                </button>

                <button
                  type="button"
                  onClick={downloadFile}
                  title="Download certificate"
                  aria-label="Download certificate"
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

        <div className="flex-1 overflow-auto bg-slate-100 p-4">
          {isLoading ? (
            <div className="flex min-h-64 flex-col items-center justify-center gap-3">
              <LoaderCircle
                size={32}
                className="animate-spin text-blue-600"
              />

              <p className="text-sm text-slate-600">
                Loading certificate document...
              </p>
            </div>
          ) : fileError ? (
            <div
              role="alert"
              className="flex min-h-64 flex-col items-center justify-center gap-3 p-8 text-center"
            >
              <AlertCircle size={32} className="text-red-500" />

              <p className="max-w-lg text-sm text-red-700">
                {fileError}
              </p>
            </div>
          ) : isImage ? (
            <img
              src={blobUrl}
              alt={activity.title}
              className="mx-auto max-h-[65vh] max-w-full object-contain"
            />
          ) : isPdf ? (
            <iframe
              title={activity.title}
              src={blobUrl}
              className="h-[65vh] w-full bg-white"
            />
          ) : (
            <div className="flex min-h-64 flex-col items-center justify-center gap-4 p-8 text-center">
              <Files size={36} className="text-slate-400" />

              <p className="text-sm text-slate-600">
                Preview is unavailable for this file type.
              </p>

              <button
                type="button"
                onClick={downloadFile}
                className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
              >
                <Download size={16} />
                Download certificate
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default Certificates;
