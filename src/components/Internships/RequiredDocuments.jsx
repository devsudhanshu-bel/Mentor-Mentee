
import React from "react";
import {
  FileText,
  FileCheck2,
  Clock3,
  AlertCircle,
  CheckCircle2,
  Files,
} from "lucide-react";

const DOCUMENTS = [
  {
    type: "OFFER_LETTER",
    label: "Offer Letter",
    stage: "INITIAL",
    required: true,
  },
  {
    type: "COMPLETION_CERTIFICATE",
    label: "Completion Certificate",
    stage: "COMPLETION",
    required: true,
  },
  {
    type: "COMPLETION_LETTER",
    label: "Completion Letter",
    stage: "COMPLETION",
    required: true,
  },
  {
    type: "FINAL_REPORT",
    label: "Final Report",
    stage: "COMPLETION",
    required: true,
  },
];

const RequiredDocuments = ({ internship }) => {
  if (!internship) {
    return (
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
            <Files size={21} />
          </div>
          <div>
            <h2 className="font-semibold text-slate-900">
              Required Documents
            </h2>
            <p className="text-xs text-slate-500">Document checklist</p>
          </div>
        </div>

        <p className="mt-5 text-sm leading-6 text-slate-500">
          Create an internship record to view its document requirements.
        </p>
      </section>
    );
  }

  const isCompletedType = internship.internshipType === "ALREADY_COMPLETED";
  const isOngoing = internship.status === "ONGOING";
  const isInitialPending =
    internship.status === "PENDING_INITIAL_VERIFICATION";

  const documents = DOCUMENTS.filter((document) => {
    if (document.type === "OFFER_LETTER") return true;

    if (isCompletedType) return true;

    return (
      document.stage === "COMPLETION" &&
      (isOngoing ||
        internship.status === "PENDING_COMPLETION_VERIFICATION" ||
        internship.status === "COMPLETED")
    );
  });

  const uploadedDocuments = internship.internship_documents || [];

  const getDocument = (type) => {
    const expectedStage = isCompletedType ? "INITIAL" : "COMPLETION";

    return uploadedDocuments.find(
      (document) =>
        document.documentType === type &&
        (type === "OFFER_LETTER"
          ? document.submissionStage === "INITIAL"
          : document.submissionStage === expectedStage)
    );
  };

  const getStatus = (documentType) => {
    const document = getDocument(documentType.type);

    if (document) {
      return {
        label: "Uploaded",
        color: "text-green-700 bg-green-50",
        Icon: CheckCircle2,
      };
    }

    if (documentType.type === "OFFER_LETTER" && !isInitialPending) {
      return {
        label: "Missing",
        color: "text-red-700 bg-red-50",
        Icon: AlertCircle,
      };
    }

    if (documentType.stage === "COMPLETION" && isOngoing) {
      return {
        label: "Required",
        color: "text-amber-700 bg-amber-50",
        Icon: Clock3,
      };
    }

    return {
      label: "Not uploaded",
      color: "text-slate-500 bg-slate-100",
      Icon: FileText,
    };
  };

  const uploadedCount = documents.filter(
    (document) => getDocument(document.type)
  ).length;

  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <header className="flex items-center justify-between gap-3 border-b border-slate-100 px-5 py-4">
        <div>
          <h2 className="font-semibold text-slate-900">
            Required Documents
          </h2>
          <p className="mt-1 text-xs text-slate-500">
            Track your submitted files
          </p>
        </div>

        <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
          <FileCheck2 size={20} />
        </div>
      </header>

      <div className="p-4">
        <div className="mb-4">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-500">Documents uploaded</span>
            <span className="font-semibold text-slate-700">
              {uploadedCount} / {documents.length}
            </span>
          </div>

          <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-blue-600 transition-all"
              style={{
                width: `${
                  documents.length
                    ? (uploadedCount / documents.length) * 100
                    : 0
                }%`,
              }}
            />
          </div>
        </div>

        <div className="space-y-3">
          {documents.map((documentType) => {
            const document = getDocument(documentType.type);
            const status = getStatus(documentType);
            const StatusIcon = status.Icon;

            return (
              <div
                key={documentType.type}
                className="flex items-start gap-3 rounded-xl border border-slate-100 p-3"
              >
                <div className="rounded-lg bg-slate-50 p-2 text-slate-500">
                  <FileText size={18} />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="break-words text-sm font-medium text-slate-800">
                    {documentType.label}
                  </p>

                  {document?.documentName && (
                    <p className="mt-1 truncate text-xs text-slate-400">
                      {document.documentName}
                    </p>
                  )}

                  <span
                    className={`mt-2 inline-flex items-center gap-1 rounded-full px-2 py-1 text-[11px] font-medium ${status.color}`}
                  >
                    <StatusIcon size={12} />
                    {status.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <p className="mt-4 text-xs leading-5 text-slate-400">
          Upload and replace documents from your internship details. Uploaded
          does not necessarily mean verified.
        </p>
      </div>
    </section>
  );
};

export default RequiredDocuments;
