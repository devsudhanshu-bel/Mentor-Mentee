import React from "react";
import {
  Download,
  Shuffle,
  Plus,
} from "lucide-react";

const AssignmentBanner = () => {
  return (
    <div className="mb-5 flex items-start justify-between">
      {/* ================= Left ================= */}

      <div>
        <h1 className="text-[34px] font-bold tracking-tight text-slate-900">
          Assignments
        </h1>

        <p className="mt-1 text-[15px] text-slate-500">
          Assign students to mentors and manage allocation across departments.
        </p>
      </div>

      {/* ================= Right ================= */}

      <div className="flex items-center gap-3">
        {/* Bulk Assign */}

        <button
          className="
            flex
            h-11
            items-center
            gap-2
            rounded-xl
            border
            border-blue-200
            bg-white
            px-5
            text-sm
            font-semibold
            text-blue-600
            transition-all
            duration-200
            hover:border-blue-600
            hover:bg-blue-50
          "
        >
          <Download size={17} />
          Bulk Assign
        </button>

        {/* Random Distribution */}

        <button
          className="
            flex
            h-11
            items-center
            gap-2
            rounded-xl
            border
            border-blue-200
            bg-white
            px-5
            text-sm
            font-semibold
            text-blue-600
            transition-all
            duration-200
            hover:border-blue-600
            hover:bg-blue-50
          "
        >
          <Shuffle size={17} />
          Random Distribution
        </button>

        {/* Assign Students */}

        <button
          className="
            flex
            h-11
            items-center
            gap-2
            rounded-xl
            bg-gradient-to-r
            from-blue-600
            to-indigo-600
            px-5
            text-sm
            font-semibold
            text-white
            shadow-lg
            shadow-blue-200
            transition-all
            duration-200
            hover:scale-[1.02]
            hover:shadow-xl
          "
        >
          <Plus size={18} />
          Assign Students
        </button>
      </div>
    </div>
  );
};

export default AssignmentBanner;