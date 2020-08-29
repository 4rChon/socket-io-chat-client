import React from "react";

export const ConfirmButton = ({ disabled, onClick }) => {
  return (
    <button
      disabled={disabled}
      type="submit"
      value="Submit"
      className="confirm-button material-icons"
      onClick={onClick}
    >
      check
    </button>
  );
};
