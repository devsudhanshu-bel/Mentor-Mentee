import React from "react";

import MentorSidebar from "../../components/layouts/MentorSidebar";
import MentorHeader from "../../components/layouts/MentorHeader";

import DiscussionSidebar from "../../components/Mentors/Discussion/DiscussionSidebar";
import ChatWindow from "../../components/Mentors/Discussion/ChatWindow";

const Discussions = () => {
  return (
    <div className="min-h-screen bg-slate-100">
      {/* Sidebar */}
      <MentorSidebar />

      {/* Main Content */}
      <div className="ml-[290px] min-h-screen">
        {/* Header */}
        <MentorHeader />

        {/* Discussion Layout */}
        <main className="p-6">
          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div className="grid h-[calc(100vh-140px)] grid-cols-[360px_1fr]">
              {/* Student List */}
              <DiscussionSidebar />

              {/* Chat */}
              <ChatWindow />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Discussions;