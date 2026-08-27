import React from "react";
import { MessageCircle, X } from "lucide-react";

import StudentList from "./StudentList";

const DiscussionDrawer = ({ isOpen, setIsDiscussionOpen }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed bottom-24 right-6 z-[9998] h-[650px] w-[920px] overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl">
      {/* Header */}
      <div className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
            <MessageCircle
              size={20}
              className="text-blue-600"
            />
          </div>

          <div>
            <h2 className="text-[17px] font-semibold text-slate-800">
              Discussions
            </h2>

            <p className="text-[12px] text-slate-500">
              Chat with your mentees
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsDiscussionOpen(false)}
          className="cursor-pointer rounded-lg p-2 transition hover:bg-slate-100"
        >
          <X
            size={22}
            className="text-slate-600"
          />
        </button>
      </div>

      {/* Body */}
      <div className="grid h-[calc(100%-64px)] grid-cols-[300px_1fr]">
        {/* Left Sidebar */}
        <div className="border-r border-slate-200 bg-white">
          <StudentList />
        </div>

        {/* Right Chat Area */}
        <div className="flex flex-col items-center justify-center bg-slate-50">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-blue-100">
            <MessageCircle
              size={46}
              className="text-blue-600"
            />
          </div>

          <h3 className="mt-6 text-[24px] font-semibold text-slate-800">
            Welcome to Discussions
          </h3>

          <p className="mt-3 max-w-sm text-center text-[14px] leading-6 text-slate-500">
            Select a student from the left panel to start chatting.
            Conversations will appear here.
          </p>
        </div>
      </div>
    </div>
  );
};
  
export default DiscussionDrawer;