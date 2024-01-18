import React from "react";
export default function Button({ onClick, buttonstyle, type, children }) {
  return (
    <button
      style={buttonstyle}
      className="main-btn"
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
