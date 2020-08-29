import React from "react";
import { Tabs } from "../components/Tabs/Tabs";
import { Rooms } from "../components/Rooms/Rooms";

const RoomPage = () => {
  return (
    <div className="page-tab">
      <Tabs active={[false, false, true]} />
      <Rooms />
    </div>
  );
};

export default RoomPage;
