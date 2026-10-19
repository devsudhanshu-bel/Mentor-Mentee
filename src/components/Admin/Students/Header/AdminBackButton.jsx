import React from "react";
import { ChevronLeft } from "lucide-react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const AdminBackButton = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { mentorId } = useParams();
  const directAdminRoute = location.pathname.startsWith("/admin/overview/students/");

  return (
    <button
      type="button"
      onClick={() => navigate(directAdminRoute ? "/admin/students" : `/admin/mentor/${mentorId}`)}
      className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-200 hover:text-slate-900"
    >
      <ChevronLeft size={18} />
      <span>{directAdminRoute ? "Back to My Students" : "Back to Mentor"}</span>
    </button>
  );
};

export default AdminBackButton;
