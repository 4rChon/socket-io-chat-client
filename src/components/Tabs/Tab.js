import React from "react";
import { Link } from "react-router-dom";

export const Tab = (props) => {
  const { icon, active, link, loading } = props;
  return (
    <li className="tab-name">
      <Link className={`tab-link ${active ? "tab-active" : ""}`} to={link}>
        <span className={loading ? "loader" : "material-icons tab-icon"}>
          {!loading ? icon : ""}
        </span>
      </Link>
    </li>
  );
};
