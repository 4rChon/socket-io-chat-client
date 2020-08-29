import React from "react";

import { RequestType, Request } from "../../enums";
import { useSelector } from "react-redux";
import { clientSelector } from "../../slices";
import socket from "../../socket";

export const JoinRoomButton = ({ targetRoomId }) => {
  const { roomId } = useSelector(clientSelector);
  const joinRoom = (event) => {
    event.preventDefault();
    socket.emit(RequestType.COMMAND, [
      `${Request.JOIN_ROOM}`,
      `${event.target.value}`,
    ]);
  };

  return (
    <button
      disabled={targetRoomId === roomId || targetRoomId === ""}
      className="material-icons"
      value={targetRoomId}
      onClick={joinRoom}
    >
      login
    </button>
  );
};
