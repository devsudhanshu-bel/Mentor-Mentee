import React from "react";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/mentor/students")}
      className="flex items-center gap-1.5 text-[13px] font-medium text-slate-600 transition hover:text-blue-600"
    >
      <ChevronLeft size={16} />
      Back to My Students
    </button>
  );
};

export default BackButton;