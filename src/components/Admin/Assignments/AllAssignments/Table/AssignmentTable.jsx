import React from "react";

import AssignmentTableHeader from "./AssignmentTableHeader";
import AssignmentRow from "./AssignmentRow";

const AssignmentTable = ({
  assignments,
  showRemove = false,
  onRemove,
  removingAssignmentId = null,
}) => {
  return (
    <table className="w-full min-w-[960px] table-auto">
      <AssignmentTableHeader />

      <tbody>
        {assignments.map(
          (assignment, index) => (
            <AssignmentRow
              key={assignment.id}
              assignment={assignment}
              index={index}
              showRemove={showRemove}
              onRemove={onRemove}
              removing={removingAssignmentId === assignment.id}
            />
          )
        )}
      </tbody>
    </table>
  );
};

export default AssignmentTable;