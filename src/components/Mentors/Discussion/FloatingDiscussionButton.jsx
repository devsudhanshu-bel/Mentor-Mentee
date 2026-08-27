import React from "react";
import { MessageCircle, X } from "lucide-react";

const FloatingDiscussionButton = ({
  isOpen,
  setIsDiscussionOpen,
}) => {
  return (
    <button
      onClick={() => setIsDiscussionOpen(!isOpen)}
      className="fixed bottom-6 right-6 z-[9999] flex h-16 w-16 cursor-pointer items-center justify-center rounded-full rounded-full bg-[#2563EB] text-white shadow-xl transition-all duration-300 hover:scale-105 hover:bg-[#1D4ED8] active:scale-95"
    >
      {isOpen ? (
        <X
          size={28}
          strokeWidth={2.5}
        />
      ) : (
        <>
          <MessageCircle
            size={28}
            strokeWidth={2.2}
          />

          {/* Notification Badge */}
          <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-red-500 text-[11px] font-bold text-white">
            2
          </span>
        </>
      )}
    </button>
  );
};

export default FloatingDiscussionButton;