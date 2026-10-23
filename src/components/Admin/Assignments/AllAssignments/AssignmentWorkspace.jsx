import React, { useEffect, useState } from "react";

import AssignmentHeader from "./Header/AssignmentHeader";

import StudentPanel from "./Students/StudentPanel";
import MentorPanel from "./Mentors/MentorPanel";

import AssignButton from "./Center/AssignButton";
import AssignmentFooter from "./Footer/AssignmentFooter";

import AllAssignmentsPanel from "./AllAssignments/AllAssignmentsPanel";
import TransferTicketsPanel from "./TransferTickets/TransferTicketsPanel";
import AssignedStudentsPanel from "./AssignedStudents/AssignedStudentsPanel";

import { assignStudentsToMentor } from "../../../api/assignment.api";

const AssignmentWorkspace = ({
  filters,
  context,
  loading,
  error,
  onRefresh,
}) => {
  const [activeTab, setActiveTab] = useState("unassigned");
  const [search, setSearch] = useState("");
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [assigning, setAssigning] = useState(false);
  const [message, setMessage] = useState("");

  const students = context?.students || [];
  const mentors = context?.mentors || [];
  const termId = filters?.termId || context?.termId;

  // Clear selections when the assignment filters change.
  useEffect(() => {
    setSelectedStudents([]);
    setSelectedMentor(null);
  }, [
    filters?.termId,
    filters?.departmentId,
    filters?.semesterNumber,
    filters?.section,
  ]);

  // Manual assignment: existing behavior preserved.
  const handleAssign = async () => {
    if (selectedStudents.length === 0 || !selectedMentor) return;

    if (!termId) {
      setMessage("Academic term could not be determined.");
      return;
    }

    try {
      setAssigning(true);
      setMessage("");

      const storedUser = localStorage.getItem("user");
      const user = storedUser ? JSON.parse(storedUser) : null;

      const assignedBy = user?.id || user?.userId || user?.userAccountId;

      if (!assignedBy) {
        throw new Error("Logged-in admin account could not be identified.");
      }

      const response = await assignStudentsToMentor({
        studentIds: selectedStudents,
        teacherId: selectedMentor,
        termId,
        assignedBy,
      });

      setMessage(response?.message || "Students assigned successfully.");

      setSelectedStudents([]);
      setSelectedMentor(null);

      await onRefresh?.();
    } catch (err) {
      console.error("Assignment failed:", err);

      setMessage(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to assign students.",
      );
    } finally {
      setAssigning(false);
    }
  };

  // Automatically clear status messages.
  useEffect(() => {
    if (!message) return undefined;

    const timer = setTimeout(() => setMessage(""), 5000);

    return () => clearTimeout(timer);
  }, [message]);

  const handleFiltersClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Preserve the existing Bulk Assign button behavior.
  const handleBulkAssign = () => {
    if (!students.length) {
      setMessage("No unassigned students are available.");
      return;
    }

    setSelectedStudents(students.map((student) => student.id));
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <AssignmentHeader
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        search={search}
        setSearch={setSearch}
        onFiltersClick={handleFiltersClick}
        onBulkAssign={handleBulkAssign}
        studentCount={context?.counts?.unassignedStudents ?? students.length}
        assignedCount={context?.counts?.assignedStudents ?? 0}
        transferCount={context?.counts?.pendingTransferRequests ?? 0}
      />

      {/* STATUS MESSAGE */}
      {message && (
        <div className="border-b border-blue-100 bg-blue-50 px-5 py-2.5 text-xs font-medium text-blue-700">
          {message}
        </div>
      )}

      {/* ERROR */}
      {error && (
        <div className="border-b border-red-100 bg-red-50 px-5 py-2.5 text-xs font-medium text-red-700">
          {error}
        </div>
      )}

      {/* LOADING */}
      {loading && (
        <div className="border-b border-slate-100 px-5 py-2.5">
          <p className="text-[11px] font-medium text-slate-400">
            Updating assignment data...
          </p>
        </div>
      )}

      {/* UNASSIGNED STUDENTS — MANUAL ASSIGNMENT */}
      {activeTab === "unassigned" && (
        <>
          <div className="grid grid-cols-[minmax(0,1fr)_56px_minmax(0,1fr)] items-stretch gap-5 p-5">
            <StudentPanel
              students={students}
              search={search}
              selectedStudents={selectedStudents}
              setSelectedStudents={setSelectedStudents}
            />

            <div className="flex items-center justify-center">
              <AssignButton
                selectedStudents={selectedStudents}
                selectedMentor={selectedMentor}
                onAssign={handleAssign}
                loading={assigning}
              />
            </div>

            <MentorPanel
              mentors={mentors}
              search={search}
              selectedMentor={selectedMentor}
              setSelectedMentor={setSelectedMentor}
            />
          </div>

          <AssignmentFooter
            selectedStudents={selectedStudents}
            selectedMentor={selectedMentor}
          />
        </>
      )}

      {/* ASSIGNED STUDENTS */}
      {activeTab === "assigned" && (
        <AssignedStudentsPanel
          termId={termId}
          search={search}
          onRefresh={onRefresh}
        />
      )}

      {/* ALL ASSIGNMENTS */}
      {activeTab === "all" && (
        <AllAssignmentsPanel termId={termId} search={search} />
      )}

      {/* TRANSFER REQUESTS */}
      {activeTab === "transfer" && <TransferTicketsPanel />}

      {/* HISTORY */}
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
