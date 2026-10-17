import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Users,
  Star,
  ChevronRight,
} from "lucide-react";

const CoCurricularOverview = ({ activities = [] }) => {
  const navigate = useNavigate();
  const { id } = useParams();

  const handleViewAll = () => {
    if (id) {
      navigate(`/mentor/students/${id}/co-curricular`);
    }
  };

  const displayedActivities = Array.isArray(activities)
    ? activities.slice(0, 3)
    : [];

  return (
    <div className="flex h-full flex-col rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      {/* ================= Header ================= */}
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-[14px] font-semibold text-slate-800">
          Co-Curricular Activities
        </h3>

        <button
          type="button"
          onClick={handleViewAll}
          className="text-[11px] font-medium text-blue-600 transition hover:text-blue-700"
        >
          View All
        </button>
      </div>

      {/* ================= Activities ================= */}
      <div className="flex-1 space-y-3">
        {displayedActivities.length > 0 ? (
          displayedActivities.map((activity, index) => {
            const Icon = index % 2 === 0 ? Users : Star;

            const iconBg =
              index % 2 === 0
                ? "bg-emerald-100"
                : "bg-orange-100";

            const iconColor =
              index % 2 === 0
                ? "text-emerald-600"
                : "text-orange-600";

            return (
              <div
                key={activity.id}
                className="flex items-start gap-3"
              >
                <div
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${iconBg}`}
                >
                  <Icon
                    size={16}
                    className={iconColor}
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <h4 className="truncate text-[12px] font-semibold text-slate-800">
                    {activity.documentName || "Untitled Activity"}
                  </h4>

                  <p className="mt-1 text-[10px] text-slate-500">
                    {activity.description || "Co-curricular activity"}
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <div className="flex min-h-24 items-center justify-center">
            <p className="text-center text-xs text-slate-500">
              No co-curricular activities available.
            </p>
          </div>
        )}
      </div>

      {/* ================= Footer ================= */}
      <button
        type="button"
        onClick={handleViewAll}
        className="mt-4 flex items-center gap-1 text-[11px] font-medium text-blue-600 transition hover:text-blue-700"
      >
        View All Activities
        <ChevronRight size={14} />
      </button>
    </div>
  );
};

export default CoCurricularOverview;