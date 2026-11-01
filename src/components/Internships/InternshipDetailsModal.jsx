import { useState } from "react";

import {
  X,
  Building2,
  CalendarDays,
  MapPin,
  Monitor,
  FileText,
  UploadCloud,
  ExternalLink,
  CheckCircle2,
  Clock3,
  Send,
  LoaderCircle,
} from "lucide-react";

import internshipService from "../../services/internshipService";
import api from "../../api/axios";

import DocumentUploadModal from "./DocumentUploadModal";

// ==========================================================
// FORMAT DATE
// ==========================================================

const formatDate = (value) => {
  if (!value) return "—";

  const date = new Date(value);

  return Number.isNaN(date.getTime())
    ? "—"
    : date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
};

// ==========================================================
// RESOLVE FILE URL
// ==========================================================

const resolveFileUrl = (fileUrl) => {
  if (!fileUrl) {
    return null;
  }

  if (/^https?:\/\//i.test(fileUrl)) {
    return fileUrl;
  }

  if (fileUrl.startsWith("/api/")) {
    return fileUrl.replace(/^\/api/, "");
  }

  return fileUrl.startsWith("/")
    ? fileUrl
    : `/${fileUrl}`;
};

// ==========================================================
// MAIN COMPONENT
// ==========================================================

const InternshipDetailsModal = ({
  internship,
  onClose,
  onRefresh,
}) => {
  const [uploadStage, setUploadStage] = useState(null);

  const [requestingCompletion, setRequestingCompletion] =
    useState(false);

  const [openingDocumentId, setOpeningDocumentId] =
    useState(null);

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  if (!internship) return null;

  // ==========================================================
  // DOCUMENT DATA
  // ==========================================================

  const documents = internship.internship_documents || [];

  const isAlreadyCompleted =
    internship.internshipType === "ALREADY_COMPLETED";

  const canRequestCompletion =
    internship.status === "ONGOING" &&
    internship.verificationStatus === "APPROVED" &&
    internship.completionVerificationStatus !== "APPROVED";

  const completionDocuments = [
    "COMPLETION_CERTIFICATE",
    "COMPLETION_LETTER",
    "FINAL_REPORT",
  ];

  const uploadedCompletionTypes = new Set(
    documents
      .filter((doc) => doc.submissionStage === "COMPLETION")
      .map((doc) => doc.documentType)
  );

  const missingCompletionDocuments =
    completionDocuments.filter(
      (type) => !uploadedCompletionTypes.has(type)
    );

  // ==========================================================
  // REQUEST COMPLETION
  // ==========================================================

  const requestCompletion = async () => {
    setError("");
    setMessage("");

    if (missingCompletionDocuments.length > 0) {
      setError(
        "Upload the completion certificate, completion letter, and final report before requesting completion verification."
      );

      return;
    }

    setRequestingCompletion(true);

    try {
      await internshipService.requestCompletion(internship.id);

      setMessage(
        "Completion verification requested successfully."
      );

      await onRefresh?.();
      onClose?.();
    } catch (err) {
      setError(
        err.message ||
        "Unable to request completion verification."
      );
    } finally {
      setRequestingCompletion(false);
    }
  };

  // ==========================================================
  // OPEN DOCUMENT - AUTHENTICATED
  // ==========================================================

  const handleOpenDocument = async (doc) => {
    if (!doc?.fileUrl || openingDocumentId) {
      return;
    }

    // Open a blank tab immediately to avoid popup blocking.
    const newWindow = window.open(
      "about:blank",
      "_blank"
    );

    if (!newWindow) {
      setError(
        "Your browser blocked the new tab. Please allow pop-ups and try again."
      );

      return;
    }

    newWindow.opener = null;

    setOpeningDocumentId(doc.id);
    setError("");

    let objectUrl = null;

    try {
      const fileUrl = resolveFileUrl(doc.fileUrl);

      const response = await api.get(fileUrl, {
        responseType: "blob",
      });

      objectUrl = window.URL.createObjectURL(
        response.data
      );

      newWindow.location.href = objectUrl;

      // Give the new tab time to load the Blob URL.
      window.setTimeout(() => {
        window.URL.revokeObjectURL(objectUrl);
      }, 60000);

    } catch (err) {
      console.error(
        "Failed to open internship document:",
        err
      );

      newWindow.close();

      const status = err.response?.status;

      if (status === 401) {
        setError(
          "Your session has expired. Please log in again."
        );
      } else if (status === 403) {
        setError(
          "You are not authorized to access this document."
        );
      } else if (status === 404) {
        setError(
          "The requested document could not be found."
        );
      } else {
        setError(
          "Unable to open the document. Please try again."
        );
      }

    } finally {
      setOpeningDocumentId(null);
    }
  };

  // ==========================================================
  // VERIFICATION LABELS
  // ==========================================================

  const verificationLabel = {
    APPROVED: "Approved",
    PENDING: "Pending",
    REJECTED: "Needs attention",
    NOT_SUBMITTED: "Not submitted",
  };

  const completionLabel =
    verificationLabel[
      internship.completionVerificationStatus
    ] || "Not submitted";

  // ==========================================================
  // RENDER
  // ==========================================================

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-3 sm:p-6">

        <section
          role="dialog"
          aria-modal="true"
          aria-labelledby="internship-details-title"
          className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-2xl"
        >

          {/* ==================================================
              HEADER
          ================================================== */}

          <header className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-100 bg-white px-5 py-4 sm:px-7">

            <div className="flex items-center gap-3">

              <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
                <Building2 size={22} />
              </div>

              <div>
                <h2
                  id="internship-details-title"
                  className="font-bold text-slate-900"
                >
                  Internship Details
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  {internship.companyName}
                </p>
              </div>

            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close details"
              className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"
            >
              <X size={20} />
            </button>

          </header>

          {/* ==================================================
              CONTENT
          ================================================== */}

          <div className="space-y-6 p-5 sm:p-7">

            {/* ERROR */}

            {error && (
              <div
                role="alert"
                className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700"
              >
                {error}
              </div>
            )}

            {/* MESSAGE */}

            {message && (
              <div className="rounded-xl border border-green-200 bg-green-50 p-3 text-sm text-green-700">
                {message}
              </div>
            )}

            {/* ==================================================
                INTERNSHIP INFORMATION
            ================================================== */}

            <section>

              <div className="flex flex-wrap items-start justify-between gap-3">

                <div>
                  <h3 className="text-xl font-bold text-[#142970]">
                    {internship.internshipTitle}
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    {internship.role || internship.companyName}
                  </p>
                </div>

                <span className="rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700">
                  {(internship.status || "UNKNOWN")
                    .replaceAll("_", " ")
                    .toLowerCase()
                    .replace(/\b\w/g, (char) =>
                      char.toUpperCase()
                    )}
                </span>

              </div>

              <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">

                <Info
                  Icon={CalendarDays}
                  label="Start Date"
                  value={formatDate(internship.startDate)}
                />

                <Info
                  Icon={CalendarDays}
                  label="End Date"
                  value={formatDate(internship.endDate)}
                />

                <Info
                  Icon={MapPin}
                  label="Location"
                  value={internship.location || "Not specified"}
                />

                <Info
                  Icon={Monitor}
                  label="Work Mode"
                  value={internship.mode || "Not specified"}
                />

              </div>

              {internship.description && (
                <p className="mt-4 whitespace-pre-line text-sm leading-6 text-slate-600">
                  {internship.description}
                </p>
              )}

            </section>

            {/* ==================================================
                VERIFICATION STATUS
            ================================================== */}

            <section className="rounded-xl border border-slate-200 p-4">

              <h3 className="font-semibold text-slate-900">
                Verification Status
              </h3>

              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">

                <VerificationCard
                  title="Initial Verification"
                  status={
                    verificationLabel[
                      internship.verificationStatus
                    ] || "Unknown"
                  }
                  approved={
                    internship.verificationStatus === "APPROVED"
                  }
                  rejected={
                    internship.verificationStatus === "REJECTED"
                  }
                />

                <VerificationCard
                  title="Completion Verification"
                  status={completionLabel}
                  approved={
                    internship.completionVerificationStatus ===
                    "APPROVED"
                  }
                  rejected={
                    internship.completionVerificationStatus ===
                    "REJECTED"
                  }
                />

              </div>

              {internship.mentorRemark && (
                <div className="mt-4 rounded-lg bg-slate-50 p-3">

                  <p className="text-xs font-semibold text-slate-600">
                    Initial Mentor Feedback
                  </p>

                  <p className="mt-1 whitespace-pre-line text-sm text-slate-700">
                    {internship.mentorRemark}
                  </p>

                </div>
              )}

              {internship.completionMentorRemark && (
                <div className="mt-3 rounded-lg bg-slate-50 p-3">

                  <p className="text-xs font-semibold text-slate-600">
                    Completion Mentor Feedback
                  </p>

                  <p className="mt-1 whitespace-pre-line text-sm text-slate-700">
                    {internship.completionMentorRemark}
                  </p>

                </div>
              )}

            </section>

            {/* ==================================================
                SUBMITTED DOCUMENTS
            ================================================== */}

            <section>

              <div className="flex flex-wrap items-center justify-between gap-3">

                <div>
                  <h3 className="font-semibold text-slate-900">
                    Submitted Documents
                  </h3>

                  <p className="mt-1 text-xs text-slate-500">
                    Uploaded files associated with this internship.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setUploadStage(
                      isAlreadyCompleted
                        ? "INITIAL"
                        : internship.status === "ONGOING"
                          ? "COMPLETION"
                          : "INITIAL"
                    )
                  }
                  disabled={
                    internship.status === "COMPLETED" ||
                    internship.status === "CANCELLED"
                  }
                  className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <UploadCloud size={16} />
                  Upload Document
                </button>

              </div>

              {documents.length === 0 ? (

                <div className="mt-4 rounded-xl border border-dashed border-slate-300 p-6 text-center">

                  <FileText
                    className="mx-auto text-slate-400"
                    size={25}
                  />

                  <p className="mt-2 text-sm text-slate-600">
                    No documents uploaded yet.
                  </p>

                </div>

              ) : (

                <div className="mt-4 space-y-2">

                  {documents.map((doc) => (

                    <div
                      key={doc.id}
                      className="flex items-center gap-3 rounded-xl border border-slate-200 p-3"
                    >

                      <div className="rounded-lg bg-slate-50 p-2 text-slate-500">
                        <FileText size={18} />
                      </div>

                      <div className="min-w-0 flex-1">

                        <p className="break-words text-sm font-medium text-slate-800">
                          {doc.documentName}
                        </p>

                        <p className="mt-1 text-xs text-slate-400">
                          {doc.documentType?.replaceAll("_", " ")} ·{" "}
                          {doc.submissionStage}
                        </p>

                      </div>

                      {doc.fileUrl && (
                        <button
                          type="button"
                          onClick={() =>
                            handleOpenDocument(doc)
                          }
                          disabled={
                            openingDocumentId !== null
                          }
                          className="rounded-lg p-2 text-blue-600 hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-50"
                          aria-label={`Open ${doc.documentName}`}
                          title="Open document"
                        >

                          {openingDocumentId === doc.id ? (
                            <LoaderCircle
                              size={17}
                              className="animate-spin"
                            />
                          ) : (
                            <ExternalLink size={17} />
                          )}

                        </button>
                      )}

                    </div>

                  ))}

                </div>

              )}

            </section>

            {/* ==================================================
                COMPLETION REQUEST
            ================================================== */}

            {canRequestCompletion && (
              <section className="rounded-xl border border-blue-200 bg-blue-50 p-4">

                <h3 className="font-semibold text-blue-900">
                  Ready to complete your internship?
                </h3>

                <p className="mt-1 text-sm leading-6 text-blue-800">
                  Upload your completion certificate, completion letter,
                  and final report, then request mentor verification.
                </p>

                {missingCompletionDocuments.length > 0 && (
                  <p className="mt-2 text-xs text-blue-700">
                    Still needed:{" "}
                    {missingCompletionDocuments
                      .map((item) =>
                        item
                          .replaceAll("_", " ")
                          .toLowerCase()
                      )
                      .join(", ")}
                  </p>
                )}

                <button
                  type="button"
                  onClick={requestCompletion}
                  disabled={
                    requestingCompletion ||
                    missingCompletionDocuments.length > 0
                  }
                  className="mt-4 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                >

                  {requestingCompletion ? (
                    <LoaderCircle
                      size={16}
                      className="animate-spin"
                    />
                  ) : (
                    <Send size={16} />
                  )}

                  {requestingCompletion
                    ? "Submitting..."
                    : "Request Completion Verification"}

                </button>

              </section>
            )}

            {/* ==================================================
                FOOTER
            ================================================== */}

            <div className="flex justify-end border-t border-slate-100 pt-4">

              <button
                type="button"
                onClick={onClose}
                className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Close
              </button>

            </div>

          </div>

        </section>

      </div>

      {/* ======================================================
          UPLOAD MODAL
      ====================================================== */}

      {uploadStage && (
        <DocumentUploadModal
          internship={internship}
          initialStage={uploadStage}
          onClose={() => setUploadStage(null)}
          onUploaded={onRefresh}
        />
      )}

    </>
  );
};

// ==========================================================
// INFO CARD
// ==========================================================

const Info = ({ Icon, label, value }) => (
  <div className="flex items-start gap-3 rounded-xl bg-slate-50 p-3">

    <Icon
      size={17}
      className="mt-0.5 shrink-0 text-slate-500"
    />

    <div className="min-w-0">

      <p className="text-xs text-slate-500">
        {label}
      </p>

      <p className="mt-1 break-words text-sm font-medium text-slate-800">
        {value}
      </p>

    </div>

  </div>
);

// ==========================================================
// VERIFICATION CARD
// ==========================================================

const VerificationCard = ({
  title,
  status,
  approved,
  rejected,
}) => {
  const color = approved
    ? "text-green-700 bg-green-50"
    : rejected
      ? "text-red-700 bg-red-50"
      : "text-amber-700 bg-amber-50";

  const Icon = approved
    ? CheckCircle2
    : Clock3;

  return (
    <div className="rounded-xl border border-slate-100 p-3">

      <p className="text-xs text-slate-500">
        {title}
      </p>

      <span
        className={`mt-2 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${color}`}
      >
        <Icon size={13} />
        {status}
      </span>

    </div>
  );
};

export default InternshipDetailsModal;