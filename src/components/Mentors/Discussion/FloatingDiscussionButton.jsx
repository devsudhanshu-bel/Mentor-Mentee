import React from "react";
import { MessageCircle, X } from "lucide-react";

const FloatingDiscussionButton = ({
  isOpen,
  setIsDiscussionOpen,
}) => {
  return (
    <button
      type="button"
      onClick={() => setIsDiscussionOpen((previous) => !previous)}
      aria-label={isOpen ? "Close discussions" : "Open discussions"}
      title={isOpen ? "Close discussions" : "Open discussions"}
      className="fixed bottom-4 right-4 z-[9999] flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-[#2563EB] text-white shadow-xl transition-all duration-300 hover:scale-105 hover:bg-[#1D4ED8] active:scale-95 sm:bottom-6 sm:right-6 sm:h-16 sm:w-16"
    >
      {isOpen ? (
        <>
          <X size={23} strokeWidth={2.5} className="sm:hidden" />
          <X size={28} strokeWidth={2.5} className="hidden sm:block" />
        </>
      ) : (
        <>
          <MessageCircle size={23} strokeWidth={2.2} className="sm:hidden" />
          <MessageCircle size={28} strokeWidth={2.2} className="hidden sm:block" />

          {/* Notification badge — connect to unread count later */}
          <span className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-red-500 text-[10px] font-bold text-white sm:-right-1 sm:-top-1 sm:h-6 sm:w-6 sm:text-[11px]">
            2
          </span>
        </>
      )}
    </button>
  );
};

export default FloatingDiscussionButton;
