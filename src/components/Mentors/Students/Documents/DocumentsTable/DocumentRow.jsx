import React from "react";
import { CalendarDays, HardDrive } from "lucide-react";

import FileIcon from "./FileIcon";
import CategoryBadge from "./CategoryBadge";
import FileTypeBadge from "./FileTypeBadge";
import TableActions from "./TableActions";

const DocumentRow = ({ document }) => {
  return (
    <tr className="border-b border-slate-100 transition-colors hover:bg-slate-50">
      {/* ================= Document ================= */}

      <td className="px-4 py-2.5">
        <div className="flex items-center gap-2.5">
          <FileIcon type={document.type} />

          <div className="min-w-0">
            <h4 className="text-[10px] font-semibold leading-5 text-slate-800">
              {document.name}
            </h4>

            <p className="mt-0.5 text-[9px] leading-4 text-slate-500">
              {document.description}
            </p>
          </div>
        </div>
      </td>

      {/* ================= Category ================= */}

      <td className="px-4 py-2.5">
        <CategoryBadge category={document.category} />
      </td>

      {/* ================= File Type ================= */}

      <td className="px-4 py-2.5">
        <FileTypeBadge type={document.type} />
      </td>

      {/* ================= Upload Date ================= */}

      <td className="px-4 py-2.5">
        <div className="flex items-center gap-1.5">
          <CalendarDays
            size={11}
            className="shrink-0 text-slate-400"
          />

          <span className="text-[9px] leading-4 text-slate-600">
            {document.uploadedOn}
          </span>
        </div>
      </td>

      {/* ================= File Size ================= */}

      <td className="px-4 py-2.5">
        <div className="flex items-center gap-1.5">
          <HardDrive
            size={11}
            className="shrink-0 text-slate-400"
          />

          <span className="text-[9px] leading-4 text-slate-600">
            {document.size}
          </span>
        </div>
      </td>

      {/* ================= Actions ================= */}

      <td className="px-4 py-2.5 text-right">
        <TableActions
          onView={() => console.log("View", document.id)}
          onDownload={() => console.log("Download", document.id)}
        />
      </td>
    </tr>
  );
};

export default DocumentRow;