import React from "react";
import {
  FileText,
  FileSpreadsheet,
  FileArchive,
  FileImage,
  FileCode2,
  FileVideo,
  FileAudio,
} from "lucide-react";

const fileConfig = {
  PDF: {
    icon: FileText,
    bg: "bg-red-100",
    color: "text-red-600",
  },

  DOC: {
    icon: FileText,
    bg: "bg-blue-100",
    color: "text-blue-600",
  },

  DOCX: {
    icon: FileText,
    bg: "bg-blue-100",
    color: "text-blue-600",
  },

  XLS: {
    icon: FileSpreadsheet,
    bg: "bg-green-100",
    color: "text-green-600",
  },

  XLSX: {
    icon: FileSpreadsheet,
    bg: "bg-green-100",
    color: "text-green-600",
  },

  CSV: {
    icon: FileSpreadsheet,
    bg: "bg-green-100",
    color: "text-green-600",
  },

  PPT: {
    icon: FileCode2,
    bg: "bg-orange-100",
    color: "text-orange-600",
  },

  PPTX: {
    icon: FileCode2,
    bg: "bg-orange-100",
    color: "text-orange-600",
  },

  ZIP: {
    icon: FileArchive,
    bg: "bg-amber-100",
    color: "text-amber-600",
  },

  RAR: {
    icon: FileArchive,
    bg: "bg-amber-100",
    color: "text-amber-600",
  },

  "7Z": {
    icon: FileArchive,
    bg: "bg-amber-100",
    color: "text-amber-600",
  },

  JPG: {
    icon: FileImage,
    bg: "bg-violet-100",
    color: "text-violet-600",
  },

  JPEG: {
    icon: FileImage,
    bg: "bg-violet-100",
    color: "text-violet-600",
  },

  PNG: {
    icon: FileImage,
    bg: "bg-violet-100",
    color: "text-violet-600",
  },

  WEBP: {
    icon: FileImage,
    bg: "bg-violet-100",
    color: "text-violet-600",
  },

  GIF: {
    icon: FileImage,
    bg: "bg-violet-100",
    color: "text-violet-600",
  },

  SVG: {
    icon: FileCode2,
    bg: "bg-violet-100",
    color: "text-violet-600",
  },

  MP4: {
    icon: FileVideo,
    bg: "bg-pink-100",
    color: "text-pink-600",
  },

  MOV: {
    icon: FileVideo,
    bg: "bg-pink-100",
    color: "text-pink-600",
  },

  MP3: {
    icon: FileAudio,
    bg: "bg-cyan-100",
    color: "text-cyan-600",
  },

  WAV: {
    icon: FileAudio,
    bg: "bg-cyan-100",
    color: "text-cyan-600",
  },

  TXT: {
    icon: FileText,
    bg: "bg-slate-100",
    color: "text-slate-600",
  },

  JSON: {
    icon: FileCode2,
    bg: "bg-slate-100",
    color: "text-slate-600",
  },

  HTML: {
    icon: FileCode2,
    bg: "bg-orange-100",
    color: "text-orange-600",
  },
};

const FileIcon = ({ type }) => {
  const normalizedType = String(type || "")
    .split("/")
    .pop()
    .split(".")
    .pop()
    .split(";")[0]
    .trim()
    .toUpperCase();

  const config = fileConfig[normalizedType] || {
    icon: FileText,
    bg: "bg-slate-100",
    color: "text-slate-600",
  };

  const Icon = config.icon;

  return (
    <div
      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${config.bg}`}
    >
      <Icon
        size={18}
        className={config.color}
        strokeWidth={2}
      />
    </div>
  );
};

export default FileIcon;