import React from "react";

const ReasonCell = ({ reason }) => {
  return (
    <p className="max-w-[150px] truncate text-[11px] leading-4 text-slate-700">
      {reason}
    </p>
  );
};

export default ReasonCell;