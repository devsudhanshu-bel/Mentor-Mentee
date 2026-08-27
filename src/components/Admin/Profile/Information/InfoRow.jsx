import React from "react";

const InfoRow = ({ label, value }) => {
  return (
    <div className="grid grid-cols-2 gap-3 py-1.5">
      <p className="text-[12px] font-medium text-slate-500">
        {label}
      </p>

      <p className="text-[13px] font-medium text-slate-700">
        {value}
      </p>
    </div>
  );
};

export default InfoRow;