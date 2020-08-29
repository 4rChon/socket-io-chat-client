import React from "react";

export const ChatMessage = ({ nick, message }) => (
  <li className="message">
    <span className="message-sender">{nick}: </span>
    <span className="message-content">{message}</span>
  </li>
);
