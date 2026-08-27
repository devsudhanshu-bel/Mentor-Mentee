import React from "react";

import MentorSidebar from "../../../components/layouts/MentorSidebar";
import MentorHeader from "../../../components/layouts/MentorHeader";

import StudentPageHeader from "../../../components/Mentors/Students/List/StudentPageHeader";
import StudentFilters from "../../../components/Mentors/Students/List/StudentFilters";
import StudentGridHeader from "../../../components/Mentors/Students/List/StudentGridHeader";
import StudentCard from "../../../components/Mentors/Students/List/StudentCard";
import StudentPagination from "../../../components/Mentors/Students/List/StudentPagination";

import studentsData from "../../../components/Mentors/Students/List/studentsData";

const Students = () => {
  return (
    <div className="min-h-screen bg-slate-100">
      {/* Sidebar */}
      <MentorSidebar />

      {/* Main Content */}
      <div className="ml-[290px] min-h-screen">
        {/* Header */}
        <MentorHeader />

        {/* Students Content */}
        <main className="space-y-4 p-6">
          {/* Banner */}
          <StudentPageHeader />

          {/* Filters */}
          <StudentFilters />

          {/* Grid Header */}
          <StudentGridHeader />

          {/* Student Cards */}
          <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {studentsData.map((student) => (
              <StudentCard
                key={student.id}
                student={student}
              />
            ))}
          </section>

          {/* Pagination */}
          <StudentPagination />
        </main>
      </div>
    </div>
  );
};

export default Students;