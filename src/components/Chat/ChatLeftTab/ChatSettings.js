import React from "react";
import { useSelector } from "react-redux";

import { clientSelector } from "../../../slices";

import { ChatSettingsForm } from "..";

import { Request } from "../../../enums";

export const ChatSettings = () => {
  const client = useSelector(clientSelector);
  return (
    <li className="left-tab-list-wrapper">
      <h2 className="left-tab-content-title">User Settings</h2>
      <ul className="chat-settings-list">
        <ChatSettingsForm
          label="Nickname"
          request={Request.SET_NICK}
          placeholder={client.nick}
        />
        <ChatSettingsForm
          label="Room"
          request={Request.JOIN_ROOM}
          placeholder={
            client.roomId.length > 0 ? client.roomId : "You are not in a room."
          }
        />
      </ul>
    </li>
  );
};
