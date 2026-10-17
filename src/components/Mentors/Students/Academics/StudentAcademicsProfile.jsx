import React from "react";
import {
  BookOpen,
  FileText,
  ShieldCheck,
  UserRound,
  GraduationCap,
  CalendarDays,
  Hash,
  UserCheck,
} from "lucide-react";

const StudentAcademicsProfile = ({ student, mentor }) => {
  // Support common API response field names.
  const studentName =
    student?.fullName ||
    student?.studentName ||
    student?.name ||
    student?.user?.fullName ||
    student?.user?.name ||
    "Student";

  const registerNumber =
    student?.registerNumber ||
    student?.registrationNumber ||
    student?.regNo ||
    student?.rollNumber ||
    "Not available";

  const programme =
    student?.programme ||
    student?.program ||
    student?.course ||
    student?.department?.name ||
    "Not available";

  const semester =
    student?.semester ??
    student?.currentSemester ??
    student?.current_semester ??
    "Not available";

  const mentorName =
    (typeof mentor === "string" ? mentor : null) ||
    mentor?.fullName ||
    mentor?.mentorName ||
    mentor?.name ||
    mentor?.user?.fullName ||
    mentor?.user?.name ||
    student?.mentor?.fullName ||
    student?.assignedMentor?.fullName ||
    "Not available";

  const profileImage =
    student?.profileImage ||
    student?.profilePicture ||
    student?.profilePhoto ||
    student?.avatar ||
    student?.user?.profileImage ||
    null;

  const getInitials = (name) =>
    name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part.charAt(0).toUpperCase())
      .join("") || "ST";

  const InfoRow = ({ icon: Icon, label, children, color }) => (
    <div className="flex items-start gap-2.5">
      <div
        className={`rounded-md p-1.5 ${
          color || "bg-slate-50 text-slate-500"
        }`}
      >
        <Icon size={15} strokeWidth={1.8} />
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-[11px] leading-4 text-slate-400">
          {label}
        </p>

        <p className="mt-0.5 break-words text-[13px] font-medium leading-[18px] text-slate-800">
          {children}
        </p>
      </div>
    </div>
  );

  return (
    <aside className="h-fit overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      {/* PROFILE HEADER */}
      <div className="flex flex-col items-center border-b border-slate-100 px-4 py-4 text-center">
        {profileImage ? (
          <img
            src={profileImage}
            alt={`${studentName}'s profile`}
            className="h-16 w-16 rounded-full border-2 border-blue-50 object-cover"
          />
        ) : (
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 text-lg font-semibold text-blue-700">
            {getInitials(studentName)}
          </div>
        )}

        <h2 className="mt-3 break-words text-[15px] font-semibold leading-5 text-slate-900">
          {studentName}
        </h2>

        <p className="mt-1 text-xs text-slate-500">
          Student Academic Profile
        </p>

        <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-1 text-[10px] font-semibold text-blue-700">
          <UserRound size={11} />
          Mentee
        </span>
      </div>

      {/* STUDENT INFORMATION */}
      <div className="space-y-4 p-4">
        <section>
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            Student Information
          </p>

          <div className="space-y-3.5">
            <InfoRow icon={Hash} label="Register Number">
              {registerNumber}
            </InfoRow>

            <InfoRow icon={GraduationCap} label="Programme">
              {programme}
            </InfoRow>

            <InfoRow icon={CalendarDays} label="Current Semester">
              {semester}
            </InfoRow>
          </div>
        </section>

        {/* ACADEMICS OVERVIEW */}
        <section className="border-t border-slate-100 pt-4">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            Academics Overview
          </p>

          <div className="space-y-3.5">
            <InfoRow
              icon={FileText}
              label="Academic Records"
              color="bg-blue-50 text-blue-600"
            >
              Semester-wise Academic Performance
            </InfoRow>

            <InfoRow
              icon={ShieldCheck}
              label="Review Process"
              color="bg-green-50 text-green-600"
            >
              Mentor Review
            </InfoRow>
          </div>
        </section>

        {/* ASSIGNED MENTOR */}
        <section className="border-t border-slate-100 pt-4">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            Assigned Mentor
          </p>

          <InfoRow
            icon={UserCheck}
            label="Mentor Name"
            color="bg-violet-50 text-violet-600"
          >
            {mentorName}
          </InfoRow>
        </section>
      </div>

      {/* FOOTER */}
      <div className="border-t border-slate-100 bg-slate-50 px-4 py-2.5">
        <div className="flex items-start gap-2 text-[11px] leading-4 text-slate-500">
          <BookOpen
            size={13}
            className="mt-0.5 shrink-0 text-blue-600"
          />

          <span>
            Academic performance is monitored to support the student's
            progress throughout the semester.
          </span>
        </div>
      </div>
    </aside>
  );
};

export default StudentAcademicsProfile;