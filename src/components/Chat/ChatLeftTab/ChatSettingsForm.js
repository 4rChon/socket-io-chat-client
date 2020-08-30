import React, { useState } from "react";
import { Button, ConfirmButton } from "../../Buttons/";
import { RequestType } from "../../../enums";
import socket from "../../../services/socket-service";

export const ChatSettingsForm = ({ label, request, placeholder }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState("");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    socket.emit(RequestType.COMMAND, [`${request}`, `${value}`]);
    setIsEditing(false);
    setValue("");
  };

  return (
    <li className="settings-list-item-wrapper">
      <div className="settings-list-item">
        <span className="settings-item-label">{label}</span>
        {isEditing ? (
          <form className="chat-settings-form">
            <input
              className="settings-form-input"
              type="text"
              placeholder={placeholder}
              value={value}
              onChange={handleChange}
              autoFocus={true}
            />
            <ConfirmButton
              disabled={value.length === 0}
              onClick={handleSubmit}
            />
            <Button
              className="clear-button"
              onClick={() => {
                setIsEditing(false);
                setValue("");
              }}
              icon="clear"
            />
          </form>
        ) : (
          <div className="edit-button-wrapper">
            <span className="edit-placeholder">{placeholder}</span>
            <Button
              className="edit-button"
              onClick={() => setIsEditing(true)}
              icon="create"
            />
          </div>
        )}
      </div>
    </li>
  );
};
