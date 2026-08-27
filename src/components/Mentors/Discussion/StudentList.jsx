import React, { useState } from "react";
import { Search } from "lucide-react";

import StudentChatCard from "./StudentChatCard";

const students = [
  {
    id: 1,
    name: "Sudhanshu Belavarthy",
    message: "Good morning sir.",
    time: "10:20",
    unread: 2,
    online: true,
  },
  {
    id: 2,
    name: "Rahul Sharma",
    message: "I've uploaded the assignment.",
    time: "09:45",
    unread: 0,
    online: false,
  },
  {
    id: 3,
    name: "Priya Nair",
    message: "Thank you for the guidance.",
    time: "Yesterday",
    unread: 1,
    online: true,
  },
  {
    id: 4,
    name: "Ananya Gupta",
    message: "Can we reschedule tomorrow?",
    time: "Yesterday",
    unread: 0,
    online: false,
  },
];

const StudentList = () => {
  const [selected, setSelected] = useState(1);

  return (
    <div className="flex h-full flex-col bg-white">
      {/* Search */}
      <div className="border-b border-slate-200 p-4">
        <div className="relative">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            placeholder="Search students..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-3 text-[13px] outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* Students */}
      <div className="flex-1 overflow-y-auto">
        {students.map((student) => (
          <StudentChatCard
            key={student.id}
            student={student}
            active={selected === student.id}
            onClick={() => setSelected(student.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default StudentList;