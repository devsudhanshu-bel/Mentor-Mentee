import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

import {
  AlertCircle,
  RefreshCw,
  BriefcaseBusiness,
  BadgeCheck,
  CircleCheckBig,
  ClipboardCheck,
  Flag,
  ArrowRight,
  FileText,
  Building2,
  CalendarDays,
  MapPin,
  Eye,
  X,
  ExternalLink,
  Star,
  Check,
} from "lucide-react";

import MentorSidebar from "../../../components/layouts/MentorSidebar";
import MentorHeader from "../../../components/layouts/MentorHeader";
import BackButton from "../../../components/Mentors/Students/Header/BackButton";
import ActionButtons from "../../../components/Mentors/Students/Header/ActionButtons";
import StudentTabs from "../../../components/Mentors/Students/Header/StudentTabs";

import StudentInternshipProfile from "../../../components/Mentors/Students/Internships/StudentInternshipProfile";
import InternshipStatCard from "../../../components/Mentors/Students/Internships/InternshipStatCard";

import api from "../../../api/axios";

const unwrap = (response) => {
  const result = response?.data;
  return result?.data !== undefined ? result.data : result;
};

const getError = (error) =>
  error?.response?.data?.message ||
  error?.message ||
  "Something went wrong. Please try again.";

/* =========================================================
   DOCUMENT ERROR HELPERS
========================================================= */

const DOCUMENT_LABELS = {
  OFFER_LETTER: "Offer Letter",
  COMPLETION_CERTIFICATE: "Completion Certificate",
  COMPLETION_LETTER: "Completion Letter",
  FINAL_REPORT: "Final Report",
  INTERNSHIP_CERTIFICATE: "Internship Certificate",
  EXPERIENCE_LETTER: "Experience Letter",
  OTHER: "Supporting Document",
};

const getMissingDocuments = (message = "") => {
  const prefix = "Required documents are missing:";
  const start = message
    .toLowerCase()
    .indexOf(prefix.toLowerCase());

  if (start === -1) return [];

  return message
    .slice(start + prefix.length)
    .split(",")
    .map((item) => item.trim().replace(/[.\s]+$/, ""))
    .filter(Boolean)
    .map(
      (type) =>
        DOCUMENT_LABELS[type] || type.replaceAll("_", " ")
    );
};

/* =========================================================
   GENERAL HELPERS
========================================================= */

const dateText = (date) => {
  if (!date) return "Not specified";

  const parsed = new Date(date);

  return Number.isNaN(parsed.getTime())
    ? "Not specified"
    : parsed.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
};

const statusLabel = (status) =>
  ({
    PENDING_INITIAL_VERIFICATION: "Awaiting initial review",
    ONGOING: "Ongoing",
    PENDING_COMPLETION_VERIFICATION: "Awaiting completion review",
    COMPLETED: "Completed",
    CANCELLED: "Cancelled",
  })[status] ||
  status?.replaceAll("_", " ") ||
  "Unknown";

const statusClass = (status) => {
  if (status === "COMPLETED")
    return "bg-emerald-50 text-emerald-700";

  if (status === "ONGOING")
    return "bg-blue-50 text-blue-700";

  if (status?.startsWith("PENDING"))
    return "bg-amber-50 text-amber-700";

  if (status === "CANCELLED")
    return "bg-red-50 text-red-700";

  return "bg-slate-100 text-slate-600";
};

const getStudentIdFromInternship = (item) =>
  item?.studentId ||
  item?.student?.id ||
  item?.student?.studentId ||
  null;

/* =========================================================
   MAIN INTERNSHIPS PAGE
========================================================= */

const Internships = () => {
  const { id } = useParams();
  const location = useLocation();

  const selectedStudent =
    location.state?.student ||
    location.state?.selectedStudent ||
    null;

  const studentId =
    id ||
    location.state?.studentId ||
    selectedStudent?.id ||
    null;

  const [internships, setInternships] = useState([]);
  const [initialQueue, setInitialQueue] = useState([]);
  const [completionQueue, setCompletionQueue] = useState([]);

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);

  const [selectedInternship, setSelectedInternship] = useState(null);
  const [reviewDetails, setReviewDetails] = useState(null);
  const [reviewLoading, setReviewLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [decision, setDecision] = useState("APPROVED");
  const [remarks, setRemarks] = useState("");
  const [rating, setRating] = useState(5);
  const [reviewError, setReviewError] = useState("");

  /* =======================================================
     LOAD INTERNSHIP DATA
  ======================================================= */

  const loadPage = useCallback(
    async (signal) => {
      if (!studentId) {
        setError(
          "Student ID is missing. Open this page from the selected student's profile."
        );
        setLoading(false);
        setRefreshing(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

        const [
          studentResponse,
          initialResponse,
          completionResponse,
        ] = await Promise.all([
          api.get(
            `/mentor/internships/student/${encodeURIComponent(
              studentId
            )}`,
            { signal }
          ),
          api.get("/mentor/internships/initial", { signal }),
          api.get("/mentor/internships/completion", { signal }),
        ]);

        const allItems = unwrap(studentResponse);
        const initialItems = unwrap(initialResponse);
        const completionItems = unwrap(completionResponse);

        const all = Array.isArray(allItems)
          ? allItems
          : allItems?.internships || allItems?.items || [];

        const initial = Array.isArray(initialItems)
          ? initialItems
          : initialItems?.internships ||
            initialItems?.items ||
            [];

        const completion = Array.isArray(completionItems)
          ? completionItems
          : completionItems?.internships ||
            completionItems?.items ||
            [];

        setInternships(all);

        setInitialQueue(
          initial.filter(
            (item) =>
              getStudentIdFromInternship(item) === studentId
          )
        );

        setCompletionQueue(
          completion.filter(
            (item) =>
              getStudentIdFromInternship(item) === studentId
          )
        );
      } catch (err) {
        if (
          err?.code === "ERR_CANCELED" ||
          err?.name === "CanceledError"
        ) {
          return;
        }

        console.error(
          "Unable to load student internships:",
          err
        );

        setError(getError(err));
      } finally {
        if (!signal?.aborted) {
          setLoading(false);
          setRefreshing(false);
        }
      }
    },
    [studentId]
  );

  useEffect(() => {
    const controller = new AbortController();

    loadPage(controller.signal);

    return () => controller.abort();
  }, [loadPage, refreshKey]);

  const refresh = () => {
    setRefreshing(true);
    setRefreshKey((value) => value + 1);
  };

  /* =======================================================
     DERIVED DATA
  ======================================================= */

  const currentInternship = useMemo(
    () =>
      internships.find((item) => item.status === "ONGOING") ||
      internships.find((item) =>
        [
          "PENDING_INITIAL_VERIFICATION",
          "PENDING_COMPLETION_VERIFICATION",
        ].includes(item.status)
      ) ||
      null,
    [internships]
  );

  const completedInternships = useMemo(
    () =>
      internships.filter(
        (item) =>
          item.status === "COMPLETED" &&
          item.verificationStatus === "APPROVED" &&
          item.completionVerificationStatus === "APPROVED"
      ),
    [internships]
  );

  const ratedInternships = completedInternships.filter(
    (item) =>
      item.rating != null &&
      Number.isFinite(Number(item.rating))
  );

  const averageRating = ratedInternships.length
    ? (
        ratedInternships.reduce(
          (sum, item) => sum + Number(item.rating),
          0
        ) / ratedInternships.length
      ).toFixed(1)
    : "—";

  const stats = [
    {
      id: "total",
      icon: BriefcaseBusiness,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      title: "Total Internships",
      value: internships.length,
      subtitle: "All records",
    },
    {
      id: "ongoing",
      icon: BadgeCheck,
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-600",
      title: "Ongoing",
      value: internships.filter(
        (item) => item.status === "ONGOING"
      ).length,
      subtitle: "Currently active",
    },
    {
      id: "completed",
      icon: CircleCheckBig,
      iconBg: "bg-violet-100",
      iconColor: "text-violet-600",
      title: "Completed",
      value: completedInternships.length,
      subtitle: "Fully verified",
    },
  ];

  /* =======================================================
     OPEN REVIEW MODAL
  ======================================================= */

  const openReview = async (internship, stage) => {
    setSelectedInternship({
      ...internship,
      reviewStage: stage,
    });

    setReviewDetails(null);
    setReviewLoading(true);
    setReviewError("");
    setRemarks("");
    setDecision("APPROVED");
    setRating(5);

    try {
      const response = await api.get(
        `/mentor/internships/${encodeURIComponent(
          internship.id
        )}`
      );

      setReviewDetails(unwrap(response));
    } catch (err) {
      setReviewError(getError(err));
    } finally {
      setReviewLoading(false);
    }
  };

  const closeReview = () => {
    if (submitting) return;

    setSelectedInternship(null);
    setReviewDetails(null);
    setReviewError("");
  };

  /* =======================================================
     SUBMIT REVIEW
  ======================================================= */

  const submitReview = async (event) => {
    event.preventDefault();

    if (!selectedInternship || !reviewDetails) return;

    if (decision === "REJECTED" && !remarks.trim()) {
      setReviewError(
        "Please provide remarks when rejecting a submission."
      );
      return;
    }

    const stage = selectedInternship.reviewStage;

    const path =
      stage === "completion"
        ? `/mentor/internships/${encodeURIComponent(
            selectedInternship.id
          )}/completion-review`
        : `/mentor/internships/${encodeURIComponent(
            selectedInternship.id
          )}/initial-review`;

    const payload = {
      decision,
      remarks: remarks.trim(),
      ...(stage === "completion" && decision === "APPROVED"
        ? { rating: Number(rating) }
        : {}),
    };

    try {
      setSubmitting(true);
      setReviewError("");

      const response = await api.patch(path, payload);

      setNotice(
        response?.data?.message ||
          (decision === "APPROVED"
            ? "Internship review approved successfully."
            : "Internship submission rejected.")
      );

      setSelectedInternship(null);
      setReviewDetails(null);
      setReviewError("");

      setRefreshing(true);
      setRefreshKey((value) => value + 1);
    } catch (err) {
      setReviewError(getError(err));
    } finally {
      setSubmitting(false);
    }
  };

  const mentorName =
    location.state?.mentor ||
    location.state?.assignedMentor ||
    null;

  /* =======================================================
     PAGE UI
  ======================================================= */

  return (
    <div className="min-h-screen bg-slate-100">
      <MentorSidebar />

      <div className="ml-[290px] min-h-screen min-w-0 max-lg:ml-0">
        <MentorHeader />

        <main className="space-y-4 p-4 md:p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <BackButton />

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={refresh}
                disabled={loading || refreshing}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50"
              >
                <RefreshCw
                  size={16}
                  className={
                    loading || refreshing ? "animate-spin" : ""
                  }
                />
                Refresh
              </button>

              <ActionButtons />
            </div>
          </div>

          {error && (
            <div
              role="alert"
              className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
            >
              <AlertCircle
                size={18}
                className="mt-0.5 shrink-0"
              />

              <div className="min-w-0 flex-1">
                <p className="font-semibold">
                  Could not load internships
                </p>
                <p className="mt-1">{error}</p>
              </div>

              <button
                type="button"
                onClick={refresh}
                className="font-semibold underline"
              >
                Retry
              </button>
            </div>
          )}

          {notice && (
            <div className="flex items-center justify-between gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
              <span>{notice}</span>

              <button
                type="button"
                onClick={() => setNotice("")}
                aria-label="Dismiss message"
              >
                <X size={16} />
              </button>
            </div>
          )}

          <div className="grid grid-cols-1 items-start gap-4 xl:grid-cols-[280px_minmax(0,1fr)]">
            <aside className="min-w-0">
              <StudentInternshipProfile
                student={selectedStudent}
                mentor={mentorName}
                internships={internships}
              />
            </aside>

            <div className="min-w-0 space-y-4">
              <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
                <StudentTabs />
              </div>

              <div>
                <h1 className="text-xl font-bold text-[#142970]">
                  Internship Overview
                </h1>

                <p className="mt-1 text-sm text-slate-500">
                  Review documents and track this student's
                  internship journey.
                </p>
              </div>

              <section className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                {stats.map((stat) => (
                  <InternshipStatCard
                    key={stat.id}
                    {...stat}
                  />
                ))}
              </section>

              <CurrentInternshipPanel
                internship={currentInternship}
                onReview={openReview}
              />

              <section className="grid grid-cols-1 items-start gap-4 2xl:grid-cols-2">
                <ReviewQueue
                  title="Initial Verification"
                  description="Review company details and initial documents."
                  items={initialQueue}
                  loading={loading}
                  stage="initial"
                  onReview={openReview}
                />

                <ReviewQueue
                  title="Completion Verification"
                  description="Review completion documents and final reports."
                  items={completionQueue}
                  loading={loading}
                  stage="completion"
                  onReview={openReview}
                />
              </section>
            </div>
          </div>

          <PreviousInternshipsPanel
            internships={completedInternships}
            loading={loading}
          />
        </main>
      </div>

      {selectedInternship && (
        <ReviewModal
          internship={reviewDetails}
          loading={reviewLoading}
          stage={selectedInternship.reviewStage}
          decision={decision}
          setDecision={setDecision}
          remarks={remarks}
          setRemarks={setRemarks}
          rating={rating}
          setRating={setRating}
          error={reviewError}
          submitting={submitting}
          onClose={closeReview}
          onSubmit={submitReview}
        />
      )}
    </div>
  );
};

/* =========================================================
   CURRENT INTERNSHIP PANEL
========================================================= */

function CurrentInternshipPanel({ internship, onReview }) {
  if (!internship) {
    return (
      <section className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <Building2
          size={30}
          className="mx-auto text-slate-400"
        />

        <h2 className="mt-3 font-semibold text-slate-800">
          No current internship
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Current internship information will appear here when a
          record exists.
        </p>
      </section>
    );
  }

  const documents = internship.internship_documents || [];

  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 p-4">
        <div>
          <h2 className="font-semibold text-slate-900">
            Current Internship
          </h2>

          <p className="mt-1 text-xs text-slate-500">
            Internship details and verification progress
          </p>
        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${statusClass(
            internship.status
          )}`}
        >
          {statusLabel(internship.status)}
        </span>
      </header>

      <div className="grid grid-cols-1 gap-5 p-4 lg:grid-cols-2">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">
            {internship.internshipTitle || "Internship"}
          </h3>

          <p className="mt-1 font-medium text-blue-700">
            {internship.companyName || "Company not specified"}
          </p>

          <div className="mt-4 space-y-3 text-sm text-slate-600">
            <InfoLine
              icon={CalendarDays}
              label="Start date"
            >
              {dateText(internship.startDate)}
            </InfoLine>

            <InfoLine icon={CalendarDays} label="End date">
              {dateText(internship.endDate)}
            </InfoLine>

            <InfoLine icon={MapPin} label="Location">
              {internship.location || "Not specified"}
            </InfoLine>

            <InfoLine icon={BriefcaseBusiness} label="Mode">
              {internship.mode || "Not specified"}
            </InfoLine>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-slate-800">
            Submitted Documents
          </h3>

          {documents.length ? (
            <div className="mt-3 space-y-2">
              {documents.map((document) => (
                <a
                  key={document.id}
                  href={document.fileUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 rounded-lg border border-slate-200 p-3 text-sm hover:border-blue-300 hover:bg-blue-50"
                >
                  <FileText
                    size={17}
                    className="shrink-0 text-blue-600"
                  />

                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-medium text-slate-800">
                      {document.documentName ||
                        document.documentType}
                    </span>

                    <span className="text-xs text-slate-500">
                      {document.submissionStage || "Document"}
                    </span>
                  </span>

                  <ExternalLink
                    size={15}
                    className="text-slate-400"
                  />
                </a>
              ))}
            </div>
          ) : (
            <p className="mt-3 rounded-lg bg-slate-50 p-3 text-sm text-slate-500">
              No documents attached.
            </p>
          )}

          {internship.status ===
            "PENDING_INITIAL_VERIFICATION" && (
            <button
              type="button"
              onClick={() => onReview(internship, "initial")}
              className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Review Initial Submission
              <ArrowRight size={15} />
            </button>
          )}

          {internship.status ===
            "PENDING_COMPLETION_VERIFICATION" && (
            <button
              type="button"
              onClick={() => onReview(internship, "completion")}
              className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-violet-700"
            >
              Review Completion
              <ArrowRight size={15} />
            </button>
          )}
        </div>
      </div>

      {internship.description && (
        <div className="border-t border-slate-100 px-4 py-3">
          <p className="text-xs font-semibold text-slate-700">
            Description
          </p>

          <p className="mt-1 whitespace-pre-wrap text-sm leading-6 text-slate-600">
            {internship.description}
          </p>
        </div>
      )}

      {internship.mentorRemark && (
        <div className="border-t border-slate-100 bg-blue-50/60 px-4 py-3">
          <p className="text-xs font-semibold text-slate-700">
            Mentor remark
          </p>

          <p className="mt-1 whitespace-pre-wrap text-sm text-slate-600">
            {internship.mentorRemark}
          </p>
        </div>
      )}

      {internship.completionMentorRemark && (
        <div className="border-t border-slate-100 bg-violet-50/60 px-4 py-3">
          <p className="text-xs font-semibold text-slate-700">
            Completion review remark
          </p>

          <p className="mt-1 whitespace-pre-wrap text-sm text-slate-600">
            {internship.completionMentorRemark}
          </p>
        </div>
      )}
    </section>
  );
}

/* =========================================================
   REVIEW QUEUE
========================================================= */

function ReviewQueue({
  title,
  description,
  items,
  loading,
  stage,
  onReview,
}) {
  const completion = stage === "completion";

  return (
    <section className="min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <header className="flex items-start justify-between gap-3 border-b border-slate-100 p-4">
        <div className="flex items-start gap-3">
          <div
            className={`rounded-xl p-2.5 ${
              completion
                ? "bg-violet-50 text-violet-600"
                : "bg-blue-50 text-blue-600"
            }`}
          >
            {completion ? (
              <Flag size={20} />
            ) : (
              <ClipboardCheck size={20} />
            )}
          </div>

          <div>
            <h2 className="font-semibold text-slate-900">
              {title}
            </h2>

            <p className="mt-1 text-xs leading-5 text-slate-500">
              {description}
            </p>
          </div>
        </div>

        <span className="shrink-0 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">
          {items.length}
        </span>
      </header>

      {loading ? (
        <div className="space-y-3 p-4">
          {[1, 2].map((key) => (
            <div
              key={key}
              className="h-20 animate-pulse rounded-xl bg-slate-50"
            />
          ))}
        </div>
      ) : items.length === 0 ? (
        <div className="px-4 py-8 text-center">
          <CircleCheckBig
            size={26}
            className="mx-auto text-emerald-500"
          />

          <p className="mt-3 text-sm font-semibold text-slate-800">
            Nothing to review
          </p>

          <p className="mt-1 text-xs leading-5 text-slate-500">
            No complete submissions are awaiting this review.
          </p>
        </div>
      ) : (
        <div className="space-y-3 p-3">
          {items.map((item) => (
            <article
              key={item.id}
              className="rounded-xl border border-slate-200 p-3"
            >
              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-blue-50 p-2 text-blue-600">
                  <FileText size={18} />
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="break-words text-sm font-semibold text-slate-800">
                    {item.internshipTitle || "Internship"}
                  </h3>

                  <p className="mt-1 text-xs text-slate-500">
                    {item.companyName || "Company not specified"}
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    {item.student?.fullName || "Student"}
                    {item.student?.registerNumber
                      ? ` · ${item.student.registerNumber}`
                      : ""}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onReview(item, stage)}
                className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
              >
                <Eye size={15} />
                Review Submission
              </button>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

/* =========================================================
   PREVIOUS INTERNSHIPS
========================================================= */

function PreviousInternshipsPanel({ internships, loading }) {
  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 p-5">
        <div>
          <h2 className="font-semibold text-slate-900">
            Previous Internships
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Completed and fully verified internship history
          </p>
        </div>

        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
          {internships.length} completed
        </span>
      </header>

      {loading ? (
        <div className="space-y-3 p-4">
          {[1, 2].map((key) => (
            <div
              key={key}
              className="h-24 animate-pulse rounded-xl bg-slate-50"
            />
          ))}
        </div>
      ) : internships.length === 0 ? (
        <div className="p-8 text-center">
          <BriefcaseBusiness
            size={28}
            className="mx-auto text-slate-400"
          />

          <p className="mt-3 text-sm font-semibold text-slate-800">
            No completed internships yet
          </p>

          <p className="mt-1 text-sm text-slate-500">
            Fully verified completed internships will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-3 p-4">
          {internships.map((item) => (
            <article
              key={item.id}
              className="grid gap-4 rounded-xl border border-slate-200 p-4 md:grid-cols-[minmax(0,1fr)_auto] md:items-center"
            >
              <div className="min-w-0">
                <h3 className="font-semibold text-slate-900">
                  {item.internshipTitle || "Internship"}
                </h3>

                <p className="mt-1 text-sm font-medium text-blue-700">
                  {item.companyName || "Company not specified"}
                </p>

                <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-xs text-slate-500">
                  <span className="inline-flex items-center gap-1.5">
                    <CalendarDays size={13} />
                    {dateText(item.startDate)} – {dateText(item.endDate)}
                  </span>

                  {item.location && (
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin size={13} />
                      {item.location}
                    </span>
                  )}

                  {item.role && <span>Role: {item.role}</span>}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                  <Check size={13} />
                  Verified
                </span>

                {item.rating != null && (
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-amber-600">
                    <Star size={15} fill="currentColor" />
                    {Number(item.rating).toFixed(1)} / 5
                  </span>
                )}
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

/* =========================================================
   REVIEW MODAL
========================================================= */

function ReviewModal({
  internship,
  loading,
  stage,
  decision,
  setDecision,
  remarks,
  setRemarks,
  rating,
  setRating,
  error,
  submitting,
  onClose,
  onSubmit,
}) {
  const documents = internship?.internship_documents || [];
  const isCompletion = stage === "completion";

  const missingDocuments = getMissingDocuments(error);
  const isDocumentError = missingDocuments.length > 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-3 sm:p-6">
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="internship-review-title"
        className="flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
      >
        <header className="flex items-start justify-between gap-4 border-b border-slate-100 p-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">
              {isCompletion
                ? "Completion verification"
                : "Initial verification"}
            </p>

            <h2
              id="internship-review-title"
              className="mt-1 text-lg font-bold text-slate-900"
            >
              Review internship submission
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {internship?.companyName ||
                "Loading submission details"}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={submitting}
            aria-label="Close review"
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 disabled:opacity-50"
          >
            <X size={20} />
          </button>
        </header>

        <div className="flex-1 space-y-5 overflow-y-auto p-5">
          {loading ? (
            <div className="space-y-3">
              <div className="h-16 animate-pulse rounded-xl bg-slate-100" />
              <div className="h-32 animate-pulse rounded-xl bg-slate-100" />
            </div>
          ) : !internship ? (
            <p className="text-sm text-slate-500">
              No submission details available.
            </p>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <DetailBox
                  label="Internship title"
                  value={internship.internshipTitle}
                />

                <DetailBox
                  label="Company"
                  value={internship.companyName}
                />

                <DetailBox
                  label="Start date"
                  value={dateText(internship.startDate)}
                />

                <DetailBox
                  label="End date"
                  value={dateText(internship.endDate)}
                />

                <DetailBox
                  label="Location"
                  value={internship.location}
                />

                <DetailBox
                  label="Mode"
                  value={internship.mode}
                />
              </div>

              {internship.description && (
                <div>
                  <h3 className="text-sm font-semibold text-slate-800">
                    Description
                  </h3>

                  <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-slate-600">
                    {internship.description}
                  </p>
                </div>
              )}

              <div>
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-sm font-semibold text-slate-800">
                    Documents
                  </h3>

                  <span className="text-xs text-slate-500">
                    {documents.length} uploaded
                  </span>
                </div>

                {documents.length ? (
                  <div className="mt-3 space-y-2">
                    {documents.map((document) => (
                      <a
                        key={document.id}
                        href={document.fileUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-3 rounded-xl border border-slate-200 p-3 hover:border-blue-300 hover:bg-blue-50"
                      >
                        <FileText
                          size={18}
                          className="shrink-0 text-blue-600"
                        />

                        <span className="min-w-0 flex-1">
                          <span className="block break-words text-sm font-medium text-slate-800">
                            {document.documentName ||
                              document.documentType}
                          </span>

                          <span className="mt-1 block text-xs text-slate-500">
                            {document.documentType} ·{" "}
                            {document.submissionStage}
                          </span>
                        </span>

                        <ExternalLink
                          size={15}
                          className="shrink-0 text-slate-400"
                        />
                      </a>
                    ))}
                  </div>
                ) : (
                  <p className="mt-2 rounded-lg bg-amber-50 p-3 text-sm text-amber-800">
                    No documents are attached to this submission.
                  </p>
                )}
              </div>

              <form
                id="internship-review-form"
                onSubmit={onSubmit}
                className="space-y-4 border-t border-slate-100 pt-5"
              >
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-800">
                    Decision
                  </label>

                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setDecision("APPROVED")}
                      className={`rounded-xl border px-4 py-3 text-sm font-semibold ${
                        decision === "APPROVED"
                          ? "border-emerald-300 bg-emerald-50 text-emerald-700"
                          : "border-slate-200 text-slate-600"
                      }`}
                    >
                      <Check size={16} className="mr-2 inline" />
                      Approve
                    </button>

                    <button
                      type="button"
                      onClick={() => setDecision("REJECTED")}
                      className={`rounded-xl border px-4 py-3 text-sm font-semibold ${
                        decision === "REJECTED"
                          ? "border-red-300 bg-red-50 text-red-700"
                          : "border-slate-200 text-slate-600"
                      }`}
                    >
                      <X size={16} className="mr-2 inline" />
                      Reject
                    </button>
                  </div>
                </div>

                {isCompletion && decision === "APPROVED" && (
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-800">
                      Mentor rating
                    </label>

                    <div className="flex items-center gap-3">
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((value) => (
                          <button
                            key={value}
                            type="button"
                            onClick={() => setRating(value)}
                            aria-label={`Rate ${value} out of 5`}
                            className="rounded p-1"
                          >
                            <Star
                              size={23}
                              className={
                                value <= rating
                                  ? "text-amber-400"
                                  : "text-slate-300"
                              }
                              fill={
                                value <= rating
                                  ? "currentColor"
                                  : "none"
                              }
                            />
                          </button>
                        ))}
                      </div>

                      <span className="text-sm font-semibold text-slate-700">
                        {rating} / 5
                      </span>
                    </div>
                  </div>
                )}

                <div>
                  <label
                    htmlFor="internship-review-remarks"
                    className="mb-2 block text-sm font-semibold text-slate-800"
                  >
                    Mentor remarks{" "}
                    {decision === "REJECTED"
                      ? "(required)"
                      : "(optional)"}
                  </label>

                  <textarea
                    id="internship-review-remarks"
                    value={remarks}
                    onChange={(event) =>
                      setRemarks(event.target.value)
                    }
                    rows={3}
                    required={decision === "REJECTED"}
                    placeholder={
                      decision === "REJECTED"
                        ? "Explain what needs correction before resubmission..."
                        : "Add feedback for the student..."
                    }
                    className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              </form>
            </>
          )}

          {/* Improved error feedback */}
          {error && (
            <div
              role="alert"
              aria-live="polite"
              className={`flex items-start gap-3 rounded-xl border p-4 text-sm ${
                isDocumentError
                  ? "border-amber-200 bg-amber-50 text-amber-900"
                  : "border-red-200 bg-red-50 text-red-800"
              }`}
            >
              <div
                className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                  isDocumentError
                    ? "bg-amber-100 text-amber-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                <AlertCircle size={19} />
              </div>

              <div className="min-w-0 flex-1">
                <p className="font-semibold">
                  {isDocumentError
                    ? "Documents need attention"
                    : "Unable to complete this review"}
                </p>

                {isDocumentError ? (
                  <>
                    <p className="mt-1 leading-5">
                      This submission is missing required documents.
                      Please make sure the following files have been
                      uploaded before approving it:
                    </p>

                    <ul className="mt-2 list-inside list-disc space-y-1">
                      {missingDocuments.map((document) => (
                        <li key={document}>{document}</li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <p className="mt-1 break-words leading-5">
                    {error}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        <footer className="flex flex-wrap justify-end gap-2 border-t border-slate-100 p-4">
          <button
            type="button"
            onClick={onClose}
            disabled={submitting}
            className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            form="internship-review-form"
            disabled={loading || !internship || submitting}
            className={`inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-50 ${
              decision === "REJECTED"
                ? "bg-red-600 hover:bg-red-700"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {submitting && (
              <RefreshCw
                size={15}
                className="animate-spin"
              />
            )}

            {submitting
              ? "Submitting..."
              : decision === "APPROVED"
                ? "Confirm Approval"
                : "Confirm Rejection"}
          </button>
        </footer>
      </section>
    </div>
  );
}

/* =========================================================
   REUSABLE DETAIL COMPONENTS
========================================================= */

function DetailBox({ label, value }) {
  return (
    <div className="rounded-xl bg-slate-50 p-3">
      <p className="text-xs text-slate-500">{label}</p>

      <p className="mt-1 break-words text-sm font-medium text-slate-800">
        {value || "Not specified"}
      </p>
    </div>
  );
}

function InfoLine({ icon: Icon, label, children }) {
  return (
    <div className="flex items-start gap-2">
      <Icon
        size={15}
        className="mt-0.5 shrink-0 text-slate-400"
      />

      <div className="min-w-0">
        <span className="text-xs text-slate-500">
          {label}:{" "}
        </span>

        <span className="break-words text-sm font-medium text-slate-700">
          {children}
        </span>
      </div>
    </div>
  );
}

export default Internships;