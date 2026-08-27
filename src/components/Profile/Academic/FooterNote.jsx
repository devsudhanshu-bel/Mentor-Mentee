import React from "react";
import {
  Info,
  BookOpen,
} from "lucide-react";

const FooterNote = () => {
  return (
    <div className="mt-4 bg-blue-50 border border-blue-200 rounded-2xl p-4">

      <div className="flex items-start gap-3">

        <div className="mt-0.5">

          <Info
            size={18}
            className="text-blue-600"
          />

        </div>

        <div className="flex-1">

          <h3 className="text-sm font-semibold text-blue-700">
            Academic Notes
          </h3>

          <div className="mt-2 space-y-2 text-[13px] text-slate-600">

            <div className="flex items-center gap-2">

              <BookOpen
                size={14}
                className="text-blue-600"
              />

              <span>
                <strong>CIA</strong> — Continuous Internal Assessment
              </span>

            </div>

            <div className="flex items-center gap-2">

              <BookOpen
                size={14}
                className="text-blue-600"
              />

              <span>
                <strong>MSE</strong> — Mid Semester Examination
              </span>

            </div>

            <div className="flex items-center gap-2">

              <BookOpen
                size={14}
                className="text-blue-600"
              />

              <span>
                <strong>ESE</strong> — End Semester Examination
              </span>

            </div>

            <div className="pt-2 border-t border-blue-100">

              <p className="text-[12px] text-blue-700">
                Academic records shown above are for reference only. The official transcript issued by the university shall be considered the final record.
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default FooterNote;