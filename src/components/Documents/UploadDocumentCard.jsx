import React from "react";
import { UploadCloud } from "lucide-react";

const UploadDocumentCard = ({ onUploadClick }) => {
  return (
    <div className="bg-white rounded-xl border-2 border-dashed border-blue-300 shadow-sm p-6 text-center">

      {/* ICON */}

      <div className="w-14 h-14 mx-auto rounded-full bg-blue-50 flex items-center justify-center mb-5">
        <UploadCloud
          size={28}
          className="text-blue-600"
        />
      </div>

      {/* TITLE */}

      <h2 className="text-2xl font-semibold text-slate-800">
        Upload New Document
      </h2>

      {/* DESCRIPTION */}

      <p className="text-sm text-slate-500 mt-2">
        Drag and drop your file here, or click to browse.
      </p>

      {/* BUTTON */}

      <button
        type="button"
        onClick={onUploadClick}
        className="
          mt-6
          h-11
          px-6
          rounded-lg
          bg-blue-600
          hover:bg-blue-700
          text-white
          text-sm
          font-medium
          transition
        "
      >
        Choose File
      </button>

      {/* FOOTER */}

      <p className="text-xs text-slate-500 mt-5 leading-5">
        Supports: PDF, DOC, DOCX, XLS, XLSX,
        <br />
        PPT, ZIP, JPG, PNG (Max. 20MB)
      </p>

    </div>
  );
};

export default UploadDocumentCard;