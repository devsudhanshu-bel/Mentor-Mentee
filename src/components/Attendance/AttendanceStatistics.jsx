import React from "react";
import { TrendingUp } from "lucide-react";

const StatCard = ({
  title,
  value,
  subtitle,
  valueColor,
  borderColor,
  iconColor,
}) => {
  return (
    <div
      className={`border ${borderColor} rounded-xl px-4 py-2.5 h-[66px] flex items-center justify-between`}
    >
      <div>
        <p className="text-[10px] font-medium text-slate-500">
          {title}
        </p>

        <h3 className={`text-[15px] font-bold mt-1 ${valueColor}`}>
          {value}
        </h3>

        {subtitle && (
          <p className="text-[10px] text-slate-500 leading-none mt-1">
            {subtitle}
          </p>
        )}
      </div>

      <TrendingUp
        size={22}
        strokeWidth={2}
        className={iconColor}
      />
    </div>
  );
};

const AttendanceStatistics = () => {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-4 h-[200px]">
      <h3 className="text-[14px] font-semibold text-blue-600 mb-3">
        Attendance Statistics
      </h3>

      <div className="grid grid-cols-2 gap-3">
        <StatCard
          title="This Month"
          value="93%"
          valueColor="text-blue-600"
          borderColor="border-slate-200"
          iconColor="text-blue-600"
        />

        <StatCard
          title="This Semester"
          value="94%"
          valueColor="text-[#142970]"
          borderColor="border-slate-200"
          iconColor="text-blue-600"
        />

        <StatCard
          title="Highest (Subject)"
          value="100%"
          subtitle="Mathematics"
          valueColor="text-emerald-600"
          borderColor="border-emerald-200"
          iconColor="text-emerald-500"
        />

        <StatCard
          title="Lowest (Subject)"
          value="88%"
          subtitle="Operating Systems"
          valueColor="text-orange-500"
          borderColor="border-orange-200"
          iconColor="text-orange-500"
        />
      </div>
    </div>
  );
};

export default AttendanceStatistics;