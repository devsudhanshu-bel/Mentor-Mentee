import React from "react";
import {
  Save,
  Bold,
  Italic,
  Underline,
  AlignLeft,
  List,
  ListOrdered,
  Link,
  Paperclip,
} from "lucide-react";

const NotesTab = ({
  notes,
  setNotes,
  saveNotes,
  lastSaved,
}) => {
  return (
    <div className="p-5">

      {/* Header */}

      <div className="mb-4 flex items-center justify-between">

        <div>

          <h2 className="text-xl font-bold text-slate-800">
            Meeting Notes
          </h2>

          <p className="mt-1 text-[13px] text-slate-500">
            Record important discussions and meeting outcomes.
          </p>

        </div>

        <button
          onClick={saveNotes}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-[13px] font-medium text-white transition hover:bg-blue-700"
        >
          <Save size={15} />
          Save Notes
        </button>

      </div>

      {/* Toolbar */}

      <div className="mb-4 flex flex-wrap items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 p-2">

        <select className="rounded-md border border-slate-200 bg-white px-2 py-1.5 text-[12px] outline-none">

          <option>Normal</option>
          <option>Heading</option>
          <option>Title</option>

        </select>

        <button className="rounded-md p-1.5 hover:bg-white">
          <Bold size={14} />
        </button>

        <button className="rounded-md p-1.5 hover:bg-white">
          <Italic size={14} />
        </button>

        <button className="rounded-md p-1.5 hover:bg-white">
          <Underline size={14} />
        </button>

        <div className="mx-1 h-5 w-px bg-slate-300" />

        <button className="rounded-md p-1.5 hover:bg-white">
          <List size={14} />
        </button>

        <button className="rounded-md p-1.5 hover:bg-white">
          <ListOrdered size={14} />
        </button>

        <button className="rounded-md p-1.5 hover:bg-white">
          <AlignLeft size={14} />
        </button>

        <div className="mx-1 h-5 w-px bg-slate-300" />

        <button className="rounded-md p-1.5 hover:bg-white">
          <Link size={14} />
        </button>

        <button className="rounded-md p-1.5 hover:bg-white">
          <Paperclip size={14} />
        </button>

      </div>

      {/* Editor */}

      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Write meeting notes here..."
        className="h-[420px] w-full resize-none rounded-xl border border-slate-200 p-4 text-[13px] leading-6 text-slate-700 outline-none transition focus:border-blue-500"
      />

      {/* Footer */}

      <div className="mt-4 flex items-center justify-between">

        <div className="text-[12px] text-slate-500">

          Last Saved :

          <span className="ml-2 font-semibold text-emerald-600">
            {lastSaved}
          </span>

        </div>

        <div className="text-[12px] text-slate-400">

          {notes.length} Characters

        </div>

      </div>

    </div>
  );
};

export default NotesTab;