import React from "react";
import { FileText } from "lucide-react";

const badgeColor = (value) => {
  if (value >= 95) {
    return "bg-green-100 text-green-700";
  }

  if (value >= 90) {
    return "bg-emerald-100 text-emerald-700";
  }

  if (value >= 75) {
    return "bg-yellow-100 text-orange-700";
  }

  return "bg-red-100 text-red-700";
};

const SubjectAttendance = ({ attendanceData }) => {
  const subjects = attendanceData?.subjects || [];

  return (
    <div
      className="
      bg-white
      border
      border-slate-200
      rounded-2xl
      shadow-sm
      p-3.5
    "
    >
      {/* Heading */}

      <h3
        className="
        text-[14px]
        font-semibold
        text-blue-600
        mb-3
      "
      >
        Subject-wise Attendance
      </h3>

      {/* Empty */}

      {subjects.length === 0 ? (
        <div
          className="
          h-[180px]
          flex
          items-center
          justify-center
          border
          border-slate-200
          rounded-lg
          text-[12px]
          text-slate-400
        "
        >
          No attendance entered for this semester yet.
        </div>
      ) : (
        <>
          {/* Table */}

          <div
            className="
            overflow-hidden
            rounded-lg
            border
            border-slate-200
          "
          >
            <table
              className="
              w-full
            "
            >
              <thead
                className="
                bg-slate-50
              "
              >
                <tr
                  className="
                  text-[11px]
                  text-slate-600
                "
                >
                  <th
                    className="
                    py-2
                    px-2
                    text-center
                    w-8
                  "
                  >
                    #
                  </th>

                  <th
                    className="
                    py-2
                    px-3
                    text-left
                  "
                  >
                    Subject Code
                  </th>

                  <th
                    className="
                    py-2
                    px-3
                    text-left
                  "
                  >
                    Subject Name
                  </th>

                  <th
                    className="
                    py-2
                    px-3
                    text-center
                  "
                  >
                    Classes Held
                  </th>

                  <th
                    className="
                    py-2
                    px-3
                    text-center
                  "
                  >
                    Classes Attended
                  </th>

                  <th
                    className="
                    py-2
                    px-3
                    text-center
                  "
                  >
                    Attendance
                  </th>
                </tr>
              </thead>

              <tbody>
                {subjects.map((subject, index) => {
                  const percentage = Number(subject.percentage) || 0;

                  return (
                    <tr
                      key={subject.id || subject.courseCode || index}
                      className="
                          border-t
                          border-slate-100
                          hover:bg-slate-50
                          transition
                        "
                    >
                      <td
                        className="
                          py-2
                          text-center
                          text-[11px]
                          text-slate-500
                        "
                      >
                        {index + 1}
                      </td>

                      <td
                        className="
                          px-3
                          text-[11px]
                          font-medium
                          text-[#142970]
                        "
                      >
                        {subject.courseCode || "—"}
                      </td>

                      <td
                        className="
                          px-3
                          text-[11px]
                          text-slate-700
                        "
                      >
                        {subject.subjectName}
                      </td>

                      <td
                        className="
                          text-center
                          text-[11px]
                          text-slate-700
                        "
                      >
                        {subject.classesHeld}
                      </td>

                      <td
                        className="
                          text-center
                          text-[11px]
                          text-slate-700
                        "
                      >
                        {subject.classesAttended}
                      </td>

                      <td
                        className="
                          text-center
                        "
                      >
                        <span
                          className={`
                              inline-block
                              min-w-[52px]
                              rounded-full
                              px-2
                              py-0.5
                              text-[10px]
                              font-semibold
                              ${badgeColor(percentage)}
                            `}
                        >
                          {percentage.toFixed(2)}%
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Button */}

          <div
            className="
            flex
            justify-center
            mt-2
          "
          >
            <button
              type="button"
              className="
                flex
                items-center
                gap-2
                rounded-lg
                border
                border-blue-300
                px-5
                py-1.5
                text-[12px]
                font-medium
                text-blue-600
                transition
                hover:bg-blue-50
              "
            >
              <FileText size={14} />
              View Detailed Report
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default SubjectAttendance;
