import React, { useState, useEffect } from "react";

import { Response } from "../../enums";
import { useSelector } from "react-redux";
import { clientSelector } from "../../slices";

import socket from "../../services/socket-service";

export const ChatStatus = (props) => {
  const [typists, setTypists] = useState([]);
  const { id } = useSelector(clientSelector);

  useEffect(() => {
    socket.on(Response.TYPING, (typists) =>
      setTypists(typists.filter((t) => t.id !== id).map((t) => t.nick))
    );

    return () => {
      socket.removeListener(Response.TYPING);
    };
  }, [id]);

  const getTypingBlurb = () => {
    console.log(typists);
    console.log(id);
    if (typists.length === 0) return "";
    if (typists.length === 1) return `${typists[0]} is typing...`;
    if (typists.length <= 3) return `${typists.join(", ")} are typing...`;
    else return `${typists.length} people are typing...`;
  };

  const typingPred = () => typists.length !== 0;
  return (
    <ul className="chat-box-status-wrapper">
      {typingPred() ? (
        <li className={`chat-box-status`}>{getTypingBlurb()}</li>
      ) : (
        <li></li>
      )}
    </ul>
  );
};
