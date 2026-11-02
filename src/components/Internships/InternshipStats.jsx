
import React from "react";
import {
  BriefcaseBusiness,
  Building2,
  CircleCheck,
  Clock3,
  Flag,
} from "lucide-react";

const InternshipStats = ({ internships = [] }) => {
  const stats = [
    {
      label: "Total Internships",
      value: internships.length,
      hint: "All internship records",
      Icon: BriefcaseBusiness,
      color: "blue",
    },
    {
      label: "Ongoing Internship",
      value: internships.filter((item) => item.status === "ONGOING").length,
      hint: "Currently pursuing",
      Icon: Building2,
      color: "green",
    },
    {
      label: "Completed Internships",
      value: internships.filter(
        (item) =>
          item.status === "COMPLETED" &&
          item.verificationStatus === "APPROVED" &&
          item.completionVerificationStatus === "APPROVED"
      ).length,
      hint: "Successfully verified",
      Icon: CircleCheck,
      color: "purple",
    },
    {
      label: "Pending Verification",
      value: internships.filter(
        (item) =>
          item.verificationStatus === "PENDING" ||
          item.completionVerificationStatus === "PENDING"
      ).length,
      hint: "Awaiting mentor review",
      Icon: Clock3,
      color: "amber",
    },
    {
      label: "Action Required",
      value: internships.filter(
        (item) =>
          item.verificationStatus === "REJECTED" ||
          item.completionVerificationStatus === "REJECTED"
      ).length,
      hint: "Review mentor feedback",
      Icon: Flag,
      color: "red",
    },
  ];

  const styles = {
    blue: "bg-blue-50 text-blue-600",
    green: "bg-green-50 text-green-600",
    purple: "bg-purple-50 text-purple-600",
    amber: "bg-amber-50 text-amber-600",
    red: "bg-red-50 text-red-600",
  };

  return (
    <section className="grid w-full min-w-0 grid-cols-2 gap-3 xl:grid-cols-5">
      {stats.map(({ label, value, hint, Icon, color }, index) => (
        <article
          key={label}
          className={`flex min-w-0 items-center gap-2 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md sm:gap-3 sm:p-4 ${
            index === 4
              ? "col-span-2 mx-auto w-1/2 xl:col-span-1 xl:mx-0 xl:w-full"
              : ""
          }`}
        >
          <div
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl sm:h-12 sm:w-12 sm:rounded-2xl ${styles[color]}`}
          >
            <Icon size={20} className="sm:hidden" />
            <Icon size={22} className="hidden sm:block" />
          </div>

          <div className="min-w-0 flex-1">
            <p className="break-words text-xs font-medium leading-snug text-slate-500 sm:text-sm">
              {label}
            </p>

            <p className="mt-1 text-xl font-bold leading-tight text-slate-900 sm:text-2xl">
              {value}
            </p>

            <p className="mt-1 truncate text-[11px] text-slate-400 sm:text-xs">
              {hint}
            </p>
          </div>
        </article>
      ))}
    </section>
  );
};

export default InternshipStats;
