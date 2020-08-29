import React from "react";
import { useSelector } from "react-redux";
import { roomsSelector } from "../../slices";
import { RoomItem } from "./RoomItem";

export const Rooms = () => {
  const rooms = useSelector(roomsSelector);
  return (
    <div className="page-content">
      <ul className="list-wrapper">
        {Object.keys(rooms.rooms).map((room) => (
          <RoomItem
            key={room}
            roomId={room}
            roomSize={rooms.rooms[room].length}
          />
        ))}
      </ul>
    </div>
  );
};
