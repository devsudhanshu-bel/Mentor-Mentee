import React from "react";
import { MoreVertical, CheckCircle2, Clock3 } from "lucide-react";

const CertificateCard = ({ certificate }) => {
  if (!certificate) return null;

  return (
    <div className="border border-slate-200 rounded-lg px-3 py-3 flex justify-between items-center hover:shadow-sm transition">

      <div className="flex gap-4 items-center">

        <img
          src={certificate.image}
          alt={certificate.title}
          className="w-24 h-14 rounded border object-cover"
        />

        <div>

          <h3 className="text-sm font-semibold text-slate-800">
            {certificate.title}
          </h3>

          <span className="inline-block mt-1 px-2 py-0.5 rounded bg-blue-50 text-blue-600 text-[10px]">
            {certificate.category}
          </span>

          <p className="text-xs text-slate-500 mt-1">
            {certificate.issuer}
          </p>

        </div>

      </div>

      <div className="flex items-center gap-6">

        <div className="text-right">

          {certificate.status === "Verified" ? (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-50 text-green-600 text-[11px]">
              <CheckCircle2 size={12} />
              Verified
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-orange-50 text-orange-600 text-[11px]">
              <Clock3 size={12} />
              Pending
            </span>
          )}

          <p className="text-xs text-slate-500 mt-2">
            {certificate.date}
          </p>

        </div>

        <button>
          <MoreVertical
            size={16}
            className="text-slate-500"
          />
        </button>

      </div>

    </div>
  );
};

export default CertificateCard;