import React from "react";
import { useDispatch } from "react-redux";

import { hideSettings } from "../../../slices/pages";

import { ChatUserList, ChatSettings } from "..";
import { Button } from "../../Buttons";

import "./chat_left_tab.css";

export const ChatLeftTab = (props) => {
  const dispatch = useDispatch();
  const { settingsVisible } = props;
  return (
    <aside
      className={`chat-left ${
        settingsVisible ? "settings-visible" : "settings-hidden"
      }`}
    >
      <ul className="chat-left-content">
        <ChatSettings />
        <ChatUserList />
      </ul>
      <Button
        className="chat-settings-back"
        onClick={() => {
          dispatch(hideSettings());
        }}
        icon="keyboard_arrow_down"
      />
    </aside>
  );
};
