import React, { useState } from "react";

import AssignmentHeader from "./Header/AssignmentHeader";

import StudentPanel from "./Students/StudentPanel";
import MentorPanel from "./Mentors/MentorPanel";

import AssignButton from "./Center/AssignButton";

import AssignmentFooter from "./Footer/AssignmentFooter";

import AllAssignmentsPanel from "./AllAssignments/AllAssignmentsPanel";
import TransferTicketsPanel from "./TransferTickets/TransferTicketsPanel";

const AssignmentWorkspace = () => {
  const [activeTab, setActiveTab] = useState("unassigned");

  const [search, setSearch] = useState("");

  const [selectedStudents, setSelectedStudents] = useState([]);

  const [selectedMentor, setSelectedMentor] = useState(null);

  const handleAssign = () => {
    if (selectedStudents.length === 0 || selectedMentor === null) {
      return;
    }

    console.log({
      students: selectedStudents,
      mentor: selectedMentor,
    });
  };

  const handleFiltersClick = () => {
    console.log("Assignment filters clicked");
  };

  const handleBulkAssign = () => {
    console.log("Bulk assign clicked");
  };

  return (
    <div
      className="
        overflow-hidden
        rounded-2xl
        border
        border-slate-200
        bg-white
        shadow-sm
      "
    >
      {/* ============================================================
          WORKSPACE HEADER
          ============================================================ */}

      <AssignmentHeader
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        search={search}
        setSearch={setSearch}
        onFiltersClick={handleFiltersClick}
        onBulkAssign={handleBulkAssign}
      />

      {/* ============================================================
          UNASSIGNED STUDENTS
          ============================================================ */}

      {activeTab === "unassigned" && (
        <>
          <div
            className="
              grid
              grid-cols-[minmax(0,1fr)_56px_minmax(0,1fr)]
              items-stretch
              gap-5
              p-5
            "
          >
            {/* ================= Student Panel ================= */}

            <StudentPanel
              search={search}
              selectedStudents={selectedStudents}
              setSelectedStudents={setSelectedStudents}
            />

            {/* ================= Assignment Controls ================= */}

            <div
              className="
                flex
                items-center
                justify-center
              "
            >
              <AssignButton
                selectedStudents={selectedStudents}
                selectedMentor={selectedMentor}
                onAssign={handleAssign}
              />
            </div>

            {/* ================= Mentor Panel ================= */}

            <MentorPanel
              search={search}
              selectedMentor={selectedMentor}
              setSelectedMentor={setSelectedMentor}
            />
          </div>

          {/* ================= Assignment Footer ================= */}

          <AssignmentFooter
            selectedStudents={selectedStudents}
            selectedMentor={selectedMentor}
          />
        </>
      )}

      {/* ============================================================
          ALL ASSIGNMENTS
          ============================================================ */}

      {activeTab === "all" && <AllAssignmentsPanel />}

      {/* ============================================================
          TRANSFER REQUESTS
          ============================================================ */}

      {activeTab === "transfer" && <TransferTicketsPanel />}

      {/* ============================================================
          ASSIGNMENT HISTORY
          ============================================================ */}

      {activeTab === "history" && (
        <div className="flex min-h-[300px] items-center justify-center p-8">
          <div className="text-center">
            <p className="text-sm font-semibold text-slate-700">
              Assignment History
            </p>

            <p className="mt-1 text-xs text-slate-400">
              Assignment history will be available here.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssignmentWorkspace;