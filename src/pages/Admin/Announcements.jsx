
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
    <div className="min-h-screen bg-slate-100">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main content */}
      <div className="ml-[290px] flex min-h-screen flex-col">
        {/* Header */}
        <AdminHeader />

        {/* Announcement content */}
        <main className="flex-1 space-y-5 px-6 py-6">
          {/* Dashboard banner */}
          <DashboardBanner />

          {/* Audience selection cards */}
          <AnnouncementAudienceCards
            selectedAudience={selectedAudience}
            onAudienceChange={setSelectedAudience}
          />

          {/* Composer and published announcements */}
          <section className="grid grid-cols-1 items-start gap-5 2xl:grid-cols-2">
            {/* Left side */}
            <div className="min-w-0">
              <CreateAnnouncement
                onPublish={handlePublishAnnouncement}
                selectedAudience={selectedAudience}
                onAudienceChange={setSelectedAudience}
              />
            </div>

            {/* Right side */}
            <div className="min-w-0">
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
