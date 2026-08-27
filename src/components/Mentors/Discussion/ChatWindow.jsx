import React from "react";

import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";

const ChatWindow = () => {
  return (
    <div className="flex h-full flex-col">
      <ChatHeader />

      <ChatMessages />

      <ChatInput />
    </div>
  );
};

export default ChatWindow;