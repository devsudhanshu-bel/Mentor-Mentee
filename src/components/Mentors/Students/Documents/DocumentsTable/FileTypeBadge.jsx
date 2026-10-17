import React from "react";

const typeStyles = {
  PDF: "bg-red-100 text-red-700",

  DOC: "bg-blue-100 text-blue-700",
  DOCX: "bg-blue-100 text-blue-700",

  XLS: "bg-green-100 text-green-700",
  XLSX: "bg-green-100 text-green-700",
  CSV: "bg-green-100 text-green-700",

  PPT: "bg-orange-100 text-orange-700",
  PPTX: "bg-orange-100 text-orange-700",

  ZIP: "bg-amber-100 text-amber-700",
  RAR: "bg-amber-100 text-amber-700",
  "7Z": "bg-amber-100 text-amber-700",

  JPG: "bg-violet-100 text-violet-700",
  JPEG: "bg-violet-100 text-violet-700",
  PNG: "bg-violet-100 text-violet-700",
  WEBP: "bg-violet-100 text-violet-700",
  GIF: "bg-violet-100 text-violet-700",
  SVG: "bg-violet-100 text-violet-700",

  MP4: "bg-pink-100 text-pink-700",
  MOV: "bg-pink-100 text-pink-700",

  MP3: "bg-cyan-100 text-cyan-700",
  WAV: "bg-cyan-100 text-cyan-700",

  TXT: "bg-slate-100 text-slate-700",
  JSON: "bg-slate-100 text-slate-700",
  HTML: "bg-orange-100 text-orange-700",
};

const getFileType = (type) => {
  if (!type) return "";

  const value = String(type).trim().toUpperCase();

  // Handle MIME types such as application/pdf or image/png.
  const mimeTypes = {
    "APPLICATION/PDF": "PDF",
    "APPLICATION/MSWORD": "DOC",
    "APPLICATION/VND.OPENXMLFORMATS-OFFICEDOCUMENT.WORDPROCESSINGML.DOCUMENT":
      "DOCX",
    "APPLICATION/VND.MS-EXCEL": "XLS",
    "APPLICATION/VND.OPENXMLFORMATS-OFFICEDOCUMENT.SPREADSHEETML.SHEET":
      "XLSX",
    "APPLICATION/VND.MS-POWERPOINT": "PPT",
    "APPLICATION/VND.OPENXMLFORMATS-OFFICEDOCUMENT.PRESENTATIONML.PRESENTATION":
      "PPTX",
    "TEXT/CSV": "CSV",
    "TEXT/PLAIN": "TXT",
    "TEXT/HTML": "HTML",
    "APPLICATION/JSON": "JSON",
    "IMAGE/JPEG": "JPEG",
    "IMAGE/PNG": "PNG",
    "IMAGE/WEBP": "WEBP",
    "IMAGE/GIF": "GIF",
    "IMAGE/SVG+XML": "SVG",
    "VIDEO/MP4": "MP4",
    "VIDEO/QUICKTIME": "MOV",
    "AUDIO/MPEG": "MP3",
    "AUDIO/WAV": "WAV",
    "APPLICATION/ZIP": "ZIP",
    "APPLICATION/X-ZIP-COMPRESSED": "ZIP",
    "APPLICATION/VND.RAR": "RAR",
    "APPLICATION/X-7Z-COMPRESSED": "7Z",
  };

  if (mimeTypes[value]) {
    return mimeTypes[value];
  }

  // Handle file names such as certificate.pdf.
  const lastPart = value.split("/").pop().split(";")[0].trim();
  const extension = lastPart.includes(".")
    ? lastPart.split(".").pop()
    : lastPart;

  return extension;
};

const FileTypeBadge = ({ type }) => {
  const normalizedType = getFileType(type);

  const badge =
    typeStyles[normalizedType] || "bg-slate-100 text-slate-700";

  return (
    <span
      className={`inline-flex items-center rounded-md px-2 py-1 text-[10px] font-semibold ${badge}`}
    >
      {normalizedType || "FILE"}
    </span>
  );
};

export default FileTypeBadge;