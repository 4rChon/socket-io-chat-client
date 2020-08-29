import React from "react";
import { Link } from "react-router-dom";

export const Tab = (props) => {
  const { icon, active, link } = props;
  return (
    <ul className="tab-name">
      <Link className={`tab-link ${active ? "tab-active" : ""}`} to={link}>
        <span className="material-icons tab-icon">{icon}</span>
      </Link>
    </ul>
  );
};
