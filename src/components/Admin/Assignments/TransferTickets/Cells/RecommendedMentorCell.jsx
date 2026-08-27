import React from "react";

const RecommendedMentorCell = ({ mentor }) => {
  return (
    <div className="min-w-0">
      <p className="truncate text-sm font-semibold leading-5 text-slate-900">
        {mentor.name}
      </p>

      {mentor.department && (
        <p className="truncate text-[11px] leading-4 text-slate-500">
          {mentor.department}
        </p>
      )}
    </div>
  );
};

export default RecommendedMentorCell;