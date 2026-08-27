import React from "react";
import {
  Award,
  BadgeCheck,
  GraduationCap,
  ChevronRight,
} from "lucide-react";

const certificates = [
  {
    id: 1,
    title: "Python for Everybody",
    issuer: "Coursera",
    icon: GraduationCap,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    id: 2,
    title: "Data Structures & Algorithms",
    issuer: "Udemy",
    icon: Award,
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600",
  },
  {
    id: 3,
    title: "AWS Cloud Practitioner",
    issuer: "Amazon Web Services",
    icon: BadgeCheck,
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
  },
];

const CertificatesOverview = () => {
  return (
    <div className="flex h-full flex-col rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      {/* ================= Header ================= */}
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-[14px] font-semibold text-slate-800">
          Certificates
        </h3>

        <button className="text-[11px] font-medium text-blue-600 transition hover:text-blue-700">
          View All
        </button>
      </div>

      {/* ================= Certificates ================= */}
      <div className="flex-1 space-y-3">
        {certificates.map((certificate) => {
          const Icon = certificate.icon;

          return (
            <div
              key={certificate.id}
              className="flex items-start gap-3"
            >
              <div
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${certificate.iconBg}`}
              >
                <Icon
                  size={16}
                  className={certificate.iconColor}
                />
              </div>

              <div className="min-w-0 flex-1">
                <h4 className="truncate text-[12px] font-semibold text-slate-800">
                  {certificate.title}
                </h4>

                <p className="mt-1 text-[10px] text-slate-500">
                  {certificate.issuer}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* ================= Footer ================= */}
      <button className="mt-4 flex items-center gap-1 text-[11px] font-medium text-blue-600 transition hover:text-blue-700">
        View All Certificates
        <ChevronRight size={14} />
      </button>
    </div>
  );
};

export default CertificatesOverview;