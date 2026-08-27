import React from "react";
import MessageBubble from "./MessageBubble";

const messages = [
  {
    mine: false,
    message:
      "Good morning sir.",
    time: "10:20 AM",
  },

  {
    mine: true,
    message:
      "Good morning! How are your project preparations going?",
    time: "10:21 AM",
  },

  {
    mine: false,
    message:
      "Everything is going well. I have completed the first module.",
    time: "10:22 AM",
  },

  {
    mine: true,
    message:
      "Excellent. Keep me updated with your weekly progress.",
    time: "10:23 AM",
  },
];

const ChatMessages = () => {
  return (
    <div className="flex-1 space-y-4 overflow-y-auto bg-slate-50 p-5">
      {messages.map((msg, index) => (
        <MessageBubble
          key={index}
          {...msg}
        />
      ))}
    </div>
  );
};

export default ChatMessages;