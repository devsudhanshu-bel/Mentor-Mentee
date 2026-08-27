import React from "react";
import {
  ChevronDown,
  ChevronRight,
  Folder,
  FolderOpen,
} from "lucide-react";

const StudentHierarchy = () => {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      {/* ================= Header ================= */}

      <h3 className="mb-4 text-sm font-semibold text-slate-900">
        Student Hierarchy
      </h3>

      {/* ================= Tree ================= */}

      <div className="space-y-1 text-[12px]">
        {/* All Students */}

        <div className="flex items-center justify-between rounded-lg px-2 py-2 hover:bg-slate-50">
          <div className="flex items-center gap-2">
            <ChevronDown size={14} className="text-slate-500" />

            <FolderOpen
              size={15}
              className="text-blue-600"
            />

            <span className="font-medium text-slate-700">
              All Students
            </span>
          </div>

          <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-600">
            24
          </span>
        </div>

        {/* 2nd Year */}

        <div className="ml-5 space-y-1 border-l border-slate-200 pl-3">
          <div className="flex items-center justify-between rounded-lg px-2 py-2 hover:bg-slate-50">
            <div className="flex items-center gap-2">
              <ChevronDown
                size={13}
                className="text-slate-500"
              />

              <FolderOpen
                size={14}
                className="text-amber-500"
              />

              <span className="text-slate-700">
                2nd Year
              </span>
            </div>

            <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-600">
              12
            </span>
          </div>

          {/* Section A */}

          <div className="ml-5 border-l border-slate-200 pl-3">
            <div className="flex items-center justify-between rounded-lg bg-blue-50 px-2 py-2">
              <div className="flex items-center gap-2">
                <Folder
                  size={14}
                  className="text-blue-600"
                />

                <span className="font-medium text-blue-600">
                  Section A
                </span>
              </div>

              <span className="rounded-md bg-white px-2 py-0.5 text-[10px] font-semibold text-blue-600 shadow-sm">
                6
              </span>
            </div>

            <div className="mt-1 flex items-center justify-between rounded-lg px-2 py-2 hover:bg-slate-50">
              <div className="flex items-center gap-2">
                <Folder
                  size={14}
                  className="text-slate-500"
                />

                <span className="text-slate-700">
                  Section B
                </span>
              </div>

              <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-600">
                6
              </span>
            </div>
          </div>
        </div>

        {/* 3rd Year */}

        <div className="ml-5 border-l border-slate-200 pl-3">
          <div className="flex items-center justify-between rounded-lg px-2 py-2 hover:bg-slate-50">
            <div className="flex items-center gap-2">
              <ChevronRight
                size={13}
                className="text-slate-500"
              />

              <Folder
                size={14}
                className="text-amber-500"
              />

              <span className="text-slate-700">
                3rd Year
              </span>
            </div>

            <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-600">
              8
            </span>
          </div>
        </div>

        {/* 4th Year */}

        <div className="ml-5 border-l border-slate-200 pl-3">
          <div className="flex items-center justify-between rounded-lg px-2 py-2 hover:bg-slate-50">
            <div className="flex items-center gap-2">
              <ChevronRight
                size={13}
                className="text-slate-500"
              />

              <Folder
                size={14}
                className="text-amber-500"
              />

              <span className="text-slate-700">
                4th Year
              </span>
            </div>

            <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-600">
              4
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentHierarchy;