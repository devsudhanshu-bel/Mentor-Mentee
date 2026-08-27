import React from "react";
import { Building2, CalendarDays } from "lucide-react";

import CertificateThumbnail from "./CertificateThumbnail";
import CategoryBadge from "./CategoryBadge";
import StatusBadge from "./StatusBadge";
import TableActions from "./TableActions";

const CertificateRow = ({ certificate }) => {
  return (
    <tr className="border-b border-slate-100 transition-colors hover:bg-slate-50">
      {/* ================= Certificate ================= */}

      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          <CertificateThumbnail image={certificate.image} />

          <div className="min-w-0">
            <h4 className="text-[10px] font-semibold text-slate-800">
              {certificate.name}
            </h4>

            <p className="mt-0.5 text-[9px] text-slate-500">
              {certificate.description}
            </p>
          </div>
        </div>
      </td>

      {/* ================= Category ================= */}

      <td className="px-4 py-3">
        <CategoryBadge category={certificate.category} />
      </td>

      {/* ================= Issued By ================= */}

      <td className="px-4 py-3">
        <div className="flex items-center gap-1.5">
          <Building2
            size={11}
            className="text-slate-400"
          />

          <span className="text-[9px] text-slate-600">
            {certificate.issuedBy}
          </span>
        </div>
      </td>

      {/* ================= Date ================= */}

      <td className="px-4 py-3">
        <div className="flex items-center gap-1.5">
          <CalendarDays
            size={11}
            className="text-slate-400"
          />

          <span className="text-[9px] text-slate-600">
            {certificate.issuedOn}
          </span>
        </div>
      </td>

      {/* ================= Status ================= */}

      <td className="px-4 py-3">
        <StatusBadge status={certificate.status} />
      </td>

      {/* ================= Actions ================= */}

      <td className="px-4 py-3 text-right">
        <TableActions
          onView={() => console.log("View", certificate.id)}
          onDownload={() =>
            console.log("Download", certificate.id)
          }
        />
      </td>
    </tr>
  );
};

export default CertificateRow;