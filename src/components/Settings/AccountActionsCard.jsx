import React from "react";
import {
  Lock,
  Mail,
  Phone,
} from "lucide-react";

const actions = [
  {
    id: 1,
    title: "Change Password",
    icon: Lock,
  },
  {
    id: 2,
    title: "Update Email",
    icon: Mail,
  },
  {
    id: 3,
    title: "Update Phone",
    icon: Phone,
  },
];

const AccountActionsCard = () => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-3">

      {/* Header */}
      <h2 className="text-sm font-semibold text-slate-800 mb-3">
        Account Actions
      </h2>

      {/* Action Buttons */}
      <div className="space-y-2">

        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <button
              key={action.id}
              className="
                w-full
                h-9
                rounded-lg
                border
                border-slate-200
                bg-white
                hover:bg-blue-50
                hover:border-blue-300
                transition-all
                duration-200
                flex
                items-center
                justify-center
                gap-2
              "
            >
              <Icon
                size={14}
                strokeWidth={2.2}
                className="text-blue-600"
              />

              <span className="text-[11px] font-medium text-blue-600">
                {action.title}
              </span>
            </button>
          );
        })}

      </div>

    </div>
  );
};

export default AccountActionsCard;