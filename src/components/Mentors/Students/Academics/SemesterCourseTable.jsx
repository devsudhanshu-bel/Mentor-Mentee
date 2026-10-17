
import React, { useMemo, useState } from "react";

const getCourseStatus = (subject) => {
  const grade = String(subject?.grade ?? "").trim().toUpperCase();

  if (["F", "N", "AB", "U"].includes(grade)) {
    return "Backlog";
  }

  if (grade) {
    return "Completed";
  }

  return "In Progress";
};

const getGradePoint = (subject) => {
  const value = subject?.gradePoint;

  return value === null || value === undefined || value === ""
    ? "—"
    : Number(value).toFixed(1);
};

const getCourseCategory = (subject) => {
  return (
    subject?.category ??
    subject?.courseCategory ??
    subject?.type ??
    "—"
  );
};

const SemesterCourseTable = ({
  semesterNumber = 1,
  semesterData = null,
  loading = false,
  error = "",
}) => {
  const [showAll, setShowAll] = useState(false);

  const courses = useMemo(() => {
    const subjects =
      semesterData?.subjects ??
      semesterData?.courses ??
      semesterData?.data?.subjects ??
      [];

    return subjects.map((subject, index) => ({
      id: subject.id ?? subject.courseCode ?? index,
      code: subject.courseCode ?? subject.code ?? "—",
      title: subject.courseName ?? subject.title ?? subject.name ?? "Unnamed course",
      category: getCourseCategory(subject),
      credits: Number(subject.credits ?? 0),
      grade: subject.grade || "—",
      points: getGradePoint(subject),
      status: getCourseStatus(subject),
    }));
  }, [semesterData]);

  const visibleCourses = showAll ? courses : courses.slice(0, 6);

  const formatSemester = (number) => {
    const romanNumerals = [
      "I",
      "II",
      "III",
      "IV",
      "V",
      "VI",
      "VII",
      "VIII",
    ];

    return romanNumerals[number - 1] ?? number;
  };

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      {/* Header */}
      <div className="mb-3 flex items-center justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold text-[#0B3B8F]">
            Semester {formatSemester(semesterNumber)} - Course Details
          </h3>

          <p className="mt-1 text-[11px] text-slate-500">
            Academic performance and course-wise grades
          </p>
        </div>

        {courses.length > 6 && (
          <button
            type="button"
            onClick={() => setShowAll((previous) => !previous)}
            className="shrink-0 text-xs font-medium text-[#0B63F6] transition hover:text-blue-800"
          >
            {showAll ? "Show Less" : "View All"}
          </button>
        )}
      </div>

      {/* Error */}
      {error && (
        <div
          role="alert"
          className="mb-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700"
        >
          {error}
        </div>
      )}

      {/* Loading */}
      {loading ? (
        <div className="space-y-3 py-3">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="h-10 animate-pulse rounded-md bg-slate-100"
            />
          ))}
        </div>
      ) : courses.length === 0 ? (
        <div className="rounded-lg border border-dashed border-slate-200 px-4 py-10 text-center">
          <p className="text-sm font-medium text-slate-700">
            No course records available
          </p>
          <p className="mt-1 text-xs text-slate-500">
            Course details have not been entered for this semester yet.
          </p>
        </div>
      ) : (
        <>
          {/* Course Table */}
          <div className="overflow-x-auto rounded-lg border border-slate-100">
            <div className="min-w-[720px]">
              {/* Table Header */}
              <div className="grid grid-cols-[90px_minmax(180px,2fr)_minmax(90px,1fr)_65px_65px_95px_100px] items-center bg-slate-50 px-3 py-3">
                {[
                  "Code",
                  "Course",
                  "Category",
                  "Credits",
                  "Grade",
                  "Grade Point",
                  "Status",
                ].map((heading, index) => (
                  <div
                    key={heading}
                    className={`text-[11px] font-medium text-slate-500 ${
                      index >= 3 ? "text-center" : "text-left"
                    }`}
                  >
                    {heading}
                  </div>
                ))}
              </div>

              {/* Table Rows */}
              {visibleCourses.map((course) => (
                <div
                  key={course.id}
                  className="grid grid-cols-[90px_minmax(180px,2fr)_minmax(90px,1fr)_65px_65px_95px_100px] items-center border-t border-slate-100 px-3 py-3 transition-colors hover:bg-slate-50/70"
                >
                  <div className="break-words pr-2 text-[11px] font-medium text-[#0B63F6]">
                    {course.code}
                  </div>

                  <div className="pr-3 text-xs leading-5 text-slate-700">
                    {course.title}
                  </div>

                  <div className="text-xs text-slate-500">
                    {course.category}
                  </div>

                  <div className="text-center text-xs font-medium tabular-nums text-slate-700">
                    {course.credits}
                  </div>

                  <div className="text-center">
                    <span className="text-xs font-semibold text-[#0B3B8F]">
                      {course.grade}
                    </span>
                  </div>

                  <div className="text-center">
                    <span className="text-xs font-semibold tabular-nums text-slate-700">
                      {course.points}
                    </span>
                  </div>

                  <div className="flex justify-center">
                    <span
                      className={`inline-flex whitespace-nowrap rounded-full px-2.5 py-1 text-[10px] font-medium ${
                        course.status === "Completed"
                          ? "bg-emerald-100 text-emerald-700"
                          : course.status === "Backlog"
                            ? "bg-red-100 text-red-700"
                            : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {course.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <p className="mt-3 text-[11px] text-slate-500">
            Showing{" "}
            <span className="font-medium text-slate-700">
              {visibleCourses.length}
            </span>{" "}
            of{" "}
            <span className="font-medium text-slate-700">
              {courses.length}
            </span>{" "}
            courses
          </p>
        </>
      )}
    </section>
  );
};

export default SemesterCourseTable;
