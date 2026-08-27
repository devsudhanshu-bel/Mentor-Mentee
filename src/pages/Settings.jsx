import React, { useState } from "react";

import Sidebar from "../components/layouts/Sidebar";
import Header from "../components/layouts/Header";

import SettingsBanner from "../components/Settings/SettingsBanner";
import SettingsSidebar from "../components/Settings/SettingsSidebar";

import ProfileSettings from "../components/Settings/ProfileSettings";
import AccountSettings from "../components/Settings/AccountSettings";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="ml-[290px] min-h-screen flex flex-col">
        {/* Header */}
        <Header />

        {/* Page Content */}
        <main className="flex-1 p-6">

          {/* Banner */}
          <div className="mb-3">
            <SettingsBanner />
          </div>

          {/* Settings Content */}
          <div className="grid grid-cols-12 gap-3 items-start">

            {/* Left Sidebar */}
            <div className="col-span-3">
              <SettingsSidebar
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />
            </div>

            {/* Right Content */}
            <div className="col-span-9">

              {/* Profile */}
              {activeTab === "profile" && (
                <ProfileSettings />
              )}

              {/* Account */}
              {activeTab === "account" && (
                <AccountSettings />
              )}

              {/* Password */}
              {activeTab === "password" && (
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 min-h-[700px]">
                  <h2 className="text-2xl font-semibold text-slate-800">
                    Password &amp; Security
                  </h2>
                </div>
              )}

              {/* Notifications */}
              {activeTab === "notifications" && (
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 min-h-[700px]">
                  <h2 className="text-2xl font-semibold text-slate-800">
                    Notification Preferences
                  </h2>
                </div>
              )}

              {/* Privacy */}
              {activeTab === "privacy" && (
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 min-h-[700px]">
                  <h2 className="text-2xl font-semibold text-slate-800">
                    Privacy Settings
                  </h2>
                </div>
              )}

              {/* Appearance */}
              {activeTab === "appearance" && (
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 min-h-[700px]">
                  <h2 className="text-2xl font-semibold text-slate-800">
                    Appearance
                  </h2>
                </div>
              )}

              {/* Storage */}
              {activeTab === "storage" && (
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 min-h-[700px]">
                  <h2 className="text-2xl font-semibold text-slate-800">
                    Data &amp; Storage
                  </h2>
                </div>
              )}

              {/* Support */}
              {activeTab === "support" && (
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 min-h-[700px]">
                  <h2 className="text-2xl font-semibold text-slate-800">
                    Help &amp; Support
                  </h2>
                </div>
              )}

              {/* About */}
              {activeTab === "about" && (
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 min-h-[700px]">
                  <h2 className="text-2xl font-semibold text-slate-800">
                    About
                  </h2>
                </div>
              )}

            </div>

          </div>

        </main>
      </div>
    </div>
  );
};

export default Settings;