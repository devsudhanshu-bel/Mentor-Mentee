import React from "react";
import { ArrowRight, X } from "lucide-react";

const AssignmentFooter = ({
  selectedStudents,
  selectedMentor,
  setSelectedStudents,
  onAssign,
}) => {
  const studentCount = selectedStudents.length;

  const disabled =
    studentCount === 0 || selectedMentor === null;

  const removeStudent = (studentId) => {
    if (!setSelectedStudents) return;

    setSelectedStudents((previous) =>
      previous.filter((student) => {
        const id =
          typeof student === "object"
            ? student.id
            : student;

        return id !== studentId;
      })
    );
  };

  return (
    <div
      className="
        mx-5
        mb-5
        flex
        min-h-[84px]
        items-center
        justify-between
        gap-6
        rounded-xl
        border
        border-slate-200
        bg-white
        px-4
        py-3
        shadow-sm
      "
    >
      {/* ============================================================
          LEFT SECTION
          ============================================================ */}

      <div className="min-w-[180px]">
        <p className="text-[13px] font-semibold text-slate-800">
          {studentCount} Student
          {studentCount !== 1 && "s"} Selected
        </p>

        <p className="mt-0.5 text-[10px] text-slate-500">
          Choose a mentor to assign the selected students.
        </p>
      </div>

      {/* ============================================================
          SELECTED STUDENTS
          ============================================================ */}

      <div className="flex flex-1 items-center gap-3 overflow-x-auto">
        {selectedStudents.map((student, index) => {
          const studentId =
            typeof student === "object"
              ? student.id
              : student;

          const studentName =
            typeof student === "object"
              ? student.name ||
                student.fullName ||
                "Student"
              : "Student";

          const registerNumber =
            typeof student === "object"
              ? student.registerNumber ||
                student.regNo ||
                student.registerNo ||
                ""
              : "";

          const initials = studentName
            .split(" ")
            .filter(Boolean)
            .slice(0, 2)
            .map((name) => name[0])
            .join("")
            .toUpperCase();

          return (
            <div
              key={studentId ?? index}
              className="
                flex
                h-12
                min-w-[128px]
                max-w-[160px]
                items-center
                gap-2.5
                rounded-lg
                border
                border-slate-200
                bg-white
                px-3
              "
            >
              {/* Avatar */}

              <div
                className="
                  flex
                  h-7
                  w-7
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  bg-blue-50
                  text-[10px]
                  font-bold
                  text-blue-600
                "
              >
                {initials || "S"}
              </div>

              {/* Student Information */}

              <div className="min-w-0 flex-1">
                <p
                  className="
                    truncate
                    text-[10px]
                    font-semibold
                    text-slate-700
                  "
                >
                  {studentName}
                </p>

                <p
                  className="
                    truncate
                    text-[9px]
                    font-medium
                    text-slate-400
                  "
                >
                  {registerNumber}
                </p>
              </div>

              {/* Remove */}

              <button
                type="button"
                onClick={() => removeStudent(studentId)}
                className="
                  flex
                  h-5
                  w-5
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  text-slate-400
                  transition
                  hover:bg-slate-100
                  hover:text-slate-600
                "
                aria-label={`Remove ${studentName}`}
              >
                <X size={13} strokeWidth={2} />
              </button>
            </div>
          );
        })}
      </div>

      {/* ============================================================
          ASSIGN BUTTON
          ============================================================ */}

      <button
        type="button"
        onClick={onAssign}
        disabled={disabled}
        className={`
          flex
          h-11
          min-w-[190px]
          shrink-0
          items-center
          justify-center
          gap-3
          rounded-lg
          px-5
          text-[12px]
          font-semibold
          transition-all
          duration-200
          ${
            disabled
              ? "cursor-not-allowed bg-slate-200 text-slate-400"
              : "bg-blue-600 text-white shadow-sm hover:bg-blue-700 hover:shadow-md"
          }
        `}
      >
        <span>Assign to Selected Mentor</span>

        <ArrowRight
          size={16}
          strokeWidth={2.5}
        />
      </button>
    </div>
  );
};

export default AssignmentFooter;