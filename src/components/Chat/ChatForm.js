import React, { useState } from "react";
import { useSelector } from "react-redux";

import { clientSelector } from "../../slices";

import socket from "../../services/socket-service";
import { RequestType, Request } from "../../enums";

export const ChatForm = () => {
  const [message, setMessage] = useState("");
  const { nick, roomId } = useSelector(clientSelector);

  const handleChange = (event) => {
    const msg_length = message.length;
    const new_msg_length = event.target.value.length;
    if (msg_length === 0 && new_msg_length > 0) {
      socket.emit(RequestType.POST, [
        Request.TYPING,
        {
          nick,
          roomId,
          typing: true,
        },
      ]);
    } else if (msg_length > 0 && new_msg_length === 0) {
      socket.emit(RequestType.POST, [
        Request.TYPING,
        {
          nick,
          roomId,
          typing: false,
        },
      ]);
    }
    setMessage(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (message.length === 0) {
      return;
    }
    if (message[0] === "!") {
      const commands = message.trim().slice(1).split(" ");
      socket.emit(RequestType.COMMAND, commands);
    } else {
      socket.emit(RequestType.MESSAGE, {
        nick,
        roomId,
        message,
      });
    }

    socket.emit(RequestType.POST, [
      Request.TYPING,
      {
        nick,
        roomId,
        typing: false,
      },
    ]);
    setMessage("");
  };

  return (
    <form className="chat-form">
      <input
        className="form-input"
        id="chatbox"
        type="text"
        placeholder={
          roomId === ""
            ? `Type !${Request.JOIN_ROOM} <room> to join a room.`
            : `Message #${roomId}`
        }
        value={message}
        onChange={handleChange}
      />
      <button
        className="chat-submit material-icons"
        type="submit"
        value="Submit"
        onClick={handleSubmit}
      >
        send
      </button>
    </form>
  );
};
