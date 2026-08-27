import React from "react";
import {
  User,
  Lock,
} from "lucide-react";

const menuItems = [
  {
    id: "profile",
    title: "Profile Settings",
    icon: User,
  },
  {
    id: "account",
    title: "Account Settings",
    icon: Lock,
  },
];

const SettingsSidebar = ({ activeTab, setActiveTab }) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 min-h-[754px]">

      <div className="space-y-1">

        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeTab === item.id
                  ? "bg-blue-50 text-blue-600"
                  : "text-slate-700 hover:bg-slate-100"
              }`}
            >
              <Icon size={16} />

              <span>{item.title}</span>
            </button>
          );
        })}

      </div>

    </div>
  );
};

export default SettingsSidebar;