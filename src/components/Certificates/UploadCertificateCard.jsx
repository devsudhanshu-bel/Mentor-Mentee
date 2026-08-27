import React from "react";
import { UploadCloud } from "lucide-react";

const UploadCertificateCard = ({ onUploadClick }) => {
  return (
    <div className="bg-white rounded-xl border-2 border-dashed border-blue-300 p-6 text-center">

      <div className="w-12 h-12 mx-auto rounded-full bg-blue-50 flex items-center justify-center mb-4">

        <UploadCloud
          size={22}
          className="text-blue-600"
        />

      </div>

      <h2 className="text-2l font-semibold text-slate-800">
        Upload New Certificate
      </h2>

      <p className="text-xs text-slate-500 mt-2">
        Drag and drop your certificate here, or click to browse.
      </p>

      <button
        onClick={onUploadClick}
        className="mt-5 h-10 px-5 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition"
      >
        Choose File
      </button>

      <p className="text-xs text-slate-500 mt-4">
        Supports: PDF, JPG, PNG (Max. 5MB)
      </p>

    </div>
  );
};

export default UploadCertificateCard;