import React from "react";
import {
  BadgeCheck,
  User,
  Building2,
  Brain,
  GraduationCap,
  MapPin,
  Mail,
  Phone,
  Clock3,
} from "lucide-react";

const ProfessionalInformation = ({ mentor }) => {
  if (!mentor) {
    return (
      <div className="min-h-[600px] rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="flex h-full items-center justify-center p-8">
          <p className="text-sm text-slate-500">
            No professional information available.
          </p>
        </div>
      </div>
    );
  }

  const info = [
    {
      icon: BadgeCheck,
      label: "Employee ID",
      value: mentor.employeeId,
    },
    {
      icon: User,
      label: "Designation",
      value: mentor.designation,
    },
    {
      icon: Building2,
      label: "Department",
      value: mentor.department,
    },
    {
      icon: Brain,
      label: "Specialization",
      value: mentor.specialization,
    },
    {
      icon: GraduationCap,
      label: "Qualification",
      value: mentor.qualification,
    },
    {
      icon: MapPin,
      label: "Office",
      value: mentor.office || "Not Available",
    },
    {
      icon: Mail,
      label: "Email",
      value: mentor.email,
      blue: true,
    },
    {
      icon: Phone,
      label: "Phone",
      value: mentor.phone || "Not Available",
    },
    {
      icon: Clock3,
      label: "Office Hours",
      value: mentor.officeHours || "Not Available",
    },
  ];

  return (
    <div className="min-h-[600px] rounded-xl border border-slate-200 bg-white shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-2 border-b border-slate-100 p-4">
        <BadgeCheck
          size={16}
          className="text-blue-600"
        />

        <h2 className="text-[16px] font-semibold text-slate-900">
          Professional Information
        </h2>
      </div>

      {/* Content */}
      <div className="space-y-4 p-4">
        {info.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              key={index}
              className="grid grid-cols-[18px_140px_1fr] items-center gap-3"
            >
              <Icon
                size={15}
                className="text-slate-500"
              />

              <span className="text-[12px] font-medium text-slate-600">
                {item.label}
              </span>

              <span
                className={`break-words text-[12px] ${
                  item.blue
                    ? "font-medium text-blue-600"
                    : "text-slate-800"
                }`}
              >
                {item.value || "Not Available"}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProfessionalInformation;