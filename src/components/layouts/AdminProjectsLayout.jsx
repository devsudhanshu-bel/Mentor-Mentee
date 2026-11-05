import React from "react";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";

/**
 * Shared shell for the Admin Projects pages.
 * Existing Admin pages render their own sidebar/header; the new Projects
 * pages did not, which caused the navigation and header to disappear.
 */
export default function AdminProjectsLayout({ children }) {
  return (
    <div className="min-h-screen w-full min-w-0 overflow-x-hidden bg-slate-100">
      <AdminSidebar />
      <div className="ml-0 flex min-h-screen w-full min-w-0 flex-col lg:ml-[290px] lg:w-[calc(100%-290px)]">
        <AdminHeader />
        <main className="min-w-0 flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}
