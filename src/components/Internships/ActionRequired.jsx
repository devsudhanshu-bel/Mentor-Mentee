
import React from "react";
import { AlertTriangle, ArrowRight, FileUp } from "lucide-react";

const ActionRequired = ({ internships = [], onUpload }) => {
  const items = internships.flatMap((internship) => {
    const actions = [];
    const isAlreadyCompleted =
      internship.internshipType === "ALREADY_COMPLETED";

    if (
      internship.verificationStatus === "REJECTED" ||
      internship.completionVerificationStatus === "REJECTED"
    ) {
      actions.push({
        id: `${internship.id}-feedback`,
        internship,
        title: internship.companyName || "Internship submission",
        message:
          internship.completionVerificationStatus === "REJECTED"
            ? internship.completionMentorRemark ||
              "Your completion submission needs attention."
            : internship.mentorRemark ||
              "Your initial submission needs attention.",
        button: "View Feedback",
      });

      return actions;
    }

    if (
      internship.status === "ONGOING" &&
      internship.completionVerificationStatus !== "APPROVED"
    ) {
      const docs = internship.internship_documents || [];

      const uploadedTypes = new Set(
        docs
          .filter((doc) => doc.submissionStage === "COMPLETION")
          .map((doc) => doc.documentType)
      );

      const required = [
        "COMPLETION_CERTIFICATE",
        "COMPLETION_LETTER",
        "FINAL_REPORT",
      ];

      const missing = required.filter((type) => !uploadedTypes.has(type));

      if (missing.length > 0) {
        actions.push({
          id: `${internship.id}-completion-docs`,
          internship,
          title: internship.companyName || "Internship",
          message: `Completion documents missing: ${missing
            .map((type) => type.replaceAll("_", " ").toLowerCase())
            .join(", ")}.`,
          button: "Upload Documents",
        });
      }
    }

    // Already-completed internships need their initial documents
    // before the mentor can move them into completion verification.
    if (
      isAlreadyCompleted &&
      internship.verificationStatus === "PENDING"
    ) {
      const docs = internship.internship_documents || [];

      const uploadedTypes = new Set(
        docs
          .filter((doc) => doc.submissionStage === "INITIAL")
          .map((doc) => doc.documentType)
      );

      const required = [
        "OFFER_LETTER",
        "COMPLETION_CERTIFICATE",
        "COMPLETION_LETTER",
        "FINAL_REPORT",
      ];

      const missing = required.filter((type) => !uploadedTypes.has(type));

      if (missing.length > 0) {
        actions.push({
          id: `${internship.id}-initial-docs`,
          internship,
          title: internship.companyName || "Internship",
          message: `Required documents missing: ${missing
            .map((type) => type.replaceAll("_", " ").toLowerCase())
            .join(", ")}.`,
          button: "Upload Documents",
        });
      }
    }

    return actions;
  });

  if (items.length === 0) return null;

  return (
    <section className="w-full min-w-0 overflow-hidden rounded-2xl border border-amber-200 bg-white shadow-sm">
      {/* Header */}
      <div className="flex min-w-0 items-start gap-3 bg-amber-50 px-3 py-4 sm:px-5">
        <div className="shrink-0 rounded-xl bg-amber-100 p-2.5 text-amber-700">
          <AlertTriangle size={21} />
        </div>

        <div className="min-w-0">
          <h2 className="font-semibold text-amber-900">
            Action Required
          </h2>

          <p className="mt-1 break-words text-sm leading-5 text-amber-800">
            Review these items to keep your internship on track.
          </p>
        </div>
      </div>

      {/* Action items */}
      <div className="space-y-3 p-3 sm:p-4">
        {items.map((item) => (
          <article
            key={item.id}
            className="flex min-w-0 flex-col justify-between gap-3 rounded-xl border border-slate-200 p-3 sm:gap-4 sm:p-4 md:flex-row md:items-center"
          >
            <div className="flex min-w-0 items-start gap-3">
              <div className="shrink-0 rounded-lg bg-blue-50 p-2.5 text-blue-600">
                <FileUp size={19} />
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="break-words text-sm font-semibold text-slate-800 sm:text-base">
                  {item.title}
                </h3>

                <p className="mt-1 break-words text-sm leading-5 text-slate-500">
                  {item.message}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onUpload?.(item.internship)}
              className="inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 md:w-auto"
            >
              {item.button}
              <ArrowRight size={16} />
            </button>
          </article>
        ))}
      </div>
    </section>
  );
};

export default ActionRequired;
