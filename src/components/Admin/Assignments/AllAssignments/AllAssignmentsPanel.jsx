import React from "react";

import { assignments } from "./assignmentHistoryData";

import AssignmentTable from "./Table/AssignmentTable";
import AssignmentPagination from "./Table/AssignmentPagination";

const AllAssignmentsPanel = () => {
  return (
    <div className="overflow-hidden">
      {/* ================= Table ================= */}

      <div className="overflow-x-auto">
        <AssignmentTable
          assignments={assignments}
        />
      </div>

      {/* ================= Pagination ================= */}

      <AssignmentPagination
        total={assignments.length}
      />
    </div>
  );
};

export default AllAssignmentsPanel;