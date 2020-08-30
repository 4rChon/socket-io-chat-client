import React from "react";
import { ChatBox, ChatStatus } from "../Chat";

export const Chat = () => {
  return (
    <div className="page-content">
      <ChatBox />
      <ChatStatus />
    </div>
  );
};
