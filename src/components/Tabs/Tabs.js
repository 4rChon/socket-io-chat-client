import React from "react";

import { useSelector } from "react-redux";
import { messagesSelector } from "../../slices";
import { Tab, ChatTab } from "../Tabs";

export const Tabs = (props) => {
  const { loading, newMessage } = useSelector(messagesSelector);
  const { active } = props;

  return (
    <ul className="tab-name-wrapper">
      <Tab key="Users" icon={"groups"} active={active[0]} link={"/users"} />
      <ChatTab
        key="Chat"
        icon={"chat"}
        active={active[1]}
        loading={loading}
        newMessage={newMessage}
        link={"/"}
      />
      <Tab key="Rooms" icon={"forum"} active={active[2]} link={"/rooms"} />
    </ul>
  );
};
