import React from "react";

import Sidebar from "../components/layouts/Sidebar";
import Header from "../components/layouts/Header";

import MentorCard from "../components/Mentor/MentorCard";
import MenteeCard from "../components/Mentor/MenteeCard";
import RelationshipSummary from "../components/Mentor/RelationshipSummary";

import UpcomingMeeting from "../components/Mentor/UpcomingMeeting";
import RecentMeetings from "../components/Mentor/RecentMeetings";

import TasksGoals from "../components/Mentor/TasksGoals";
import Discussion from "../components/Mentor/Discussion";
import QuickActions from "../components/Mentor/QuickActions";

const Mentor = () => {
  return (
    <div className="min-h-screen bg-slate-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="ml-[290px] min-h-screen flex flex-col">
        {/* Header */}
        <Header />

        {/* Mentor Page Content */}
        <main className="flex-1 px-4 py-4 space-y-4">
          {/* ================= Page Heading ================= */}
          <div>
            <h1 className="text-[22px] font-bold text-[#142970]">
              Mentor & Mentee
            </h1>

            <p className="text-[12px] text-slate-500">
              Connect, collaborate and grow together.
            </p>
          </div>

          {/* ================= First Row ================= */}
          <div className="grid grid-cols-12 gap-3">
            {/* Mentor Card */}
            <div className="col-span-12 lg:col-span-4">
              <MentorCard />
            </div>

            {/* Mentee Card */}
            <div className="col-span-12 lg:col-span-4">
              <MenteeCard />
            </div>

            {/* Relationship Summary */}
            <div className="col-span-12 lg:col-span-4">
              <RelationshipSummary />
            </div>
          </div>

          {/* ================= Second Row ================= */}
          <div className="grid grid-cols-12 gap-3">
            {/* Upcoming Meeting */}
            <div className="col-span-12 lg:col-span-4">
              <UpcomingMeeting />
            </div>

            {/* Recent Meetings */}
            <div className="col-span-12 lg:col-span-8">
              <RecentMeetings />
            </div>
          </div>

          {/* ================= Third Row ================= */}
          <div className="grid grid-cols-12 gap-3">
            {/* Tasks & Goals */}
            <div className="col-span-12 lg:col-span-4">
              <TasksGoals />
            </div>

            {/* Discussion */}
            <div className="col-span-12 lg:col-span-4">
              <Discussion />
            </div>

            {/* Quick Actions */}
            <div className="col-span-12 lg:col-span-4">
              <QuickActions />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Mentor;