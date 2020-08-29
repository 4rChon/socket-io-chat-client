import React from "react";

import { ChatTab } from "../components/Chat";
import { Tabs } from "../components/Tabs";

const ChatPage = () => {
  return (
    <div className="page-tab">
      <Tabs active={[false, true, false]} />
      <ChatTab />
    </div>
  );
};

export default ChatPage;
