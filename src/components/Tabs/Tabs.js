import React from "react";

import { useSelector } from "react-redux";
import { clientSelector } from "../../slices";
import { Tab } from "./Tab";

export const Tabs = (props) => {
  const roomId = useSelector(clientSelector).roomId;
  const { active } = props;
  return (
    <ul className="tab-name-wrapper">
      <Tab
        key="Users"
        className="tab-component"
        icon={"groups"}
        name={"Users"}
        active={active[0]}
        link={"/users"}
      />
      <Tab
        key="Chat"
        className="tab-component"
        icon={"chat"}
        name={`#${roomId}`}
        active={active[1]}
        link={"/"}
      />
      <Tab
        key="Rooms"
        className="tab-component"
        icon={"forum"}
        name={"Rooms"}
        active={active[2]}
        link={"/rooms"}
      />
    </ul>
  );
};
