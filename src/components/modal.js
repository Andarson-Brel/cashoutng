// Modal.js

import React, { useEffect, useState } from "react";
// import "./Modal.css";

const Modal = ({ isOpen, onClose, children }) => {
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);
  return (
    <>
      {isOpen && (
        <div className="modal-overlay show" onClick={handleOverlayClick}>
          <div className="modal show">
            <img
              className="close-btn"
              src="/images/close.svg"
              alt="close icon"
              onClick={onClose}
            />

            <div className="modal-content">{children}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
