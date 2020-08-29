import React from "react";
import { JoinRoomButton } from "../Buttons";

export const RoomItem = ({ roomId, roomSize }) => {
  return (
    <li className="list-item-wrapper">
      <div className="list-item">
        <div className="room-details">
          <span className="room-name">#{roomId}</span>
          <span className="room-divider"> | </span>
          <span className="room-size">{roomSize}</span>
        </div>
        <div className="room-actions">
          <JoinRoomButton targetRoomId={roomId} />
        </div>
      </div>
    </li>
  );
};
