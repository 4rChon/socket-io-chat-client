import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMessages } from "../../slices/messages";
import { clientSelector } from "../../slices";
import { Link } from "react-router-dom";

export const ChatTab = (props) => {
  const { icon, newMessage, active, link, loading } = props;
  const dispatch = useDispatch();
  const { roomId } = useSelector(clientSelector);

  return (
    <li className="tab-name">
      {newMessage ? (
        <Link
          onClick={() => {
            dispatch(fetchMessages(roomId));
          }}
          className={`tab-link ${active ? "tab-active" : ""}`}
          to={link}
        >
          <span
            className={`${
              loading
                ? "loader"
                : newMessage
                ? "new-message material-icons tab-icon"
                : "material-icons tab-icon"
            }`}
          >
            {!loading ? icon : ""}
          </span>
        </Link>
      ) : (
        <Link className={`tab-link ${active ? "tab-active" : ""}`} to={link}>
          <span
            className={`${
              loading
                ? "loader"
                : newMessage
                ? "new-message material-icons tab-icon"
                : "material-icons tab-icon"
            }`}
          >
            {!loading ? icon : ""}
          </span>
        </Link>
      )}
    </li>
  );
};
