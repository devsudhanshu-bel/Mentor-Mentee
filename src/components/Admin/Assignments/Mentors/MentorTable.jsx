import React from "react";

import MentorTableHeader from "./MentorTableHeader";
import MentorRow from "./MentorRow";

const MentorTable = ({
  mentors,
  selectedMentor,
  setSelectedMentor,
}) => {
  return (
    <table className="w-full">
      <MentorTableHeader />

      <tbody>
        {mentors.map((mentor) => (
          <MentorRow
            key={mentor.id}
            mentor={mentor}
            selectedMentor={selectedMentor}
            setSelectedMentor={setSelectedMentor}
          />
        ))}

        {mentors.length === 0 && (
          <tr>
            <td
              colSpan={3}
              className="py-8 text-center text-sm text-slate-500"
            >
              No mentors found.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default MentorTable;