import React, { useState, useEffect } from "react";

import { Response } from "../../enums";
import { useSelector } from "react-redux";
import { clientSelector, messagesSelector } from "../../slices";

import socket from "../../services/socket-service";

export const ChatStatus = (props) => {
  const [typists, setTypists] = useState([]);
  const { id } = useSelector(clientSelector);
  const { offset, newMessage } = useSelector(messagesSelector);

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

  const newMsgPred = () => newMessage && offset !== 0;
  const typingPred = () => typists.length !== 0;
  return (
    <ul className="chat-box-status-wrapper">
      {newMsgPred() ? (
        <li className={`chat-box-status`}>New Message</li>
      ) : typingPred() ? (
        <li className={`chat-box-status`}>{getTypingBlurb()}</li>
      ) : (
        <li></li>
      )}
    </ul>
  );
};
