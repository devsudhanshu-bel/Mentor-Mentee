import React from "react";
import {
  CalendarPlus,
  CalendarClock,
  Presentation,
} from "lucide-react";

import MeetingActionCard from "./MeetingActionCard";

const MeetingActions = ({
  onScheduleMeeting = () => {},
  onRecurringMeeting = () => {},
  onInstantMeeting = () => {},
}) => {
  return (
    <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
      {/* Schedule Meeting */}
      <MeetingActionCard
        icon={CalendarPlus}
        title="Schedule Meeting"
        description="Schedule a one-on-one meeting at a specific date and time."
        buttonText="Schedule Meeting"
        iconBg="bg-blue-50"
        iconColor="text-blue-600"
        buttonColor="bg-blue-600"
        onClick={onScheduleMeeting}
      />

      {/* Recurring Meeting */}
      <MeetingActionCard
        icon={CalendarClock}
        title="Recurring Meeting"
        description="Set up recurring meetings (weekly, bi-weekly, or monthly)."
        buttonText="Create Recurring Meeting"
        iconBg="bg-emerald-50"
        iconColor="text-emerald-600"
        buttonColor="bg-emerald-600"
        onClick={onRecurringMeeting}
      />

      {/* Instant Meeting */}
      <MeetingActionCard
        icon={Presentation}
        title="Instant Meeting"
        description="Start an instant mentoring session immediately with your mentee."
        buttonText="Start Instant Meeting"
        iconBg="bg-violet-50"
        iconColor="text-violet-600"
        buttonColor="bg-violet-600"
        onClick={onInstantMeeting}
      />
    </div>
  );
};

export default MeetingActions;