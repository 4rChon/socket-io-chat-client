import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { clientSelector } from "../../../slices";
import { usersSelector } from "../../../slices";

export const ChatUserList = () => {
  const { roomId } = useSelector(clientSelector);
  const { users } = useSelector(usersSelector);
  const [userList, setUserList] = useState([]);
  useEffect(() => {
    setUserList(users.filter((u) => u.roomId === roomId));
  }, [setUserList, roomId, users]);

  return (
    <li className="left-tab-list-wrapper">
      <h2 className="left-tab-content-title">Channel Users</h2>
      <ul className="user-list">
        {userList.map((u) => (
          <li key={u.id} className="user-list-item-wrapper">
            <div className="user-list-item">{u.nick}</div>
          </li>
        ))}
      </ul>
    </li>
  );
};
