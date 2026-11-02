
import React from "react";
import { UploadCloud } from "lucide-react";

const UploadAchievementCard = ({ onUploadClick }) => {
  return (
    <div className="w-full min-w-0 rounded-xl border-2 border-dashed border-blue-300 bg-white p-4 text-center sm:p-6">
      {/* ICON */}

      <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-blue-50 sm:mb-4 sm:h-12 sm:w-12">
        <UploadCloud
          size={22}
          className="text-blue-600"
        />
      </div>

      {/* TITLE */}

      <h2 className="break-words text-xl font-semibold text-slate-800 sm:text-2xl">
        Add New Achievement
      </h2>

      {/* DESCRIPTION */}

      <p className="mt-2 break-words text-xs leading-5 text-slate-500">
        Share your achievement with a certificate or proof.
      </p>

      {/* UPLOAD BUTTON */}

      <button
        type="button"
        onClick={onUploadClick}
        className="mt-5 h-10 w-full rounded-md bg-blue-600 px-5 text-sm font-medium text-white transition hover:bg-blue-700 sm:w-auto"
      >
        Upload Achievement
      </button>

      {/* SUPPORTED FORMATS */}

      <p className="mt-4 break-words text-xs leading-5 text-slate-500">
        Supports: PDF, JPG, PNG (Max. 5MB)
      </p>
    </div>
  );
};

export default UploadAchievementCard;
