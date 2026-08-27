import React from "react";
import { Loader2, Save, X } from "lucide-react";

const SaveFooter = ({
  loading = false,
  onClose,
  onSave,
}) => {
  return (
    <div className="flex items-center justify-end gap-3 border-t border-slate-200 bg-slate-50 px-6 py-4">
      {/* Cancel */}

      <button
        type="button"
        onClick={onClose}
        disabled={loading}
        className="
          flex items-center gap-2
          rounded-lg
          border border-slate-300
          bg-white
          px-4 py-2
          text-[13px]
          font-medium
          text-slate-700
          transition
          hover:bg-slate-100
          disabled:cursor-not-allowed
          disabled:opacity-60
        "
      >
        <X size={15} />

        Cancel
      </button>

      {/* Save */}

      <button
        type="button"
        onClick={onSave}
        disabled={loading}
        className="
          flex items-center gap-2
          rounded-lg
          bg-blue-600
          px-5 py-2
          text-[13px]
          font-medium
          text-white
          transition
          hover:bg-blue-700
          disabled:cursor-not-allowed
          disabled:bg-blue-400
        "
      >
        {loading ? (
          <>
            <Loader2
              size={15}
              className="animate-spin"
            />
            Saving...
          </>
        ) : (
          <>
            <Save size={15} />
            Save Changes
          </>
        )}
      </button>
    </div>
  );
};

export default SaveFooter;