import React from "react";
import { Info } from "lucide-react";

const MentorNote = () => {
  return (
    <div className="rounded-2xl border border-blue-100 bg-blue-50 px-5 py-4 shadow-sm">
      <div className="flex items-start gap-3">
        <div className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
          <Info
            size={16}
            className="text-blue-600"
          />
        </div>

        <div className="flex-1">
          <h3 className="text-[12px] font-semibold text-blue-900">
            Note to Mentor
          </h3>

          <p className="mt-1 text-[11px] leading-6 text-blue-700">
            You can view and download all documents uploaded by the student.
            Use these documents to understand the student's academic progress,
            verify achievements, review internship and project submissions, and
            provide better guidance during mentoring sessions.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MentorNote;