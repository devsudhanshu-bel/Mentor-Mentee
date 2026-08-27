import React from "react";

const typeStyles = {
  PDF: "bg-red-100 text-red-700",
  DOC: "bg-blue-100 text-blue-700",
  DOCX: "bg-blue-100 text-blue-700",
  XLS: "bg-green-100 text-green-700",
  XLSX: "bg-green-100 text-green-700",
  PPT: "bg-orange-100 text-orange-700",
  PPTX: "bg-orange-100 text-orange-700",
  ZIP: "bg-amber-100 text-amber-700",
  JPG: "bg-violet-100 text-violet-700",
  JPEG: "bg-violet-100 text-violet-700",
  PNG: "bg-violet-100 text-violet-700",
};

const FileTypeBadge = ({ type }) => {
  const badge =
    typeStyles[type?.toUpperCase()] ||
    "bg-slate-100 text-slate-700";

  return (
    <span
      className={`inline-flex items-center rounded-md px-2 py-1 text-[10px] font-semibold ${badge}`}
    >
      {type?.toUpperCase()}
    </span>
  );
};

export default FileTypeBadge;