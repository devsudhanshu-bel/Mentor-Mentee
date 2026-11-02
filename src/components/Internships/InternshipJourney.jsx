
import React from "react";
import { Check, Circle, Clock3 } from "lucide-react";

const InternshipJourney = ({ internship }) => {
  const status = internship?.status;
  const initial = internship?.verificationStatus;
  const completion = internship?.completionVerificationStatus;

  const steps = [
    {
      label: "Details Submitted",
      description: "Internship created",
      complete: Boolean(internship?.id),
      rejected: false,
    },
    {
      label: "Mentor Verification",
      description:
        initial === "REJECTED"
          ? "Changes required"
          : initial === "APPROVED"
            ? "Approved"
            : "Awaiting review",
      complete: initial === "APPROVED",
      rejected: initial === "REJECTED",
      pending: initial === "PENDING",
    },
    {
      label: "Ongoing",
      description:
        status === "ONGOING" ? "Current stage" : "Internship in progress",
      complete:
        status === "ONGOING" ||
        status === "PENDING_COMPLETION_VERIFICATION" ||
        status === "COMPLETED",
      rejected: false,
    },
    {
      label: "Completion Review",
      description:
        completion === "REJECTED"
          ? "Changes required"
          : completion === "APPROVED"
            ? "Approved"
            : completion === "PENDING"
              ? "Awaiting review"
              : "Not submitted",
      complete: completion === "APPROVED",
      rejected: completion === "REJECTED",
      pending: completion === "PENDING",
    },
    {
      label: "Completed",
      description:
        status === "COMPLETED" &&
        initial === "APPROVED" &&
        completion === "APPROVED"
          ? "Verified"
          : "Not completed",
      complete:
        status === "COMPLETED" &&
        initial === "APPROVED" &&
        completion === "APPROVED",
      rejected: false,
    },
  ];

  return (
    <section className="w-full min-w-0 rounded-xl border border-slate-100 bg-slate-50/70 p-3 sm:p-4">
      {/* Header */}
      <div className="min-w-0">
        <h3 className="font-semibold text-slate-900">
          Internship Journey
        </h3>

        <p className="mt-1 text-xs leading-5 text-slate-500">
          Track your progress from submission to completion.
        </p>
      </div>

      {/* Journey steps */}
      <div className="mt-6 grid min-w-0 grid-cols-2 gap-x-2 gap-y-6 sm:grid-cols-3 sm:gap-x-3 xl:grid-cols-5">
        {steps.map((step, index) => (
          <div
            key={step.label}
            className={`relative flex min-w-0 flex-col items-center text-center ${
              index === 4 ? "col-span-2 sm:col-span-1" : ""
            }`}
          >
            {/* Connecting line */}
            {index < steps.length - 1 && (
              <div
                className={`absolute left-[calc(50%+17px)] top-4 hidden h-0.5 ${
                  step.complete ? "bg-green-500" : "bg-slate-200"
                } ${
                  index === 1
                    ? "sm:block sm:w-[calc(100%-20px)] xl:w-[calc(100%-8px)]"
                    : index === 2
                      ? "xl:block xl:w-[calc(100%-8px)]"
                      : index === 0
                        ? "sm:block sm:w-[calc(100%-20px)] xl:w-[calc(100%-8px)]"
                        : "sm:block sm:w-[calc(100%-20px)]"
                }`}
              />
            )}

            {/* Status icon */}
            <div
              className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 ${
                step.rejected
                  ? "border-red-500 bg-red-50 text-red-600"
                  : step.complete
                    ? "border-green-500 bg-green-500 text-white"
                    : step.pending
                      ? "border-amber-400 bg-amber-50 text-amber-600"
                      : "border-slate-300 bg-white text-slate-400"
              }`}
            >
              {step.rejected ? (
                <span className="text-sm font-bold">!</span>
              ) : step.complete ? (
                <Check size={16} />
              ) : step.pending ? (
                <Clock3 size={15} />
              ) : (
                <Circle size={13} />
              )}
            </div>

            {/* Step details */}
            <p
              className={`mt-3 max-w-full break-words text-xs font-semibold leading-5 ${
                step.rejected
                  ? "text-red-700"
                  : step.complete
                    ? "text-green-700"
                    : step.pending
                      ? "text-amber-700"
                      : "text-slate-600"
              }`}
            >
              {step.label}
            </p>

            <p className="mt-1 max-w-full break-words text-[11px] leading-4 text-slate-400">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default InternshipJourney;
