import React from "react";

import { useSelector } from "react-redux";
import { messagesSelector } from "../../slices";
import { Tab } from "./Tab";
export const Tabs = (props) => {
  const { loading } = useSelector(messagesSelector);
  const { active } = props;

  return (
    <ul className="tab-name-wrapper">
      <Tab
        key="Users"
        className="tab-component"
        icon={"groups"}
        active={active[0]}
        link={"/users"}
      />
      <Tab
        key="Chat"
        className="tab-component"
        icon={"chat"}
        active={active[1]}
        loading={loading}
        link={"/"}
      />
      <Tab
        key="Rooms"
        className="tab-component"
        icon={"forum"}
        active={active[2]}
        link={"/rooms"}
      />
    </ul>
  );
};
