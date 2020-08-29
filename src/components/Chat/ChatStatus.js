import React from "react";

export const ChatStatus = (props) => {
  const { newMessage, offset, typists } = props;
  const getTypingBlurb = () => {
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
