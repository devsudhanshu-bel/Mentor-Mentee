import React, { useState } from "react";

import AssignmentHeader from "./Header/AssignmentHeader";

import StudentPanel from "./Students/StudentPanel";
import MentorPanel from "./Mentors/MentorPanel";

import AssignButton from "./Center/AssignButton";

import AssignmentFooter from "./Footer/AssignmentFooter";

import AllAssignmentsPanel from "./AllAssignments/AllAssignmentsPanel";

const AssignmentWorkspace = () => {
  const [activeTab, setActiveTab] =
    useState("unassigned");

  const [search, setSearch] = useState("");

  const [selectedStudents, setSelectedStudents] =
    useState([]);

  const [selectedMentor, setSelectedMentor] =
    useState(null);

  const handleAssign = () => {
    if (
      selectedStudents.length === 0 ||
      selectedMentor === null
    ) {
      return;
    }

    console.log({
      students: selectedStudents,
      mentor: selectedMentor,
    });
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      {/* ================= Header ================= */}

      <AssignmentHeader
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        search={search}
        setSearch={setSearch}
      />

      {/* ================= Unassigned Students ================= */}

      {activeTab === "unassigned" && (
        <>
          <div className="grid grid-cols-[1fr_70px_1fr] gap-5 p-5">
            <StudentPanel
              search={search}
              selectedStudents={selectedStudents}
              setSelectedStudents={
                setSelectedStudents
              }
            />

            <AssignButton
              selectedStudents={
                selectedStudents
              }
              selectedMentor={
                selectedMentor
              }
              onAssign={handleAssign}
            />

            <MentorPanel
              selectedMentor={
                selectedMentor
              }
              setSelectedMentor={
                setSelectedMentor
              }
            />
          </div>

          <AssignmentFooter
            selectedStudents={
              selectedStudents
            }
            selectedMentor={
              selectedMentor
            }
          />
        </>
      )}

      {/* ================= All Assignments ================= */}

      {activeTab === "assignments" && (
        <AllAssignmentsPanel />
      )}

      {/* ================= Transfer Requests ================= */}

      {activeTab === "transfer" && (
        <div className="flex h-[500px] items-center justify-center">
          <p className="text-lg font-semibold text-slate-500">
            Transfer Requests Coming Soon...
          </p>
        </div>
      )}
    </div>
  );
};

export default AssignmentWorkspace;