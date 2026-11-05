import React, { useState } from "react";

import AdminSidebar from "../../components/layouts/AdminSidebar";
import AdminHeader from "../../components/layouts/AdminHeader";
import DashboardBanner from "../../components/Admin/Dashboard/DashboardBanner";

import AnnouncementAudienceCards from "../../components/Admin/Announcements/AnnouncementAudienceCards";
import CreateAnnouncement from "../../components/Admin/Announcements/CreateAnnouncement";
import PublishedAnnouncements from "../../components/Admin/Announcements/PublishedAnnouncements";

const Announcements = () => {
  const [selectedAudience, setSelectedAudience] = useState("ALL");
  const [announcements, setAnnouncements] = useState([]);

  const handlePublishAnnouncement = (announcement) => {
    setAnnouncements((previous) => [
      announcement,
      ...previous,
    ]);

    setSelectedAudience(announcement.audience);
  };

  return (
    <div className="min-h-screen w-full min-w-0 overflow-x-hidden bg-slate-100">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main content */}
      <div className="ml-0 flex min-h-screen w-full min-w-0 flex-col lg:ml-[290px] lg:w-[calc(100%-290px)]">
        {/* Header */}
        <AdminHeader />

        {/* Announcement content */}
        <main className="min-w-0 flex-1 space-y-4 px-3 py-4 sm:space-y-5 sm:px-4 sm:py-5 lg:px-6 lg:py-6">
          {/* Dashboard banner */}
          <DashboardBanner />

          {/* Audience selection cards */}
          <AnnouncementAudienceCards
            selectedAudience={selectedAudience}
            onAudienceChange={setSelectedAudience}
          />

          {/* Composer and published announcements */}
          <section className="grid min-w-0 grid-cols-1 items-start gap-4 sm:gap-5 2xl:grid-cols-2">
            {/* Left side */}
            <div className="min-w-0 w-full">
              <CreateAnnouncement
                onPublish={handlePublishAnnouncement}
                selectedAudience={selectedAudience}
                onAudienceChange={setSelectedAudience}
              />
            </div>

            {/* Right side */}
            <div className="min-w-0 w-full">
              <PublishedAnnouncements
                announcements={announcements}
              />
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Announcements;
