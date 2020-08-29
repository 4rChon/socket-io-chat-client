import React from "react";

export const Button = ({ onClick, className, disabled, icon }) => {
  className = className ? `material-icons ${className}` : `material-icons`;
  return (
    <button disabled={disabled} className={className} onClick={onClick}>
      {icon}
    </button>
  );
};
