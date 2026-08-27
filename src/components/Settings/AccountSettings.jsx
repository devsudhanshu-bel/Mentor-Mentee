import React from "react";

import PersonalInformationCard from "./PersonalInformationCard";
import AccountStatusCard from "./AccountStatusCard";
import AccountActionsCard from "./AccountActionsCard";
import NeedHelpCard from "./NeedHelpCard";

import ProfilePictureCard from "./ProfilePictureCard";
import OtherInformationCard from "./OtherInformationCard";

const AccountSettings = () => {
  return (
    <div className="space-y-3">

      {/* Top Section */}
      <div className="grid grid-cols-12 gap-3">

        {/* Left */}
        <div className="col-span-8">
          <PersonalInformationCard />
        </div>

        {/* Right */}
        <div className="col-span-4 space-y-3">

          <AccountStatusCard />

          <AccountActionsCard />

          <NeedHelpCard />

        </div>

      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-12 gap-3">

        {/* Profile Picture */}
        <div className="col-span-4">
          <ProfilePictureCard />
        </div>

        {/* Other Information */}
        <div className="col-span-8">
          <OtherInformationCard />
        </div>

      </div>

    </div>
  );
};

export default AccountSettings;