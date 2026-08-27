import React from "react";

import AssignmentTableHeader from "./AssignmentTableHeader";
import AssignmentRow from "./AssignmentRow";

const AssignmentTable = ({
  assignments,
}) => {
  return (
    <table className="w-full table-fixed">
      <AssignmentTableHeader />

      <tbody>
        {assignments.map(
          (assignment, index) => (
            <AssignmentRow
              key={assignment.id}
              assignment={assignment}
              index={index}
            />
          )
        )}
      </tbody>
    </table>
  );
};

export default AssignmentTable;