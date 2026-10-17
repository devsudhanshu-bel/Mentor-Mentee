
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
    <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-5">
      {stats.map(({ label, value, hint, Icon, color }) => (
        <article
          key={label}
          className="flex min-w-0 items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
        >
          <div
            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${styles[color]}`}
          >
            <Icon size={22} />
          </div>

          <div className="min-w-0">
            <p className="text-xs font-medium text-slate-500">{label}</p>
            <p className="mt-1 text-2xl font-bold text-slate-900">{value}</p>
            <p className="mt-1 truncate text-xs text-slate-400">{hint}</p>
          </div>
        </article>
      ))}
    </section>
  );
};

export default InternshipStats;
