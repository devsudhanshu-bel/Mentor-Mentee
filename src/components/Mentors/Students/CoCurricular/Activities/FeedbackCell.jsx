import React from "react";
import { Star } from "lucide-react";

const FeedbackCell = ({ feedback }) => {
  if (!feedback) {
    return (
      <span className="text-[11px] text-slate-400">
        -
      </span>
    );
  }

  return (
    <div className="flex items-start gap-1.5 max-w-[170px]">
      <Star
        size={11}
        className="mt-0.5 shrink-0 fill-amber-400 text-amber-400"
      />

      <p className="text-[10px] leading-4 text-slate-600">
        {feedback}
      </p>
    </div>
  );
};

export default FeedbackCell;