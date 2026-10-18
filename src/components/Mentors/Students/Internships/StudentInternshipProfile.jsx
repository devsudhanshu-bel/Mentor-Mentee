
import React, { useEffect, useState } from "react";

import {
  UserRound,
  Building2,
  BadgeCheck,
  BriefcaseBusiness,
  Star,
  CalendarDays,
} from "lucide-react";

/* ==========================================================
   HELPERS
========================================================== */

const getInitials = (name) =>
  String(name || "Student")
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("") || "ST";

const formatValue = (value, fallback = "Not available") =>
  value !== null &&
  value !== undefined &&
  String(value).trim() !== ""
    ? value
    : fallback;

const formatDate = (date) => {
  if (!date) return null;

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return null;
  }

  return parsedDate.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

/* ==========================================================
   PROFILE IMAGE RESOLVER
========================================================== */

const getProfileImage = (student) => {
  const possibleImages = [
    student?.profileImage,
    student?.profile?.profileImage,
    student?.student_profiles?.profileImage,
    student?.studentProfile?.profileImage,
    student?.profilePicture,
    student?.avatar,
    student?.imageUrl,
  ];

  const image = possibleImages.find(
    (value) =>
      typeof value === "string" &&
      value.trim().length > 0
  );

  return image ? image.trim() : null;
};

/* ==========================================================
   DETAIL ROW
========================================================== */

const DetailRow = ({ icon: Icon, label, value, color }) => (
  <div className="flex items-start gap-3 border-b border-slate-100 py-4 last:border-0">
    <div
      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
        color || "bg-blue-50 text-blue-600"
      }`}
    >
      <Icon size={16} strokeWidth={1.8} />
    </div>

    <div className="min-w-0 flex-1 pt-0.5">
      <p className="text-[11px] leading-4 text-slate-400">
        {label}
      </p>

      <p className="mt-1 break-words text-[13px] font-medium leading-5 text-slate-800">
        {formatValue(value)}
      </p>
    </div>
  </div>
);

/* ==========================================================
   STUDENT INTERNSHIP PROFILE
========================================================== */

const StudentInternshipProfile = ({
  student,
  internships = [],
}) => {
  const [imageFailed, setImageFailed] = useState(false);

  /* ==========================================================
     STUDENT DETAILS
  ========================================================== */

  const studentName =
    student?.fullName ||
    student?.name ||
    [student?.firstName, student?.lastName]
      .filter(Boolean)
      .join(" ") ||
    "Student";

  const registerNumber =
    student?.registerNumber ||
    student?.registrationNumber ||
    student?.rollNumber ||
    "";

  const studentId = student?.id || student?.studentId || "";

  const profileImage = getProfileImage(student);

  /* ==========================================================
     RESET IMAGE ERROR WHEN STUDENT OR URL CHANGES
  ========================================================== */

  useEffect(() => {
    setImageFailed(false);
  }, [profileImage, studentId, registerNumber]);

  /* ==========================================================
     INTERNSHIP DATA
  ========================================================== */

  const safeInternships = Array.isArray(internships)
    ? internships
    : [];

  const currentInternship = safeInternships.find(
    (item) =>
      item?.status === "ONGOING" ||
      item?.status === "PENDING_INITIAL_VERIFICATION" ||
      item?.status === "PENDING_COMPLETION_VERIFICATION"
  );

  const completedInternships = safeInternships.filter(
    (item) =>
      item?.status === "COMPLETED" &&
      item?.verificationStatus === "APPROVED" &&
      item?.completionVerificationStatus === "APPROVED"
  );

  /* ==========================================================
     MENTOR RATINGS
  ========================================================== */

  const ratedInternships = completedInternships.filter(
    (item) =>
      item?.rating !== null &&
      item?.rating !== undefined &&
      item?.rating !== "" &&
      Number.isFinite(Number(item.rating))
  );

  const averageRating = ratedInternships.length
    ? (
        ratedInternships.reduce(
          (total, item) => total + Number(item.rating),
          0
        ) / ratedInternships.length
      ).toFixed(1)
    : null;

  /* ==========================================================
     CURRENT INTERNSHIP STATUS
  ========================================================== */

  const isActive = currentInternship?.status === "ONGOING";

  const internshipStatus = isActive
    ? "Internship Active"
    : currentInternship
      ? "Internship Under Review"
      : "No Active Internship";

  /* ==========================================================
     RENDER
  ========================================================== */

  return (
    <aside className="flex h-full min-h-[972px] flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      {/* PROFILE HEADER */}
      <div className="flex flex-col items-center border-b border-slate-100 px-4 py-6 text-center">
        {profileImage && !imageFailed ? (
          <img
            key={`${studentId}-${profileImage}`}
            src={profileImage}
            alt={`${studentName}'s profile`}
            className="h-20 w-20 rounded-full border-4 border-blue-100 object-cover"
            referrerPolicy="no-referrer"
            onError={() => {
              console.error(
                "Internship profile image failed to load.",
                {
                  studentId,
                  registerNumber,
                  profileImage,
                }
              );

              setImageFailed(true);
            }}
          />
        ) : (
          <div className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-blue-100 bg-blue-50 text-xl font-semibold text-blue-700">
            {getInitials(studentName)}
          </div>
        )}

        <h2 className="mt-4 break-words text-center text-[15px] font-semibold leading-5 text-slate-900">
          {studentName}
        </h2>

        <p className="mt-1 text-xs text-slate-500">
          Student Internship Profile
        </p>

        <span
          className={`mt-3 inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-[10px] font-semibold ${
            isActive
              ? "bg-emerald-100 text-emerald-700"
              : currentInternship
                ? "bg-amber-100 text-amber-700"
                : "bg-slate-100 text-slate-600"
          }`}
        >
          <UserRound size={12} />
          {internshipStatus}
        </span>
      </div>

      {/* INTERNSHIP OVERVIEW */}
      <div className="flex-1 p-4">
        <section>
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-400">
            Internship Overview
          </p>

          <div>
            <DetailRow
              icon={Building2}
              label="Current Company"
              value={currentInternship?.companyName}
            />

            <DetailRow
              icon={BriefcaseBusiness}
              label="Current Role"
              value={currentInternship?.internshipTitle}
            />

            <DetailRow
              icon={BadgeCheck}
              label="Verified Internships Completed"
              value={completedInternships.length}
              color="bg-emerald-50 text-emerald-600"
            />

            <DetailRow
              icon={Star}
              label="Average Mentor Rating"
              value={
                averageRating !== null
                  ? `${averageRating} / 5`
                  : "Not rated yet"
              }
              color="bg-amber-50 text-amber-600"
            />

            <DetailRow
              icon={CalendarDays}
              label="Internship Start Date"
              value={formatDate(currentInternship?.startDate)}
              color="bg-blue-50 text-blue-600"
            />
          </div>
        </section>
      </div>

      {/* FOOTER */}
      <div className="mt-auto border-t border-slate-100 bg-slate-50 px-4 py-4">
        <p className="text-[11px] leading-5 text-slate-500">
          Internship details and completion counts reflect
          the records supplied to this profile.
        </p>
      </div>
    </aside>
  );
};

export default StudentInternshipProfile;
