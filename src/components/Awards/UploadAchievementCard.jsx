import React from "react";
import { UploadCloud } from "lucide-react";

const UploadAchievementCard = ({
  onUploadClick,
}) => {
  return (
    <div className="bg-white rounded-xl border-2 border-dashed border-blue-300 p-6 text-center">

      {/* ==================================================
          ICON
      ================================================== */}

      <div className="w-12 h-12 mx-auto rounded-full bg-blue-50 flex items-center justify-center mb-4">
        <UploadCloud
          size={22}
          className="text-blue-600"
        />
      </div>

      {/* ==================================================
          TITLE
      ================================================== */}

      <h2 className="text-2xl font-semibold text-slate-800">
        Add New Achievement
      </h2>

      {/* ==================================================
          DESCRIPTION
      ================================================== */}

      <p className="text-xs text-slate-500 mt-2">
        Share your achievement with a certificate or proof.
      </p>

      {/* ==================================================
          UPLOAD BUTTON
      ================================================== */}

      <button
        type="button"
        onClick={onUploadClick}
        className="mt-5 h-10 px-5 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition"
      >
        Upload Achievement
      </button>

      {/* ==================================================
          SUPPORTED FORMATS
      ================================================== */}

      <p className="text-xs text-slate-500 mt-4">
        Supports: PDF, JPG, PNG (Max. 5MB)
      </p>

    </div>
  );
};

export default UploadAchievementCard;