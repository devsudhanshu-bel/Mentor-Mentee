import React from "react";
import StudentsBanner from "../../../../assets/my-students.png";

const StudentPageHeader = () => {
  return (
    <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <img
        src={StudentsBanner}
        alt="My Students Banner"
        className="pl-[50px] mt-6 w-[900px] h-[150px] object-cover"
        draggable={false}
      />
    </section>
  );
};

export default StudentPageHeader;