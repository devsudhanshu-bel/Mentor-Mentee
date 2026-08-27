import React from "react";

import ProfileSettingsCard from "./ProfileSettingsCard";
import PasswordSecurityCard from "./PasswordSecurityCard";
import AccountSettingsCard from "./AccountSettingsCard";
import NotificationCard from "./NotificationCard";
import PrivacySettingsCard from "./PrivacySettingsCard";
import HelpSupportCard from "./HelpSupportCard";

const ProfileSettings = () => {
  return (
    <div className="space-y-2">

      {/* Top Row */}
      <div className="grid grid-cols-12 gap-2">

        <div className="col-span-8">
          <ProfileSettingsCard />
        </div>

        <div className="col-span-4">
          <PasswordSecurityCard />
        </div>

      </div>

      {/* Middle Row */}
      <div className="grid grid-cols-12 gap-2">

        <div className="col-span-8">
          <AccountSettingsCard />
        </div>

        <div className="col-span-4">
          <NotificationCard />
        </div>

      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-12 gap-2">

        <div className="col-span-8">
          <PrivacySettingsCard />
        </div>

        <div className="col-span-4">
          <HelpSupportCard />
        </div>

      </div>

    </div>
  );
};

export default ProfileSettings;