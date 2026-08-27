import React from "react";

const RequesterCell = ({ requester }) => {
  return (
    <div className="flex items-center gap-2">
      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-700">
        {requester.initials}
      </div>

      <div className="min-w-0">
        <p className="truncate text-sm font-semibold leading-5 text-slate-900">
          {requester.name}
        </p>

        <p className="truncate text-[11px] leading-4 text-slate-500">
          {requester.subtitle}
        </p>
      </div>
    </div>
  );
};

export default RequesterCell;