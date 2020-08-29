import React from "react";
import { useDispatch } from "react-redux";

import { ChatForm } from "../Chat";
import { Button } from "../Buttons";

import { showSettings } from "../../slices/pages";

export const ChatBottomBar = (props) => {
  const dispatch = useDispatch();
  const handleSettings = (event) => {
    event.preventDefault();
    dispatch(showSettings());
  };

  return (
    <div className="bottom-bar">
      <Button
        onClick={handleSettings}
        className="settings-button"
        icon="settings"
      />
      <ChatForm />
    </div>
  );
};
