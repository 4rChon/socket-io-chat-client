import React from "react";
import { useSelector } from "react-redux";

import { pagesSelector } from "../../slices";

import { Chat, ChatBottomBar, ChatLeftTab } from "../Chat";

export const ChatTab = () => {
  const { settingsVisible } = useSelector(pagesSelector);

  return (
    <div className="chat-tab">
      <ChatLeftTab settingsVisible={settingsVisible} />
      <div
        className={`chat-right ${
          settingsVisible ? "settings-visible" : "settings-hidden"
        }`}
      >
        <Chat />
        <ChatBottomBar />
      </div>
    </div>
  );
};
