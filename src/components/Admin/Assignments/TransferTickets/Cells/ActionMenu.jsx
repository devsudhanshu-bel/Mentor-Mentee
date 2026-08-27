import React from "react";
import { MoreVertical } from "lucide-react";

const ActionMenu = () => {
  return (
    <button
      className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white transition-colors hover:bg-slate-50"
    >
      <MoreVertical
        size={16}
        className="text-slate-600"
      />
    </button>
  );
};

export default ActionMenu;