import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Award,
  BadgeCheck,
  GraduationCap,
  ChevronRight,
} from "lucide-react";

const getCertificateIcon = (index) => {
  const icons = [
    {
      icon: GraduationCap,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      icon: Award,
      iconBg: "bg-amber-100",
      iconColor: "text-amber-600",
    },
    {
      icon: BadgeCheck,
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-600",
    },
  ];

  return icons[index % icons.length];
};

const CertificatesOverview = ({ certificates = [] }) => {
  const navigate = useNavigate();
  const { id } = useParams();

  const handleViewAll = () => {
    if (id) {
      navigate(`/mentor/students/${id}/certificates`);
    }
  };

  const displayedCertificates = Array.isArray(certificates)
    ? certificates.slice(0, 3)
    : [];

  return (
    <div className="flex h-full flex-col rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      {/* ================= Header ================= */}
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-[14px] font-semibold text-slate-800">
          Certificates
        </h3>

        <button
          type="button"
          onClick={handleViewAll}
          className="text-[11px] font-medium text-blue-600 transition hover:text-blue-700"
        >
          View All
        </button>
      </div>

      {/* ================= Certificates ================= */}
      <div className="flex-1 space-y-3">
        {displayedCertificates.length > 0 ? (
          displayedCertificates.map((certificate, index) => {
            const {
              icon: Icon,
              iconBg,
              iconColor,
            } = getCertificateIcon(index);

            return (
              <div
                key={certificate.id}
                className="flex items-start gap-3"
              >
                <div
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${iconBg}`}
                >
                  <Icon
                    size={16}
                    className={iconColor}
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <h4 className="truncate text-[12px] font-semibold text-slate-800">
                    {certificate.documentName || "Untitled Certificate"}
                  </h4>

                  <p className="mt-1 text-[10px] text-slate-500">
                    {certificate.description || "Certificate"}
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <div className="flex min-h-24 items-center justify-center">
            <p className="text-center text-xs text-slate-500">
              No certificates available.
            </p>
          </div>
        )}
      </div>

      {/* ================= Footer ================= */}
      <button
        type="button"
        onClick={handleViewAll}
        className="mt-4 flex items-center gap-1 text-[11px] font-medium text-blue-600 transition hover:text-blue-700"
      >
        View All Certificates
        <ChevronRight size={14} />
      </button>
    </div>
  );
};

export default CertificatesOverview;