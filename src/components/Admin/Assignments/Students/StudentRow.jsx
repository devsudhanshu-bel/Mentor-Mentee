import React from "react";

const StudentRow = ({
  student,
  selectedStudents,
  toggleStudent,
}) => {
  const isSelected = selectedStudents.includes(student.id);

  return (
    <tr
      onClick={() => toggleStudent(student.id)}
      className={`cursor-pointer border-b border-slate-100 transition hover:bg-slate-50 ${
        isSelected ? "bg-blue-50" : ""
      }`}
    >
      <td className="px-4 py-3">
        <input
          type="checkbox"
          checked={isSelected}
          onClick={(e) => e.stopPropagation()}
          onChange={() => toggleStudent(student.id)}
          className="h-4 w-4 cursor-pointer accent-blue-600"
        />
      </td>

      <td className="py-3">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-700">
            {student.name.charAt(0)}
          </div>

          <div>
            <p className="text-[13px] font-semibold text-slate-800">
              {student.name}
            </p>

            <p className="text-[11px] text-slate-500">
              {student.email}
            </p>
          </div>
        </div>
      </td>

      <td className="text-[12px] font-medium text-slate-600">
        {student.usn}
      </td>

      <td className="text-[12px] text-slate-600">
        {student.year}
      </td>

      <td className="pr-4">
        <span className="rounded-md bg-amber-100 px-2 py-1 text-[10px] font-semibold text-amber-700">
          {student.status}
        </span>
      </td>
    </tr>
  );
};

export default StudentRow;