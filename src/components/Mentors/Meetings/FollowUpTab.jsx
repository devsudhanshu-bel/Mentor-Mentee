import React from "react";
import {
  CalendarDays,
  Clock3,
  ClipboardList,
  Save,
} from "lucide-react";

const FollowUpTab = ({
  followUp,
  setFollowUp,
}) => {
  const handleChange = (field, value) => {
    setFollowUp({
      ...followUp,
      [field]: value,
    });
  };

  return (
    <div className="p-5">

      {/* Header */}

      <div className="mb-6">

        <h2 className="text-xl font-bold text-slate-800">
          Follow-up Meeting
        </h2>

        <p className="mt-1 text-[13px] text-slate-500">
          Schedule the next mentorship session and define the agenda.
        </p>

      </div>

      {/* Date & Time */}

      <div className="grid grid-cols-2 gap-4">

        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">

          <div className="mb-3 flex items-center gap-2">

            <CalendarDays
              size={17}
              className="text-blue-600"
            />

            <span className="font-medium text-slate-700">
              Meeting Date
            </span>

          </div>

          <input
            type="date"
            value={followUp.date}
            onChange={(e) =>
              handleChange("date", e.target.value)
            }
            className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-[13px] outline-none transition focus:border-blue-500"
          />

        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">

          <div className="mb-3 flex items-center gap-2">

            <Clock3
              size={17}
              className="text-blue-600"
            />

            <span className="font-medium text-slate-700">
              Meeting Time
            </span>

          </div>

          <input
            type="time"
            value={followUp.time}
            onChange={(e) =>
              handleChange("time", e.target.value)
            }
            className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-[13px] outline-none transition focus:border-blue-500"
          />

        </div>

      </div>

      {/* Agenda */}

      <div className="mt-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

        <div className="mb-4 flex items-center gap-2">

          <ClipboardList
            size={18}
            className="text-blue-600"
          />

          <h3 className="font-semibold text-slate-700">
            Agenda
          </h3>

        </div>

        <textarea
          rows={8}
          value={followUp.agenda}
          onChange={(e) =>
            handleChange("agenda", e.target.value)
          }
          placeholder="Topics to be discussed during the next meeting..."
          className="w-full resize-none rounded-lg border border-slate-300 p-4 text-[13px] leading-6 outline-none transition focus:border-blue-500"
        />

        <div className="mt-5 flex justify-end">

          <button className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-[13px] font-medium text-white transition hover:bg-blue-700">

            <Save size={15} />

            Save Follow-up

          </button>

        </div>

      </div>

    </div>
  );
};

export default FollowUpTab;