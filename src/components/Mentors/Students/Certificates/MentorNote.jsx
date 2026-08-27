import React from "react";
import { Info } from "lucide-react";

const MentorNote = () => {
  return (
    <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4 shadow-sm">
      <div className="flex items-start gap-3">
        {/* Icon */}

        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100">
          <Info
            size={16}
            className="text-blue-600"
          />
        </div>

        {/* Content */}

        <div>
          <h3 className="text-[12px] font-semibold text-blue-900">
            Note to Mentor
          </h3>

          <p className="mt-1 text-[11px] leading-6 text-blue-700">
            Review the student's certificates to assess technical skills,
            professional development, and participation in academic or
            extracurricular activities. Verified certificates can be used to
            evaluate achievements and support personalized mentoring and career
            guidance.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MentorNote;