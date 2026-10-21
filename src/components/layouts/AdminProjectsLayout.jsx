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
    <div className="min-h-screen bg-slate-100">
      <AdminSidebar />
      <div className="ml-[290px] min-h-screen flex flex-col">
        <AdminHeader />
        <main className="flex-1 min-w-0">
          {children}
        </main>
      </div>
    </div>
  );
}
