import React from "react";
import { ChevronLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

const AdminBackButton = () => {
  const navigate = useNavigate();
  const { mentorId } = useParams();

  return (
    <button
      onClick={() => navigate(`/admin/mentor/${mentorId}`)}
      className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-200 hover:text-slate-900"
    >
      <ChevronLeft size={18} />
      <span>Back to Mentor</span>
    </button>
  );
};

export default AdminBackButton;