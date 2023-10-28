import { useEffect, useState } from "react";
import "./Modal.scss";

export default function Modal({ IsOpen, setIsOpen, children }) {
  useEffect(() => {
    document.body.style.overflow = IsOpen ? "hidden" : "auto";
  }, [IsOpen]);

  return (
    <>
      {IsOpen && (
        <aside className="modal">
          <div className="con">
            {children}
            <span onClick={() => setIsOpen(false)}>Close</span>
          </div>
        </aside>
      )}
    </>
  );
}
