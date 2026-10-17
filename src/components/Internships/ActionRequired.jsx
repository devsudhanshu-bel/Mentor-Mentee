
import React from "react";
import { AlertTriangle, ArrowRight, FileUp } from "lucide-react";

const ActionRequired = ({ internships = [], onUpload }) => {
  const items = internships.flatMap((internship) => {
    const actions = [];
    const isAlreadyCompleted = internship.internshipType === "ALREADY_COMPLETED";

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
    <section className="overflow-hidden rounded-2xl border border-amber-200 bg-white shadow-sm">
      <div className="flex items-start gap-3 bg-amber-50 px-5 py-4">
        <div className="rounded-xl bg-amber-100 p-2.5 text-amber-700">
          <AlertTriangle size={21} />
        </div>

        <div>
          <h2 className="font-semibold text-amber-900">Action Required</h2>
          <p className="mt-1 text-sm text-amber-800">
            Review these items to keep your internship on track.
          </p>
        </div>
      </div>

      <div className="space-y-3 p-4">
        {items.map((item) => (
          <article
            key={item.id}
            className="flex flex-col justify-between gap-4 rounded-xl border border-slate-200 p-4 sm:flex-row sm:items-center"
          >
            <div className="flex min-w-0 items-start gap-3">
              <div className="rounded-lg bg-blue-50 p-2.5 text-blue-600">
                <FileUp size={19} />
              </div>

              <div className="min-w-0">
                <h3 className="font-semibold text-slate-800">{item.title}</h3>
                <p className="mt-1 text-sm leading-5 text-slate-500">
                  {item.message}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onUpload?.(item.internship)}
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
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
