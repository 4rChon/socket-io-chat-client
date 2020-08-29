import React from "react";
import { useSelector } from "react-redux";
import { usersSelector } from "../../slices";
import { UserItem } from "./UserItem";

export const Users = () => {
  const users = useSelector(usersSelector);
  return (
    <div className="page-content">
      <ul className="list-wrapper">
        {users.users.map((user) => (
          <UserItem key={user.id} user={user} />
        ))}
      </ul>
    </div>
  );
};
