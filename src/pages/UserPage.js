import React from "react";
import { Users } from "../components/Users/Users";
import { Tabs } from "../components/Tabs/Tabs";

const UserPage = () => {
  return (
    <div className="page-tab">
      <Tabs active={[true, false, false]} />
      <Users />
    </div>
  );
};

export default UserPage;
