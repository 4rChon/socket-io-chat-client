import React from "react";
import { JoinRoomButton } from "../Buttons";

export const UserItem = ({ user }) => {
  return (
    <li className="list-item-wrapper">
      <div className="list-item">
        <div className="user-details">
          <span className="user-status">
            {user.nick} is chatting in #{user.roomId}
          </span>
        </div>
        <div className="user-actions">
          <JoinRoomButton targetRoomId={user.roomId} />
          {/* <button className="material-icons">reply</button> */}
        </div>
      </div>
    </li>
  );
};
