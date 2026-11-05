import React from "react";

import MentorSidebar from "../../components/layouts/MentorSidebar";
import MentorHeader from "../../components/layouts/MentorHeader";

import DiscussionSidebar from "../../components/Mentors/Discussion/DiscussionSidebar";
import ChatWindow from "../../components/Mentors/Discussion/ChatWindow";

const Discussions = () => {
  return (
    <div className="min-h-screen w-full min-w-0 overflow-x-hidden bg-slate-100">
      {/* Sidebar */}
      <MentorSidebar />

      {/* Main Content */}
      <div className="ml-0 min-h-screen w-full min-w-0 lg:ml-[290px]">
        {/* Header */}
        <MentorHeader />

        {/* Discussion Layout */}
        <main className="w-full min-w-0 p-3 sm:p-4 md:p-5 lg:p-6">
          <div className="min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm sm:rounded-3xl">
            <div className="grid h-[calc(100dvh-112px)] min-h-[520px] min-w-0 grid-cols-1 grid-rows-[minmax(180px,35%)_minmax(0,1fr)] md:h-[calc(100vh-140px)] md:min-h-[560px] md:grid-cols-[minmax(280px,360px)_minmax(0,1fr)] md:grid-rows-1">
              {/* Student List */}
              <div className="min-h-0 min-w-0 overflow-hidden border-b border-slate-200 md:border-b-0 md:border-r">
                <DiscussionSidebar />
              </div>

              {/* Chat */}
              <div className="min-h-0 min-w-0 overflow-hidden">
                <ChatWindow />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Discussions;
